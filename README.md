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

### Getting started

If you are new here, we recommend starting in the [Developer Portal](https://monerium.dev/docs/welcome). There you will more about `client_id`'s and ways of authenticating.

```ts
import { MoneriumClient } from '@monerium/sdk'

const client = new MoneriumClient();

/** Authenticate using client credentials */

await client.auth({
 client_id: "your_client_credentials_uuid"
 client_secret: "your_client_secret"
})

// User is now authenticated, get authentication data
await client.getAuthContext()

/*************************************/
/** Or, authenticate using auth flow */

// Construct the authFlowUrl for your application and redirect your customer.
let authFlowUrl = client.pkceRequest({
  client_id: "your_client_authflow_uuid"
  redirect_uri: "http://your-webpage.com/monerium-integration"
})
// Redirecting to the Monerium onboarding / Authentication flow.
window.location.replace(authFlowUrl)

// As the final step of the flow, the customer will be routed back to the `redirect_uri` with a `code` parameter attached to it.
// i.e. http://your-webpage.com/monerium-integration?code=1234abcd

await client.auth({
 client_id: "your_client_authflow_uuid",
 code: new URLSearchParams(window.location.search).get('code'),
 code_verifier: client.code_verifier,
 redirect_url: "http://your-webpage.com/monerium-integration"
})

// User is now authenticated, get authentication data
await client.getAuthContext()
```
## Developing

We are using [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) to enforce that developers format the commit messages according to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

## Publishing

When changes are merged to the `main` branch that follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard, [release-please](https://github.com/googleapis/release-please) workflow creates a pull request, preparing for the next release. If kept open, the following commits will also be added to the PR. Merging that PR will create a new release, a workflow will publish it on NPM and tag it on Github.

