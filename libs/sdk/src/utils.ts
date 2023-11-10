import {
  Balances,
  Chain,
  ChainId,
  Currency,
  Networks,
  Profile,
} from '../src/types';

export const rfc3339 = (d: Date) => {
  if (d.toString() === 'Invalid Date') {
    throw d;
  }
  const pad = (n: number) => {
    return n < 10 ? '0' + n : n;
  };

  const timezoneOffset = (offset: number) => {
    if (offset === 0) {
      return 'Z';
    }
    const sign = offset > 0 ? '-' : '+';
    offset = Math.abs(offset);
    return sign + pad(Math.floor(offset / 60)) + ':' + pad(offset % 60);
  };

  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds()) +
    timezoneOffset(d.getTimezoneOffset())
  );
};

/**
 * The message to be signed when placing an order.
 *
 * @returns string
 */
export const placeOrderMessage = (amount: string | number, iban: string) =>
  `Send EUR ${amount} to ${iban} at ${rfc3339(new Date())}`;

/**
 * Replacement for URLSearchParams, Metamask snaps do not include node globals.
 * It will not handle all special characters the same way as URLSearchParams, but it will be good enough for our use case.
 * @param body a json format of the body to be encoded
 * @returns 'application/x-www-form-urlencoded' compatible string
 */
export const urlEncoded = (
  body: Record<string, string>,
): string | undefined => {
  return body && Object.entries(body)?.length > 0
    ? Object.entries(body)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join('&')
    : '';
};

/**
 * Get the corresponding Monerium SDK Chain from the current chain id
 * @returns The Chain
 */
export const getChain = (chainId: number): Chain => {
  switch (chainId) {
    case 1:
    case 5:
      return 'ethereum';
    case 100:
    case 10200:
      return 'gnosis';
    case 137:
    case 80001:
      return 'polygon';
    default:
      throw new Error(`Chain not supported: ${chainId}`);
  }
};

/**
 * Get the corresponding Monerium SDK Network from the current chain id
 * @returns The Network
 */
export const getNetwork = (chainId: number): Networks => {
  switch (chainId) {
    case 1:
    case 100:
    case 137:
      return 'mainnet';
    case 5:
      return 'goerli';
    case 10200:
      return 'chiado';
    case 80001:
      return 'mumbai';
    default:
      throw new Error(`Network not supported: ${chainId}`);
  }
};

export const getIban = (profile: Profile, address: string, chainId: number) => {
  return (
    profile.accounts.find(
      (account) =>
        account.address === address &&
        account.iban &&
        account.chain === getChain(chainId) &&
        account.network === getNetwork(chainId),
    )?.iban ?? ''
  );
};

export const getAmount = (
  balances?: Balances[],
  address?: string,
  chainId?: ChainId,
  // currency?: Currency,
): string => {
  if (!balances || !address || !chainId) return '0';
  const currency = Currency.eur;

  const eurBalance = balances.find(
    (account) =>
      account.address === address && account.chain === getChain(chainId),
  )?.balances;

  return (
    eurBalance?.find((balance) => balance.currency === currency)?.amount || '0'
  );
};
