/**
 * @jest-environment jsdom
 */

import encodeBase64Url from 'crypto-js/enc-base64url';
import { MoneriumClient } from '../src/index';
import {
  LINK_MESSAGE,
  STORAGE_CODE_VERIFIER,
  STORAGE_REFRESH_TOKEN,
} from '../src/constants';
import { Order, PaymentStandard } from '../src/types';
import SHA256 from 'crypto-js/sha256';

import {
  APP_ONE_CREDENTIALS_CLIENT_ID,
  APP_ONE_CREDENTIALS_SECRET,
  APP_ONE_OWNER_USER_ID,
  DEFAULT_PROFILE,
  PUBLIC_KEY,
} from './constants';
import { getChain, getNetwork } from '../src/utils';

const clientAuthId = 'f99e629b-6dca-11ee-8aa6-5273f65ed05b';
const redirectUri = 'http://localhost:5173/integration';

const message = 'I hereby declare that I am the address owner.';

test('client initialization', () => {
  const client = new MoneriumClient();

  expect(client).toBeInstanceOf(MoneriumClient);
});

test(`verify link message`, () => {
  expect(LINK_MESSAGE).toBe(message);
});

test('sandbox environment', () => {
  const client = new MoneriumClient('sandbox');
  const defaultClient = new MoneriumClient();
  const url = client.getAuthFlowURI({
    client_id: '',
  });
  const defaultUrl = defaultClient.getAuthFlowURI({
    client_id: '',
  });
  expect(defaultUrl).toContain('https://api.monerium.dev');
  expect(url).toContain('https://api.monerium.dev');
});

test('production environment', () => {
  const client = new MoneriumClient('production');

  const url = client.getAuthFlowURI({
    client_id: '',
  });
  expect(url).toContain('https://api.monerium.app');
});

test('authenticate with client credentials', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const authContext = await client.getAuthContext();

  expect(authContext.userId).toBe(APP_ONE_OWNER_USER_ID);
});

test('authorization code flow with chainId', async () => {
  const client = new MoneriumClient();

  const authFlowUrl = client.getAuthFlowURI({
    redirect_uri: 'http://example.com',
    client_id: 'testClientId',
    chainId: 5,
  });

  const challenge = encodeBase64Url.stringify(
    SHA256(client?.codeVerifier as string),
  );

  expect(authFlowUrl).toContain(challenge);

  expect(authFlowUrl).toBe(
    `https://api.monerium.dev/auth?redirect_uri=http%3A%2F%2Fexample.com&client_id=testClientId&code_challenge=${challenge}&code_challenge_method=S256&response_type=code&chain=ethereum&network=goerli`,
  );
});

test('authorization code flow with chain and network', async () => {
  const client = new MoneriumClient();

  const authFlowUrl = client.getAuthFlowURI({
    redirect_uri: 'http://example.com',
    client_id: 'testClientId',
    chain: 'ethereum',
    network: 'goerli',
  });

  const challenge = encodeBase64Url.stringify(
    SHA256(client?.codeVerifier as string),
  );

  expect(authFlowUrl).toBe(
    `https://api.monerium.dev/auth?redirect_uri=http%3A%2F%2Fexample.com&client_id=testClientId&code_challenge=${challenge}&code_challenge_method=S256&response_type=code&chain=ethereum&network=goerli`,
  );
});

test('authorization code flow without chain info', async () => {
  const client = new MoneriumClient();

  const test = client.getAuthFlowURI({
    redirect_uri: 'http://example.com',
    client_id: 'testClientId',
  });

  const challenge = encodeBase64Url.stringify(
    SHA256(client?.codeVerifier as string),
  );

  expect(test).toBe(
    `https://api.monerium.dev/auth?redirect_uri=http%3A%2F%2Fexample.com&client_id=testClientId&code_challenge=${challenge}&code_challenge_method=S256&response_type=code`,
  );
});

// test('link address', async () => {
//   const client = new MoneriumClient();

//   await client.auth({
//     client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
//     client_secret: APP_ONE_CREDENTIALS_SECRET,
//   });

