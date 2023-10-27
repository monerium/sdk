# Monerium SDK Documentation

Monerium connects your web3 wallet to any euro bank account with your personal IBAN.
All incoming euro payments are automatically minted as EURe tokens to your wallet.
Sending EURe to traditional bank accounts is just as easy.
With a single signature from your wallet, your EURe is burned and sent as Euros to any bank account.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [FAQs](#faqs)
- [Support](#support)
- [Release Notes](#release-notes)
- [License](#license)

## Installation

### Prerequisites

Node v16.15 or higher is required.

```sh
yarn add @monerium/sdk
```

## Configuration

### Environments - URLs

| Environment | Web                  | API                      |
| ----------- | -------------------- | ------------------------ |
| sandbox     | https://monerium.dev | https://api.monerium.dev |
| production  | https://monerium.app | https://api.monerium.app |

### Environments - Networks

| Environment | Chain    | Network |
| ----------- | -------- | ------- |
| sandbox     | ethereum | goerli  |
|             | polygon  | mumbai  |
|             | gnosis   | chiado  |
| production  | ethereum | mainnet |
|             | polygon  | mainnet |
|             | gnosis   | mainnet |

## Usage Examples

We recommend starting in the [Developer Portal](https://monerium.dev/docs/welcome). There you will learn more about `client_id`'s and ways of authenticating.

#### Import the SDK and initialize a client

```ts
import { MoneriumClient } from '@monerium/sdk';

// Initialize the client. By default, it uses the sandbox environment.
// For using the production environment, replace 'sandbox' with 'production'.
const client = new MoneriumClient('sandbox');
```

#### Authenticate using client credentials

```ts
await client.auth({
  client_id: 'your_client_credentials_uuid', // replace with your client ID
  client_secret: 'your_client_secret', // replace with your client secret
});

// Retrieve authentication data after successful authentication.
await client.getAuthContext();

// Access tokens are now available for use.
const { access_token, refresh_token } = client.bearerProfile;
```

#### Authenticate using auth flow

First you have to navigate the user to the Monerium authentication flow. This can be done by generating a URL and redirecting the user to it. After the user has authenticated, Monerium will redirect back to your specified URI with a code. You can then finalize the authentication process by exchanging the code for access and refresh tokens.

```ts
// Generate the URL where users will be redirected to authenticate.
let authFlowUrl = client.getAuthFlowURI({
  client_id: 'your_client_authflow_uuid', // replace with your auth flow client ID
  redirect_uri: 'http://your-webpage.com/monerium-integration', // specify your redirect URI
  // Optional parameters for automatic wallet selection (if applicable)
  network: 'mumbai', // specify the network
  chain: 'polygon', // specify the chain
  address: '0xValidAddress72413Fa92980B889A1eCE84dD', // user wallet address
  signature:
    '0xValidSignature0df2b6c9e0fc067ab29bdbf322bec30aad7c46dcd97f62498a91ef7795957397e0f49426e000b0f500c347219ddd98dc5080982563055e918031c', // user wallet signature
});

// Store the code verifier securely between requests.
window.localStorage.setItem('myCodeVerifier', client.codeVerifier);

// Redirect the user to the Monerium authentication flow.
window.location.replace(authFlowUrl);
```

```ts
// After user authentication, Monerium redirects back to your specified URI with a code.
// Capture this code from the URL and proceed with the authentication.

// Extract the 'code' URL parameter.
const authCode = new URLSearchParams(window.location.search).get('code');

// Retrieve the stored code verifier.
const retrievedCodeVerifier = window.localStorage.getItem('myCodeVerifier');

// Finalize the authentication process.
await client.auth({
  client_id: 'your_client_authflow_uuid', // replace with your client ID
  code: authCode,
  code_verifier: retrievedCodeVerifier,
  redirect_url: 'http://your-webpage.com/monerium-integration', // ensure this matches the redirect_uri used initially
});

// Confirm the user is authenticated and retrieve the authentication data.
await client.getAuthContext();

// Your access and refresh tokens are now available.
const { access_token, refresh_token } = client.bearerProfile;
```

## API Reference

[API Documentation](https://monerium.dev/docs/api)

## Contributing

We are using [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) to enforce that developers format the commit messages according to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

We are using Yarn as a package manager.

```sh
# Install dependencies
yarn

# Run Vite to build a production release distributable
yarn build

# Run Vite in watch mode to detect changes to files during development
yarn watch
```

Smart IDEs (such as VSCode) require [special configuration](https://yarnpkg.com/getting-started/editor-sdks) for TypeScript to work when using Yarn Plug'n'Play installs.

```sh
yarn dlx @yarnpkg/sdks vscode
```

For development, a package can be linked into another project. This is often useful to test out new features or when trying to debug an issue in a package that manifests itself in another project. run yarn link inside of the sdk project.

```sh
YARN_IGNORE_PATH=1 yarn link
```

Use `yarn link "@monerium/sdk"` to link and test into your current project.

```sh
cd ../your-project
yarn link "@monerium/sdk"
```

#### Publishing

When changes are merged to the `main` branch that follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard, [release-please](https://github.com/googleapis/release-please) workflow creates a pull request, preparing for the next release. If kept open, the following commits will also be added to the PR. Merging that PR will create a new release, a workflow will publish it on NPM and tag it on Github.

## FAQs

Common questions developers have regarding the SDK.

## Support

[Support](https://monerium.app/help)
[Telegram](https://t.me/+lGtM1gY9zWthNGE8)
[Github Issues](https://github.com/monerium/sdk/issues)

## Release Notes

https://github.com/monerium/sdk/releases

## License

Information about the software license.

[End of the SDK Documentation]

---

This template is a comprehensive starting point. Each section should contain detailed information relevant to your SDK to guide your users from installation to effective usage and troubleshooting. Be sure to adjust the headers and content to suit your SDK's unique needs and features.
