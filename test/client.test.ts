import encodeBase64Url from 'crypto-js/enc-base64url';
import { MoneriumClient } from '../src/index';
import { LINK_MESSAGE } from '../src/constants';
import { Currency, Order, PaymentStandard } from '../src/types';
import SHA256 from 'crypto-js/sha256';

import {
  APP_ONE_CREDENTIALS_CLIENT_ID,
  APP_ONE_CREDENTIALS_SECRET,
  APP_ONE_OWNER_USER_ID,
  DEFAULT_PROFILE,
  PUBLIC_KEY,
} from './constants';

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

test('authorization code flow', async () => {
  const client = new MoneriumClient();

  const authFlowUrl = await client.pkceRequest({
    client_id: clientAuthId,
    redirect_uri: redirectUri,
  });

  const challenge = encodeBase64Url.stringify(
    SHA256(client?.codeVerifier as string),
  );

  expect(authFlowUrl).toContain(challenge);
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

// there is no way to test this without a real time signature, the date is now verified
test.skip('place order', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const date = 'Thu, 29 Dec 2022 14:58 +00:00';
  const placeOrderMessage = `Send EUR 10 to GR1601101250000000012300695 at ${date}`;
  const placeOrderSignatureHash =
    '0x23bf7e1b240d238b13cb293673c3419915402bb34435af62850b1d8e63f82c564fb73ab19691cf248594423dd01e441bb2ccb38ce2e2ecc514dfc3075bea829e1c';

  const order = await client.placeOrder({
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
  });

  const expected = {
    // profile: '04f5b0d5-17d0-11ed-81e7-a6f0ef57aabb',
    // accountId: '3cef7bfc-8779-11ed-ac14-4a76678fa2b6',
    // address: '0x2d312198e570912844b5a230AE6f7A2E3321371C',
    kind: 'redeem',
    amount: '10',
    currency: 'eur',
    memo: 'Powered by Monerium SDK',
    supportingDocumentId: '',
    chain: 'ethereum',
    network: 'goerli',
    counterpart: {
      details: {
        name: 'Mockbank Testerson',
        country: 'GR',
        lastName: 'Testerson',
        firstName: 'Mockbank',
      },
      identifier: {
        iban: 'GR16 0110 1250 0000 0001 2300 695',
        standard: 'iban',
      },
    },
  };

  expect(order).toEqual(expect.objectContaining(expected));
});
test.skip('place order by account id', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });
  const authContext = await client.getAuthContext();
  const profile = await client.getProfile(authContext.profiles[0].id);
  const account = profile.accounts.find(
    (a) =>
      a.address === PUBLIC_KEY &&
      a.currency === Currency.eur &&
      a.network === 'goerli',
  );

  const date = 'Thu, 29 Dec 2022 14:58 +00:00';
  const placeOrderMessage = `Send EUR 10 to GR1601101250000000012300695 at ${date}`;
  const placeOrderSignatureHash =
    '0xe2baa7df880f140e37d4a0d9cb1aaa8969b40650f69dc826373efdcc0945050d45f64cf5a2c96fe6bba959abe1bee115cfa31cedc378233e051036cdebd992181c';

  const orderByAccountId = await client.placeOrder({
    amount: '1',
    signature: placeOrderSignatureHash,
    accountId: account?.id as string,
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
  });

  const expectedByAccountId = {
    profile: '04f5b0d5-17d0-11ed-81e7-a6f0ef57aabb',
    accountId: '3cef7bfc-8779-11ed-ac14-4a76678fa2b6',
    address: '0x2d312198e570912844b5a230AE6f7A2E3321371C',
    kind: 'redeem',
    amount: '1',
    currency: 'eur',
    memo: 'Powered by Monerium SDK',
    supportingDocumentId: '',
    chain: 'ethereum',
    network: 'goerli',
    counterpart: {
      details: {
        name: 'Mockbank Testerson',
        country: 'GR',
        lastName: 'Testerson',
        firstName: 'Mockbank',
      },
      identifier: {
        iban: 'GR16 0110 1250 0000 0001 2300 695',
        standard: 'iban',
      },
    },
  };

  expect(orderByAccountId).toEqual(
    expect.objectContaining(expectedByAccountId),
  );
}, 30000);

// test("upload supporting document", async () => {
//   const client = new MoneriumClient();

//   await client.auth({
//     client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
//     client_secret: APP_ONE_CREDENTIALS_SECRET,
//   });

//   // const document = client.uploadSupportingDocument();
//   // assertObjectMatch(document, {});
// });
