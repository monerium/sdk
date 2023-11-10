import {
  AuthArgs,
  AuthCodeRequest,
  ClientCredentialsRequest,
  PKCERequest,
  PKCERequestArgs,
  RefreshTokenRequest,
} from '../types';
import { getChain, getNetwork, urlEncoded } from '../utils';
import encodeBase64Url from 'crypto-js/enc-base64url';
import SHA256 from 'crypto-js/sha256';
import { STORAGE_CODE_VERIFIER } from '../constants';

/** Structure the Auth Flow params, support for ChainId instead of chain & network */
export const getAuthFlowParams = (
  args: PKCERequestArgs,
  codeChallenge: string,
) => {
  const {
    client_id,
    redirect_uri,
    scope,
    state,
    chainId,
    chain,
    network,
    address,
    signature,
  } = args;

  const autoLink = address
    ? {
        address: address,
        ...(signature !== undefined ? { signature: signature } : {}),
        ...(chainId !== undefined || chain !== undefined
          ? { chain: chainId ? getChain(chainId) : chain }
          : {}),
        ...(chainId !== undefined || network !== undefined
          ? { network: chainId ? getNetwork(chainId) : network }
          : {}),
      }
    : {};

  return urlEncoded({
    client_id,
    redirect_uri,
    ...(scope !== undefined ? { scope: scope } : {}),
    ...(state !== undefined ? { state: state } : {}),
    code_challenge: codeChallenge,
    code_challenge_method: 'S256' as PKCERequest['code_challenge_method'],
    response_type: 'code' as PKCERequest['response_type'],
    ...autoLink,
  });
};

/**
 * Find a more secure way to generate a random string
 * Using crypto-js to generate a random string was causing the following error:
 * `Error: Native crypto module could not be used to get secure random number.`
 * https://github.com/brix/crypto-js/issues/256
 */
export const generateRandomString = () => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 128) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

/** Generate the PKCE code challenge */
export const generateCodeChallenge = (codeVerifier: string) => {
  return encodeBase64Url.stringify(SHA256(codeVerifier as string));
};

/**
 * Constructs the Auth Flow URL and stores the code verifier in the session storage
 */
export const getAuthFlowUrlAndStoreCodeVerifier = (
  baseUrl: string,
  args: PKCERequestArgs,
): string => {
  const codeVerifier = generateRandomString();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  sessionStorage.setItem(STORAGE_CODE_VERIFIER, codeVerifier || '');

  return `${baseUrl}/auth?${getAuthFlowParams(args, codeChallenge)}`;
};

/**
 * Clean the query string from the URL
 */
export const cleanQueryString = () => {
  const url = window.location.href;
  const [baseUrl, queryString] = url.split('?');

  // Check if there is a query string
  if (queryString) {
    window.history.replaceState(null, '', baseUrl);
  }
};

export const isAuthCode = (args: AuthArgs): args is AuthCodeRequest => {
  return (args as AuthCodeRequest).code != undefined;
};

export const isRefreshToken = (args: AuthArgs): args is RefreshTokenRequest => {
  return (args as RefreshTokenRequest).refresh_token != undefined;
};

export const isClientCredentials = (
  args: AuthArgs,
): args is ClientCredentialsRequest => {
  return (args as ClientCredentialsRequest).client_secret != undefined;
};
