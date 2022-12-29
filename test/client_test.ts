import {
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
  assertObjectMatch,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";

import { MoneriumClient } from "../mod.ts";
import { Chain, Currency, Network, Order, OrderKind, PaymentStandard } from "../src/types.ts";

const clientId = "654c9c30-44d3-11ed-adac-b2efc0e6677d";
const clientSecret = "ac474b7cdc111973aa080b0428ba3a824e82119bee8f65875b4aba0d42416dff";

// punkWallet: https://punkwallet.io/pk#0x3e4936f901535680c505b073a5f70094da38e2085ecf137b153d1866a7aa826b
// const privateKey = "0x3e4936f901535680c505b073a5f70094da38e2085ecf137b153d1866a7aa826b";
const publicKey = "0x2d312198e570912844b5a230AE6f7A2E3321371C";

const message = "I hereby declare that I am the address owner.";

// TODO: use ethers to generate signatures.
const ownerSignatureHash =
  "0xe206a1b5a268c9161d6874eeeab49cff554fddf485389b744491cf3920e6881d697c48a2e76453d04179b55d757365e2c591e9e8ad40f129c8f4bb592692f4031c";

Deno.test("client initialization", () => {
  const client = new MoneriumClient();

  assertInstanceOf(client, MoneriumClient);
});

Deno.test("authenticate with client credentials", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const authContext = await client.getAuthContext();

  assertObjectMatch(authContext, {
    userId: "05cc17db-17d0-11ed-81e7-a6f0ef57aabb",
  });
});

Deno.test("link address", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const authContext = await client.getAuthContext();

  try {
    await client.linkAddress(authContext.defaultProfile, {
      address: publicKey,
      message: message,
      signature: ownerSignatureHash,
      accounts: [
        {
          network: Network.goerli,
          chain: Chain.ethereum,
          currency: Currency.eur,
        },
        {
          network: Network.chiado,
          chain: Chain.gnosis,
          currency: Currency.eur,
        },
        {
          network: Network.mumbai,
          chain: Chain.polygon,
          currency: Currency.eur,
        },
      ],
    });
  } catch (e) {
    assertEquals("Account already linked to your profile", e.errors?.address);
  }
});

Deno.test("get profile", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const authContext = await client.getAuthContext();
  const profile = await client.getProfile(authContext.profiles[0].id);

  assertObjectMatch(profile, {
    accounts: [{ id: "4b2be022-44e3-11ed-adac-b2efc0e6677d" }],
  });
});

/*
Deno.test("get balances", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const balances = await client.getBalances();
  assertObjectMatch(balances, {});
})
*/

Deno.test("get orders", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const orders = await client.getOrders();
  const order = orders.find(
    (o: Order) => o.memo === "Powered by Monerium SDK",
  ) as Order;

  assertArrayIncludes(orders, []);
  assertObjectMatch(order, {
    kind: "redeem",
    amount: "1",
    memo: "Powered by Monerium SDK",
  });
});

Deno.test("get orders by profileId", async () => {
  const profileId = "04f5b0d5-17d0-11ed-81e7-a6f0ef57aabb";

  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const orders = await client.getOrders({
    profile: profileId,
  });

  orders.map((o: Order) => {
    assertEquals(profileId, o.profile);
  });
});

Deno.test("get order", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const order = await client.getOrder("96cb9a3c-878d-11ed-ac14-4a76678fa2b6");

  assertObjectMatch(order, {
    kind: "redeem",
    amount: "1",
    memo: "Powered by Monerium SDK",
  });
});

Deno.test("get tokens", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const tokens = await client.getTokens();

  assertArrayIncludes(tokens, [
    {
      address: "0x83B844180f66Bbc3BE2E97C6179035AF91c4Cce8",
      chain: "ethereum",
      currency: "eur",
      decimals: 18,
      network: "goerli",
      symbol: "EURe",
      ticker: "EUR",
    },
  ]);
});

Deno.test("place order", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });
  const authContext = await client.getAuthContext();
  const profile = await client.getProfile(authContext.profiles[0].id);
  const account = profile.accounts.find(
    (a) =>
      a.address === publicKey &&
      a.currency === Currency.eur &&
      a.network === Network.goerli,
  );

  const date = "Thu, 29 Dec 2022 14:58 +00:00";
  const placeOrderMessage = `Send EUR 10 to GR1601101250000000012300695 at ${date}`;
  const placeOrderSignatureHash =
    "0xe2baa7df880f140e37d4a0d9cb1aaa8969b40650f69dc826373efdcc0945050d45f64cf5a2c96fe6bba959abe1bee115cfa31cedc378233e051036cdebd992181c";

  const order = await client.placeOrder({
    kind: OrderKind.redeem,
    amount: "1",
    signature: placeOrderSignatureHash,
    accountId: account?.id,
    address: publicKey,
    currency: Currency.eur,
    counterpart: {
      identifier: {
        standard: PaymentStandard.iban,
        iban: "GR1601101250000000012300695",
      },
      details: {
        firstName: "Mockbank",
        lastName: "Testerson",
      },
    },
    message: placeOrderMessage,
    memo: "Powered by Monerium SDK",
    chain: Chain.ethereum,
    network: Network.goerli,
  });

  const expected = {
    // id: "96cb9a3c-878d-11ed-ac14-4a76678fa2b6",
    profile: "04f5b0d5-17d0-11ed-81e7-a6f0ef57aabb",
    accountId: "3cef7bfc-8779-11ed-ac14-4a76678fa2b6",
    address: "0x2d312198e570912844b5a230AE6f7A2E3321371C",
    kind: "redeem",
    amount: "1",
    currency: "eur",
    totalFee: "0",
    fees: [],
    counterpart: {
      details: {
        name: "Mockbank Testerson",
        country: "GR",
        lastName: "Testerson",
        firstName: "Mockbank",
      },
      identifier: {
        iban: "GR16 0110 1250 0000 0001 2300 695",
        standard: "iban",
      },
    },
    memo: "Powered by Monerium SDK",
    supportingDocumentId: "",
    chain: "ethereum",
    network: "goerli",
    txHashes: [],
    meta: {
      state: "placed",
      placedBy: "05cc17db-17d0-11ed-81e7-a6f0ef57aabb",
      // placedAt: "2022-12-29T15:29:31.924746Z",
      receivedAmount: "0",
      sentAmount: "0",
    },
  };
  assertObjectMatch(order, expected);
});

Deno.test("upload supporting document", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  // const document = client.uploadSupportingDocument();
  // assertObjectMatch(document, {});
});