//   const authContext = await client.getAuthContext();

//   let error;
//   try {
//     await client.linkAddress(authContext.defaultProfile, {
//       address: PUBLIC_KEY,
//       message: message,
//       signature: ownerSignatureHash,
//       accounts: [
//         {
//           network: 'goerli',
//           chain: 'ethereum',
//           currency: Currency.eur,
//         },
//         {
//           network: 'chiado',
//           chain: 'gnosis',
//           currency: Currency.eur,
//         },
//         {
//           network: 'mumbai',
//           chain: 'polygon',
//           currency: Currency.eur,
//         },
//       ],
//     });
//   } catch (e: unknown) {
//     error = (e as { errors: { address: string } }).errors.address;
//   }
//   expect(error).toBe('Account already linked to your profile');
// });

test('get profile', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const authContext = await client.getAuthContext();
  const profile = await client.getProfile(authContext.profiles[0].id);

  expect(profile.accounts[0].id).toBe('ebed25b6-6dcb-11ee-8aa6-5273f65ed05b');
});

test('get balances', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const balances = await client.getBalances();

  expect(balances).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        // id: '4b208818-44e3-11ed-adac-b2efc0e6677d',
        chain: 'ethereum',
        network: 'goerli',
        address: PUBLIC_KEY,
      }),
    ]),
  );
}, 15000);

test('get orders', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const orders = await client.getOrders();
  const order = orders.find(
    (o: Order) => o.memo === 'Powered by Monerium',
  ) as Order;

  expect(order.kind).toBe('redeem');
  expect(order.amount).toBe('1');
  expect(order.memo).toBe('Powered by Monerium');
});

test('get orders by profileId', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const orders = await client.getOrders({
    profile: DEFAULT_PROFILE,
  });

  orders.map((o: Order) => {
    expect(DEFAULT_PROFILE).toBe(o.profile);
  });
});

test('get order', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const order = await client.getOrder('2dc957ed-6dcc-11ee-85f9-fae826042a04');

  expect(order.kind).toBe('redeem');
  expect(order.amount).toBe('1');
  expect(order.memo).toBe('Powered by Monerium');
});

test('get tokens', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const tokens = await client.getTokens();

  const expected = [
    {
      address: '0x83B844180f66Bbc3BE2E97C6179035AF91c4Cce8',
      chain: 'ethereum',
      currency: 'eur',
      decimals: 18,
      network: 'goerli',
      symbol: 'EURe',
      ticker: 'EUR',
    },
  ];
  expect(tokens).toEqual(expect.arrayContaining(expected));
});

test('open without refresh token and auth code', async () => {
  const client = new MoneriumClient();

  const replaceMock = jest.fn();
  Object.defineProperty(window, 'location', {
    value: {
      replace: replaceMock,
    },
    writable: true,
  });
  client.getAuthFlowURI = jest
    .fn()
    .mockImplementation(() => 'http://example.com?test=url'); // Mock the auth function

  await client.open({
    redirectUrl: 'http://example.com',
    clientId: 'testClientId',
  });

  expect(client.getAuthFlowURI).toHaveBeenCalledWith({
    redirect_uri: 'http://example.com',
    client_id: 'testClientId',
  });
  expect(replaceMock).toHaveBeenCalledWith('http://example.com?test=url');
});

test('open with refresh token', async () => {
  const client = new MoneriumClient();

  const localStorageMock = (() => {
    let store = {} as Record<string, any>;

    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: any) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock,
  });

  Object.defineProperty(window, 'location', {
    value: {
      href: '',
      search: '',
      replace: jest.fn(),
      hash: {
        endsWith: jest.fn(),
        includes: jest.fn(),
      },
      assign: jest.fn(),
    },
    writable: true,
  });
  window.sessionStorage.setItem(STORAGE_REFRESH_TOKEN, 'testRefreshToken');

  client.auth = jest.fn(); // Mock the auth function

  const setItem = jest.spyOn(window.sessionStorage, 'setItem');

  await client.open({
    clientId: 'testClientId',
  });

  expect(client.auth).toHaveBeenCalledWith({
    refresh_token: 'testRefreshToken',
    client_id: 'testClientId',
  });
  expect(setItem).toHaveBeenCalled();
});

