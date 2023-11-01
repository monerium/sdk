import encodeBase64Url from 'crypto-js/enc-base64url';
import SHA256 from 'crypto-js/sha256';
import {
  generateRandomString,
  getChain,
  getNetwork,
  rest,
  urlEncoded,
} from './utils';
import { MONERIUM_CONFIG } from './config';
import type {
  AuthArgs,
  AuthCode,
  AuthContext,
  Balances,
  BearerProfile,
  Chain,
  ClientCredentials,
  Environment,
  LinkAddress,
  MoneriumEvent,
  MoneriumEventListener,
  NewOrder,
  Order,
  OrderFilter,
  OrderNotification,
  OrderState,
  PKCERequest,
  PKCERequestArgs,
  Profile,
  RefreshToken,
  SupportingDoc,
  Token,
} from './types';
import { STORAGE_CODE_VERIFIER, STORAGE_REFRESH_TOKEN } from './constants';
// import pjson from "../package.json";

export class MoneriumClient {
  #env: Environment;

  #authPayload?: string;
  /** The PKCE code verifier */
  codeVerifier?: string;
  /** The bearer profile will be available after authentication, it includes the access_token and refresh_token */
  bearerProfile?: BearerProfile;
  /** The socket will be available after subscribing to an event */
  #socket?: WebSocket;
  /** The subscriptions map will be available after subscribing to an event */
  #subscriptions: Map<OrderState, MoneriumEventListener> = new Map();

  constructor(env: 'production' | 'sandbox' = 'sandbox') {
    this.#env = MONERIUM_CONFIG.environments[env];
  }

  // TODO:
  // DO PROPER TYPING LIKE IN this.auth
  // CLIENT CREDENTIALS
  // TEST auto link
  async open(options: {
    redirectUrl?: string;
    clientId: string;
    wallet?: { address: string; signature?: string; chainId?: number };
  }) {
    if (typeof window === 'undefined') {
      throw new Error('This only works on client side');
      return;
    }

    const authCode =
      new URLSearchParams(window.location.search).get('code') || undefined;

    const refreshToken =
      sessionStorage.getItem(STORAGE_REFRESH_TOKEN) || undefined;

    if (authCode) {
      const codeVerifier = sessionStorage.getItem(STORAGE_CODE_VERIFIER) || '';

      await this.auth({
        code: authCode,
        redirect_uri: options?.redirectUrl as string,
        client_id: options?.clientId,
        code_verifier: codeVerifier,
      });
      sessionStorage.setItem(
        STORAGE_REFRESH_TOKEN,
        this.bearerProfile?.refresh_token || '',
      );

      this.#cleanQueryString();

      sessionStorage.removeItem(STORAGE_CODE_VERIFIER);
    } else if (refreshToken) {
      try {
        await this.auth({
          refresh_token: refreshToken,
          client_id: options?.clientId,
        });
      } catch (err) {
        console.error(err);
      }

      sessionStorage.setItem(
        STORAGE_REFRESH_TOKEN,
        this.bearerProfile?.refresh_token || '',
      );
    } else {
      const autoLink = options.wallet
        ? {
            ...(options.wallet?.address !== undefined
              ? { address: options.wallet?.address }
              : {}),
            ...(options.wallet?.signature !== undefined
              ? { signature: options.wallet?.signature }
              : {}),
            ...(options.wallet?.chainId !== undefined
              ? {
                  chain: getChain(options.wallet.chainId),
                  network: getNetwork(options.wallet.chainId),
                }
              : {}),
          }
        : {};
      const authFlowUrl = this.getAuthFlowURI({
        client_id: options?.clientId,
        redirect_uri: options?.redirectUrl,
        ...autoLink,
      });

      sessionStorage.setItem(STORAGE_CODE_VERIFIER, this.codeVerifier || '');
      window.location.replace(authFlowUrl);
    }

    // When the user is authenticated, we connect to the order notifications socket in case
    // the user has subscribed to any event
    if (this.bearerProfile?.access_token && this.#subscriptions.size > 0) {
      this.#socket = this.connectToOrderNotifications();
    }
  }

