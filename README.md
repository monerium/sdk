# @monerium/sdk

Everything you need to interact with the [Monerium API](https://monerium.dev/api-docs) - an electronic money issuer.

_This package is in development. Please make sure to check if any future updates contain commits
that may change the behavior of your application before you upgrade._

[SDK Documentation](https://monerium.github.io/sdk/)

[Code coverage](https://monerium.github.io/sdk/coverage)

## Installing

```sh
# Node
yarn add @monerium/sdk
```

## Usage

- `start`: Run Vite in host mode for a local development environment (not included in production build)
- `watch`: Run Vite in watch mode to detect changes to files during development
- `build`: Run Vite to build a production release distributable

### Environments

#### Sandbox:

chains: `ethereum`, `polygon`, `gnosis`.

networks: `goerli`, `mumbai`, `chiado`.

#### Production:

chains: `ethereum`, `polygon`, `gnosis`.

networks: `mainnet`, `mainnet`, `mainnet`.

## Getting started

If you are new here, we recommend starting in the [Developer Portal](https://monerium.dev/docs/welcome). There you will more about `client_id`'s and ways of authenticating.

### Import the SDK and initialize a client

```ts
import { MoneriumClient } from "@monerium/sdk";

const client = new MoneriumClient();
```

### Authenticate using client credentials

```ts
await client.auth({
 client_id: "your_client_credentials_uuid"
 client_secret: "your_client_secret"
})

// User is now authenticated, get authentication data
await client.getAuthContext()
```

### Authenticate using auth flow

```ts
// Construct the authFlowUrl for your application and redirect your customer.
let authFlowUrl = client.getAuthFlowURI({
  client_id: "your_client_authflow_uuid"
  // optional automatic wallet selection:
  network: "mumbai",
  chain: "polygon",
  address: "0xValidAddress72413Fa92980B889A1eCE84dD",
  signature: "0xValidSignature0df2b6c9e0fc067ab29bdbf322bec30aad7c46dcd97f62498a91ef7795957397e0f49426e000b0f500c347219ddd98dc5080982563055e918031c"

})
// Store the code verifier in localStorage
window.localStorage.setItem("myCodeVerifier", client.code_verifier);
// Redirecting to the Monerium onboarding / Authentication flow.
window.location.replace(authFlowUrl)
```

```ts
// As the final step of the flow, the customer will be routed back to the `redirect_uri` with a `code` parameter attached to it.
// i.e. http://your-webpage.com/monerium-integration?code=1234abcd

await client.auth({
  client_id: "your_client_authflow_uuid",
  code: new URLSearchParams(window.location.search).get("code"),
  code_verifier: window.localStorage.getItem("myCodeVerifier"),
  redirect_url: "http://your-webpage.com/monerium-integration",
});

// User is now authenticated, get authentication data
await client.getAuthContext();
```

## Developing

We are using [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) to enforce that developers format the commit messages according to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

## Publishing

When changes are merged to the `main` branch that follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard, [release-please](https://github.com/googleapis/release-please) workflow creates a pull request, preparing for the next release. If kept open, the following commits will also be added to the PR. Merging that PR will create a new release, a workflow will publish it on NPM and tag it on Github.