test('open with auth code', async () => {
  const client = new MoneriumClient();

  const localStorageMock = (() => {
    let store = {} as Record<string, any>;

    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: any) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock,
  });

  Object.defineProperty(window, 'location', {
    value: {
      href: '',
      search: '',
      replace: jest.fn(),
      hash: {
        endsWith: jest.fn(),
        includes: jest.fn(),
      },
      assign: jest.fn(),
    },
    writable: true,
  });
  window.location.search = '?code=testAuthCode';
  window.sessionStorage.setItem(STORAGE_CODE_VERIFIER, 'testCodeVerifier');

  client.auth = jest.fn(); // Mock the auth function

  const removeItem = jest.spyOn(window.sessionStorage, 'removeItem');

  await client.open({
    redirectUrl: 'http://example.com',
    clientId: 'testClientId',
  });

  expect(client.auth).toHaveBeenCalledWith({
    code: 'testAuthCode',
    redirect_uri: 'http://example.com',
    client_id: 'testClientId',
    code_verifier: 'testCodeVerifier',
  });

  expect(removeItem).toHaveBeenCalledWith(STORAGE_CODE_VERIFIER);
});

// there is no way to test this without a real time signature, the date is now verified
test('place order signature error', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const date = new Date().toISOString();
  const placeOrderMessage = `Send EUR 10 to GR1601101250000000012300695 at ${date}`;
  const placeOrderSignatureHash =
    '0x23bf7e1b240d238b13cb293673c3419915402bb34435af62850b1d8e63f82c564fb73ab19691cf248594423dd01e441bb2ccb38ce2e2ecc514dfc3075bea829e1c';

  await client
    .placeOrder({
      amount: '10',
      signature: placeOrderSignatureHash,
      address: PUBLIC_KEY,
      counterpart: {
        identifier: {
          standard: PaymentStandard.iban,
          iban: 'GR1601101250000000012300695',
        },
        details: {
          firstName: 'Mockbank',
          lastName: 'Testerson',
        },
      },
      message: placeOrderMessage,
      memo: 'Powered by Monerium SDK',
      chain: 'ethereum',
      network: 'goerli',
    })
    .catch((err) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err.message).toBe('Invalid signature');
    });
});

test('place order timestamp error', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const date = 'Thu, 29 Dec 2022 14:58 +00:00';
  const placeOrderMessage = `Send EUR 10 to GR1601101250000000012300695 at ${date}`;
  const placeOrderSignatureHash =
    '0x23bf7e1b240d238b13cb293673c3419915402bb34435af62850b1d8e63f82c564fb73ab19691cf248594423dd01e441bb2ccb38ce2e2ecc514dfc3075bea829e1c';

  await client
    .placeOrder({
      amount: '10',
      signature: placeOrderSignatureHash,
      address: PUBLIC_KEY,
      counterpart: {
        identifier: {
          standard: PaymentStandard.iban,
          iban: 'GR1601101250000000012300695',
        },
        details: {
          firstName: 'Mockbank',
          lastName: 'Testerson',
        },
      },
      message: placeOrderMessage,
      memo: 'Powered by Monerium SDK',
      chain: 'ethereum',
      network: 'goerli',
    })
    .catch((err) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err.message).toBe('Timestamp is expired');
    });
});

test('get chain and network from chainId', () => {
  expect(getChain(1)).toBe('ethereum');
  expect(getChain(137)).toBe('polygon');
  expect(getChain(80001)).toBe('polygon');
  expect(getNetwork(1)).toBe('mainnet');
  expect(getNetwork(137)).toBe('mainnet');
  expect(getNetwork(10200)).toBe('chiado');
});

// test("upload supporting document", async () => {
//   const client = new MoneriumClient();

//   await client.auth({
//     client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
//     client_secret: APP_ONE_CREDENTIALS_SECRET,
//   });

//   // const document = client.uploadSupportingDocument();
//   // assertObjectMatch(document, {});
// });