  /**
   * {@link https://monerium.dev/api-docs#operation/auth-token}
   */
  async auth(args: AuthArgs): Promise<BearerProfile> {
    let params: AuthCode | RefreshToken | ClientCredentials;

    if (this.#isAuthCode(args)) {
      params = { ...args, grant_type: 'authorization_code' };
    } else if (this.#isRefreshToken(args)) {
      params = { ...args, grant_type: 'refresh_token' };
    } else if (this.#isClientCredentials(args)) {
      params = { ...args, grant_type: 'client_credentials' };
    } else {
      throw new Error('Authentication method could not be detected.');
    }

    this.bearerProfile = (await this.#api(
      'post',
      `auth/token`,
      params as unknown as Record<string, string>,
      true,
    )) as BearerProfile;

    this.#authPayload = `Bearer ${this.bearerProfile.access_token}`;
    return this.bearerProfile;
  }

  /**
   * Construct the url to the authorization code flow,
   * the code verifier is needed afterwards to obtain an access token and is therefore stored in `this.codeVerifier`
   * For automatic wallet link, add the following properties: `address`, `signature`, `chain` & `network`
   * @returns string
   * {@link https://monerium.dev/api-docs#operation/auth}
   */
  getAuthFlowURI(args: PKCERequestArgs): string {
    // Using crypto-js to generate a random string was causing the following error:
    // `Error: Native crypto module could not be used to get secure random number.`
    this.codeVerifier = generateRandomString();
    const challenge = encodeBase64Url.stringify(
      SHA256(this.codeVerifier as string),
    );

    const params: PKCERequest = {
      ...args,
      client_id: args?.client_id,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      response_type: 'code',
    };

    return `${this.#env.api}/auth?${urlEncoded(params)}`;
  }

  /**
   *  @deprecated since v2.0.7, use {@link getAuthFlowURI} instead.
   */
  pkceRequest = (args: PKCERequestArgs) => this.getAuthFlowURI(args);

  // -- Read Methods
  /**
   * {@link https://monerium.dev/api-docs#operation/auth-context}
   */
  getAuthContext(): Promise<AuthContext> {
    return this.#api<AuthContext>('get', `auth/context`);
  }

  /**
   * {@link https://monerium.dev/api-docs#operation/profile}
   * @param {string} profileId - the id of the profile to fetch.

   */
  getProfile(profileId: string): Promise<Profile> {
    return this.#api<Profile>('get', `profiles/${profileId}`);
  }

  /**
   * {@link https://monerium.dev/api-docs#operation/profile-balances}
   * @param {string=} profileId - the id of the profile to fetch balances.
   */
  getBalances(profileId?: string): Promise<Balances[]> {
    if (profileId) {
      return this.#api<Balances[]>('get', `profiles/${profileId}/balances`);
    } else {
      return this.#api<Balances[]>('get', `balances`);
    }
  }

  /**
   * {@link https://monerium.dev/api-docs#operation/orders}
   */
  getOrders(filter?: OrderFilter): Promise<Order[]> {
    const searchParams = urlEncoded(filter as Record<string, string>);
    return this.#api<Order[]>('get', `orders?${searchParams}`);
  }
  /**
   * {@link https://monerium.dev/api-docs#operation/order}
   */
  getOrder(orderId: string): Promise<Order> {
    return this.#api<Order>('get', `orders/${orderId}`);
  }

  /**
   * {@link https://monerium.dev/api-docs#operation/tokens}
   */
  getTokens(): Promise<Token[]> {
    return this.#api<Token[]>('get', 'tokens');
  }

  // -- Write Methods

  /**
   * {@link https://monerium.dev/api-docs#operation/profile-addresses}
   */
  linkAddress(profileId: string, body: LinkAddress) {
    return this.#api(
      'post',
      `profiles/${profileId}/addresses`,
      JSON.stringify(body),
    );
  }

  /**
   * {@link https://monerium.dev/api-docs#operation/post-orders}
   */
  placeOrder(order: NewOrder, profileId?: string): Promise<Order> {
    const req = { ...order, kind: 'redeem', currency: 'eur' };
    if (profileId) {
      return this.#api<Order>(
        'post',
        `profiles/${profileId}/orders`,
        JSON.stringify(req),
      );
    } else {
      return this.#api<Order>('post', `orders`, JSON.stringify(req));
    }
  }

  /**
   * {@link https://monerium.dev/api-docs#operation/supporting-document}
   */
  uploadSupportingDocument(document: File): Promise<SupportingDoc> {
    const searchParams = urlEncoded(
      document as unknown as Record<string, string>,
    );

    return this.#api<SupportingDoc>(
      'post',
      'files/supporting-document',
      searchParams,
      true,
    );
  }

  // -- Helper Methods

  async #api<T>(
    method: string,
    resource: string,
    body?: BodyInit | Record<string, string>,
    isFormEncoded?: boolean,
  ): Promise<T> {
    return rest<T>(
      `${this.#env.api}/${resource}`,
      method,
      isFormEncoded ? urlEncoded(body as Record<string, string>) : body,
      {
        Authorization: this.#authPayload || '',
        'Content-Type': `application/${
          isFormEncoded ? 'x-www-form-urlencoded' : 'json'
        }`,
      },
    );
  }

  #isAuthCode(args: AuthArgs): args is AuthCode {
    return (args as AuthCode).code != undefined;
  }

  #isRefreshToken(args: AuthArgs): args is RefreshToken {
    return (args as RefreshToken).refresh_token != undefined;
  }

  #isClientCredentials(args: AuthArgs): args is ClientCredentials {
    return (args as ClientCredentials).client_secret != undefined;
  }

  // Notifications

  connectToOrderNotifications = (): WebSocket => {
    const socketUrl = `${this.#env.wss}/profiles/${
      this.bearerProfile?.profile
    }/orders?access_token=${this.bearerProfile?.access_token}`;

    const socket = new WebSocket(socketUrl);

    socket.addEventListener('open', () => {
      console.info(`Socket connected: ${socketUrl}`);
    });

    socket.addEventListener('error', (event) => {
      console.error(event);
      throw new Error(`Socket error: ${socketUrl}`);
    });

    socket.addEventListener('message', (event) => {
      const notification = JSON.parse(event.data) as OrderNotification;

      this.#subscriptions.get(notification.meta.state as OrderState)?.(
        notification,
      );
    });

    socket.addEventListener('close', () => {
      console.info(`Socket connection closed: ${socketUrl}`);
    });

    return socket;
  };

  async close() {
    sessionStorage.removeItem(STORAGE_CODE_VERIFIER);
    this.#subscriptions.clear();
    this.#socket?.close();
  }

  /**
   * Subscribe to MoneriumEvent to receive notifications using the Monerium API (WebSocket)
   * We are setting a subscription map because we need the user to have a token to start the WebSocket connection
   * {@link https://monerium.dev/api-docs#operation/profile-orders-notifications}
   * @param event The event to subscribe to
   * @param handler The handler to be called when the event is triggered
   */
  subscribe(event: MoneriumEvent, handler: MoneriumEventListener): void {
    this.#subscriptions.set(event as OrderState, handler);
  }

  /**
   * Unsubscribe from MoneriumEvent and close the socket if there are no more subscriptions
   * @param event The event to unsubscribe from
   */
  unsubscribe(event: MoneriumEvent): void {
    this.#subscriptions.delete(event as OrderState);

    if (this.#subscriptions.size === 0) {
      this.#socket?.close();
      this.#socket = undefined;
    }
  }

  /**
   * Clean the query string from the URL
   */
  #cleanQueryString() {
    const url = window.location.href;
    const [baseUrl, queryString] = url.split('?');

    // Check if there is a query string
    if (queryString) {
      window.history.replaceState(null, '', baseUrl);
    }
  }
}
