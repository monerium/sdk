import { encode as encodeBase64 } from "https://deno.land/std@0.159.0/encoding/base64.ts";
import { encode as encodeBase64URL } from "https://deno.land/std@0.159.0/encoding/base64url.ts";
import { MONERIUM_CONFIG } from "./config.ts";
import type {
  AuthArgs,
  AuthCode,
  AuthContext,
  Balances,
  BearerProfile,
  ClientCredentials,
  Environment,
  NewOrder,
  Order,
  OrderFiler,
  PKCERequest,
  PKCERequestArgs,
  Profile,
  RefreshToken,
  SupportingDoc,
  Token,
} from "./types.ts";

export class MoneriumClient {
  #env: Environment;
  #authPayload?: string;

  codeVerifier?: string;
  bearerProfile?: BearerProfile;

  constructor(env: "production" | "sandbox" = "sandbox") {
    this.#env = MONERIUM_CONFIG.environments[env];
  }

  // -- Authentication

  async auth(args: AuthArgs) {
    let params: AuthCode | RefreshToken | ClientCredentials;

    if (this.#isAuthCode(args)) {
      params = { ...args, grant_type: "authorization_code" };
    } else if (this.#isRefreshToken(args)) {
      params = { ...args, grant_type: "refresh_token" };
    } else if (this.#isClientCredentials(args)) {
      params = { ...args, grant_type: "client_credentials" };
    } else {
      throw new Error("Authentication method could not be detected.");
    }

    this.bearerProfile = await this.#api(
      "post",
      `auth/token`,
      new URLSearchParams(params as unknown as Record<string, string>),
      true,
    ) as BearerProfile;

    this.#authPayload = `Bearer ${this.bearerProfile.access_token}`;
  }

  async pkceRequest(args: PKCERequestArgs) {
    const buffer = crypto.getRandomValues(new Uint8Array(128 / 2));

    let randomString = "";

    for (let i = 0; i < buffer.length; ++i) {
      randomString += ("0" + buffer[i].toString(16)).slice(-2);
    }

    this.codeVerifier = randomString;

    const data = new TextEncoder().encode(this.codeVerifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const base64Digest = encodeBase64(digest);
    const challenge = encodeBase64URL(base64Digest);

    const params: PKCERequest = {
      ...args,
      code_challenge: challenge,
      code_challenge_method: "S256",
      response_type: "code",
    };

    return `${this.#env.api}/auth?${new URLSearchParams(params)}`;
  }

  // -- Read Methods

  getAuthContext() {
    return this.#api("get", `auth/context`) as Promise<AuthContext>;
  }

  getProfile(profileId: string) {
    return this.#api("get", `profiles/${profileId}`) as Promise<Profile>;
  }

  getBalances(profileId?: string) {
    if (profileId) {
      return this.#api("get", `profiles/${profileId}/balances`) as Promise<Balances>;
    } else {
      return this.#api("get", `balances`) as Promise<Balances[]>;
    }
  }

  getOrders(filter?: OrderFiler) {
    const searchParams = new URLSearchParams(filter as unknown as Record<string, string>);

    return this.#api("get", `orders?${searchParams}`) as Promise<Order[]>;
  }

  getOrder(orderId: string) {
    return this.#api("get", `orders/${orderId}`) as Promise<Order>;
  }

  getTokens() {
    return this.#api("get", "tokens") as Promise<Token[]>;
  }

  // -- Write Methods

  placeOrder(order: NewOrder, profileId?: string) {
    if (profileId) {
      return this.#api("post", `profiles/${profileId}/orders`, JSON.stringify(order)) as Promise<
        Order
      >;
    } else {
      return this.#api("post", `orders`, JSON.stringify(order)) as Promise<Order>;
    }
  }

  uploadSupportingDocument(document: File) {
    const searchParams = new URLSearchParams(document as unknown as Record<string, string>);

    return this.#api("post", "files/supporting-document", searchParams, true) as Promise<
      SupportingDoc
    >;
  }

  // -- Helper Methods

  async #api(
    method: string,
    resource: string,
    body?: BodyInit,
    isFormEncoded?: boolean,
  ) {
    const res = await fetch(`${this.#env.api}/${resource}`, {
      method,
      headers: {
        "Content-Type": `application/${isFormEncoded ? "x-www-form-urlencoded" : "json"}`,
        Authorization: this.#authPayload || "",
      },
      body,
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`${resource}: ${res.statusText}`);
    }
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
