import {
  assertArrayIncludes,
  assertInstanceOf,
  assertObjectMatch,
} from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { MoneriumClient } from "../mod.ts";

const clientId = "654c9c30-44d3-11ed-adac-b2efc0e6677d";
const clientSecret = "ac474b7cdc111973aa080b0428ba3a824e82119bee8f65875b4aba0d42416dff";

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

  assertObjectMatch(authContext, { userId: "05cc17db-17d0-11ed-81e7-a6f0ef57aabb" });
});

Deno.test("get profile", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const authContext = await client.getAuthContext();
  const profile = await client.getProfile(authContext.profiles[0].id);

  assertObjectMatch(profile, { accounts: [{ id: "4b2be022-44e3-11ed-adac-b2efc0e6677d" }] });
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
  assertArrayIncludes(orders, []);
});

Deno.test("get order", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  // const order = await client.getOrder();
  // assertObjectMatch(order, {});
});

Deno.test("get tokens", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const tokens = await client.getTokens();

  assertArrayIncludes(tokens, [{
    currency: "eur",
    ticker: "EUR",
    symbol: "EURe",
    chain: "ethereum",
    network: "rinkeby",
    address: "0x25c13fc529dc4afe4d488bd1f2ee5e1ec4918e0b",
    decimals: 18,
  }]);
});

Deno.test("place order", async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: clientId,
    client_secret: clientSecret,
  });

  // const order = client.placeOrder();
  // assertObjectMatch(order, {});
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
