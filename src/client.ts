import { urlEncoded } from './utils';
import { MONERIUM_CONFIG } from './config';
import type {
  AuthArgs,
  AuthorizationCodeCredentials,
  AuthCodeRequest,
  AuthContext,
  Balances,
  BearerProfile,
  BearerTokenCredentials,
  ClassOptions,
  ClientCredentialsRequest,
  ENV,
  Environment,
  LinkAddress,
  MoneriumEvent,
  MoneriumEventListener,
  NewOrder,
  AuthFlowOptions,
  Order,
  OrderFilter,
  OrderNotification,
  OrderState,
  PKCERequestArgs,
  Profile,
  RefreshTokenRequest,
  SupportingDoc,
  Token,
  ClientCredentials,
} from './types';
import { STORAGE_CODE_VERIFIER, STORAGE_REFRESH_TOKEN } from './constants';

import {
  cleanQueryString,
  getAuthFlowUrlAndStoreCodeVerifier,
  isAuthCode,
  isClientCredentials,
  isRefreshToken,
  rest,
} from './helpers';

// import pjson from "../package.json";

const isServer = typeof window === 'undefined';

export class MoneriumClient {
  #env: Environment;

  #authorizationHeader?: string;
  /**
   * @deprecated, use sessionStorage
   * The PKCE code verifier
   * */
  codeVerifier?: string;
  /** The bearer profile will be available after authentication, it includes the access_token and refresh_token */
  bearerProfile?: BearerProfile;
  /** The socket will be available after subscribing to an event */
  #socket?: WebSocket;
  /** The subscriptions map will be available after subscribing to an event */
  #subscriptions: Map<OrderState, MoneriumEventListener> = new Map();
  // TODO: need this?
  isAuthorized = !!this.bearerProfile;

  #client?: BearerTokenCredentials;

