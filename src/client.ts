import encodeBase64Url from 'crypto-js/enc-base64url';
import SHA256 from 'crypto-js/sha256';
import { generateRandomString, rest, urlEncoded } from './utils';
import { MONERIUM_CONFIG } from './config';
import type {
  AuthArgs,
  AuthCode,
  AuthContext,
  Balances,
  BearerProfile,
  ClientCredentials,
  Environment,
  LinkAddress,
  NewOrder,
  Order,
  OrderFilter,
  PKCERequest,
  PKCERequestArgs,
  Profile,
  RefreshToken,
  SupportingDoc,
  Token,
} from './types';
// import pjson from "../package.json";

export class MoneriumClient {
  #env: Environment;

  #authPayload?: string;
  /** The PKCE code verifier */
  codeVerifier?: string;
  bearerProfile?: BearerProfile;

  constructor(env: 'production' | 'sandbox' = 'sandbox') {
    this.#env = MONERIUM_CONFIG.environments[env];
  }

  // -- Authentication

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

  getAuthContext(): Promise<AuthContext> {
    return this.#api<AuthContext>('get', `auth/context`);
  }

  /**
   * @param {string} profileId - the id of the profile to fetch.
   */
  getProfile(profileId: string): Promise<Profile> {
    return this.#api<Profile>('get', `profiles/${profileId}`);
  }

  /**
   * @param {string=} profileId - the id of the profile to fetch balances.
   */
  getBalances(profileId?: string): Promise<Balances> | Promise<Balances[]> {
    if (profileId) {
      return this.#api<Balances>('get', `profiles/${profileId}/balances`);
    } else {
      return this.#api<Balances[]>('get', `balances`);
    }
  }

  getOrders(filter?: OrderFilter): Promise<Order[]> {
    const searchParams = urlEncoded(filter as Record<string, string>);
    return this.#api<Order[]>('get', `orders?${searchParams}`);
  }

  getOrder(orderId: string): Promise<Order> {
    return this.#api<Order>('get', `orders/${orderId}`);
  }

  getTokens(): Promise<Token[]> {
    return this.#api<Token[]>('get', 'tokens');
  }

  // -- Write Methods

  linkAddress(profileId: string, body: LinkAddress) {
    return this.#api(
      'post',
      `profiles/${profileId}/addresses`,
      JSON.stringify(body),
    );
  }

  placeOrder(order: NewOrder, profileId?: string): Promise<Order> {
    const req = { ...order, kind: 'redeem' };
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
}