  /** Constructor for no arguments, defaults to sandbox */
  constructor();
  /** Constructor with only env as an argument*/
  constructor(env: ENV);
  /** Constructor with {@link ClassOptions} */
  constructor(options: ClassOptions);
  constructor(envOrOptions?: ENV | ClassOptions) {
    // TODO: CHECK HERE IF REFRESH TOKEN EXISTS
    // TODO: CHECK HERE IF REFRESH TOKEN EXISTS
    // TODO: CHECK HERE IF REFRESH TOKEN EXISTS
    // TODO: CHECK HERE IF REFRESH TOKEN EXISTS
    // No arguments, default to sandbox
    if (!envOrOptions) {
      this.#env = MONERIUM_CONFIG.environments['sandbox'];
      return;
    }
    // String argument
    if (typeof envOrOptions === 'string') {
      this.#env = MONERIUM_CONFIG.environments[envOrOptions];
    } else {
      this.#env = MONERIUM_CONFIG.environments[envOrOptions.env || 'sandbox'];

      if (!isServer) {
        const { clientId, redirectUrl } =
          envOrOptions as AuthorizationCodeCredentials;
        this.#client = {
          clientId: clientId as string,
          redirectUrl: redirectUrl as string,
        };
        this.connect(this.#client);
      } else {
        const { clientId, clientSecret } = envOrOptions as ClientCredentials;
        this.#client = {
          clientId: clientId as string,
          clientSecret: clientSecret as string,
        };
        this.#clientCredentialsAuthorization(this.#client);
      }
    }
  }
  /**
   * Construct the url to the authorization code flow,
   * Code Verifier needed for the code challenge is stored in session storage
   * For automatic wallet link, add the following properties: `address`, `signature` & `chainId`
   * @returns string
   * {@link https://monerium.dev/api-docs#operation/auth}
   */
  async authorize(client?: AuthFlowOptions) {
    const clientId =
      client?.clientId ||
      (this.#client as AuthorizationCodeCredentials)?.clientId;
    const redirectUrl =
      client?.redirectUrl ||
      (this.#client as AuthorizationCodeCredentials)?.redirectUrl;

    if (!clientId) {
      throw new Error('Missing ClientId');
    }
    if (!redirectUrl) {
      throw new Error('Missing RedirectUrl');
    }

    const authFlowUrl = getAuthFlowUrlAndStoreCodeVerifier(this.#env.api, {
      client_id: clientId,
      redirect_uri: redirectUrl,
      ...client?.wallet,
    });

    // Redirect to the authFlow
    window.location.replace(authFlowUrl);
  }

  // TODO: TEST auto link & manual link + address
  async connect(client: AuthorizationCodeCredentials) {
    const clientId =
      client?.clientId ||
      (this.#client as AuthorizationCodeCredentials)?.clientId;
    const redirectUrl =
      client?.redirectUrl ||
      (this.#client as AuthorizationCodeCredentials)?.redirectUrl;

    if (!clientId) {
      throw new Error('Missing ClientId');
    }

    if (isServer) {
      throw new Error('This only works on client side');
    }

    // TODO: Some cleanup needed when old refresh token

    const authCode =
      new URLSearchParams(window.location.search).get('code') || undefined;

    const refreshToken =
      sessionStorage.getItem(STORAGE_REFRESH_TOKEN) || undefined;

    //// TEST IF THIS CAN BE DONE
    // if (
    //   this.bearerProfile?.refresh_token &&
    //   this.bearerProfile.refresh_token !== refreshToken
    // ) {
    //   sessionStorage.removeItem(STORAGE_REFRESH_TOKEN);
    //   throw new Error('Does this ever happen? mismatch in refreshtokesn');
    //   return;
    // }
    //////

    if (authCode) {
      await this.#authCodeAuthorization(clientId, redirectUrl, authCode);
    } else if (refreshToken) {
      await this.#refreshTokenAuthorization(clientId, refreshToken);
    }

    return !!this.bearerProfile;
  }

  /**
   * {@link https://monerium.dev/api-docs#operation/auth-token}
   */
  async getBearerToken(args: AuthArgs): Promise<BearerProfile> {
    let params:
      | AuthCodeRequest
      | RefreshTokenRequest
      | ClientCredentialsRequest;

    if (isAuthCode(args)) {
      params = { ...args, grant_type: 'authorization_code' };
    } else if (isRefreshToken(args)) {
      params = { ...args, grant_type: 'refresh_token' };
    } else if (isClientCredentials(args)) {
      params = { ...args, grant_type: 'client_credentials' };
    } else {
      throw new Error('Authentication method could not be detected.');
    }

    await this.#api<BearerProfile>(
      'post',
      `auth/token`,
      params as unknown as Record<string, string>,
      true,
    )
      .then((res) => {
        this.bearerProfile = res;
        this.isAuthorized = !!res;
        this.#authorizationHeader = `Bearer ${res?.access_token}`;
        window.sessionStorage.setItem(
          STORAGE_REFRESH_TOKEN,
          this.bearerProfile?.refresh_token || '',
        );
      })
      .catch((err) => {
        sessionStorage.removeItem(STORAGE_CODE_VERIFIER);
        sessionStorage.removeItem(STORAGE_REFRESH_TOKEN);
        throw new Error(err?.message);
        // if ((params as AuthCodeRequest).code) {
        //   throw new Error('Code verifier has already been used');
        // }
        // if ((params as RefreshTokenRequest).refresh_token) {
        //   throw new Error('Refresh token has already been used');
        // }
      });

    return this.bearerProfile as BearerProfile;
  }

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
        Authorization: this.#authorizationHeader || '',
        'Content-Type': `application/${
          isFormEncoded ? 'x-www-form-urlencoded' : 'json'
        }`,
      },
    );
  }

  /*
   * Triggered when the client has claimed an authorization code
   * 1. Code Verifier is picked up from the sessionStorage
   * 2. auth service is called to claim the tokens
   * 3. Refresh token is stored in the sessionStorage
   */
  #authCodeAuthorization = async (
    clientId: string,
    redirectUrl: string,
    authCode: string,
  ) => {
    const codeVerifier = sessionStorage.getItem(STORAGE_CODE_VERIFIER) || '';

    /** @deprecated, use sessionStorage */
    this.codeVerifier = codeVerifier;

    sessionStorage.removeItem(STORAGE_CODE_VERIFIER);
    // Remove auth code from URL.
    cleanQueryString();

    return await this.getBearerToken({
      code: authCode,
      redirect_uri: redirectUrl as string,
      client_id: clientId,
      code_verifier: codeVerifier,
    });
  };

  #clientCredentialsAuthorization = async ({
    clientId,
    clientSecret,
  }: ClientCredentials) => {
    return await this.getBearerToken({
      client_id: clientId,
      client_secret: clientSecret as string,
    });
  };

  #refreshTokenAuthorization = async (
    clientId: string,
    refreshToken: string,
  ) => {
    return await this.getBearerToken({
      refresh_token: refreshToken,
      client_id: clientId,
    });
  };

  // -- Notifications

  async connectOrderSocket() {
    // When the user is authenticated, we connect to the order notifications socket in case
    // the user has subscribed to any event
    if (this.bearerProfile?.access_token && this.#subscriptions.size > 0) {
      this.#socket = this.subscribeToOrderNotifications();
    }
  }
  subscribeToOrderNotifications = (): WebSocket => {
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

  async disconnect() {
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

  subscribeOrders(event: MoneriumEvent, handler: MoneriumEventListener): void {
    this.#subscriptions.set(event as OrderState, handler);
  }

  /**
   * Unsubscribe from MoneriumEvent and close the socket if there are no more subscriptions
   * @param event The event to unsubscribe from
   */
  unsubscribeOrders(event: MoneriumEvent): void {
    this.#subscriptions.delete(event as OrderState);

    if (this.#subscriptions.size === 0) {
      this.#socket?.close();
      this.#socket = undefined;
    }
  }
  // -- Deprecated methods

  /**
   * @deprecated since v2.6.4, use {@link getBearerToken} instead.
   */
  auth = async (args: AuthArgs) => await this.getBearerToken(args);

  /**
   * @deprecated since v2.6.4, use {@link authorize} instead.
   */
  getAuthFlowURI = (args: PKCERequestArgs): string =>
    getAuthFlowUrlAndStoreCodeVerifier(this.#env.api, args);

  /**
   *  @deprecated since v2.0.7, use {@link getAuthFlowURI} instead.
   */
  pkceRequest = (args: PKCERequestArgs) => this.getAuthFlowURI(args);

  // -- Getters (mainly for testing)
  getEnvironment = (): Environment => this.#env;
}
