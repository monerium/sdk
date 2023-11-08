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

Interfaces:

- {@link client.MoneriumClient}

#### Authenticate using Client Credentials

> Client Credentials is used when there's no need for user interaction, and the system-to-system interaction requires authentication.

```ts
(await client.auth({
  client_id: 'your_client_credentials_uuid', // replace with your client ID
  client_secret: 'your_client_secret', // replace with your client secret
})) as ClientCredentialsRequest;

// Retrieve authentication data after successful authentication.
await client.getAuthContext();

// Access tokens are now available for use.
const { access_token, refresh_token } = client.bearerProfile as BearerProfile;
```

Interfaces:

- {@link types.ClientCredentialsRequest}
- {@link types.BearerProfile}

API documentation:

- [/auth/token](https://monerium.dev/api-docs#operation/auth-token)
- [/auth/context](https://monerium.dev/api-docs#operation/auth-context)

#### Authenticate using Authorization Code Flow with PKCE

> Authorization Code Flow with PKCE is used for apps where direct user interaction is involved, and the application is running on an environment where the confidentiality of a secret cannot be safely maintained. It allows the application to authorize users without handling their passwords and mitigates the additional risk involved in this sort of delegation.

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
(await client.auth({
  client_id: 'your_client_authflow_uuid', // replace with your client ID
  code: authCode,
  code_verifier: retrievedCodeVerifier,
  redirect_url: 'http://your-webpage.com/monerium-integration', // ensure this matches the redirect_uri used initially
})) as AuthCodeRequest;

// Confirm the user is authenticated and retrieve the authentication data.
await client.getAuthContext();

// Your access and refresh tokens are now available.
const { access_token, refresh_token } = client.bearerProfile as BearerProfile;
```

Interfaces:

- {@link types.AuthCodeRequest}
- {@link types.BearerProfile}

API documentation:

- [/auth](https://monerium.dev/api-docs#operation/auth)
- [/auth/token](https://monerium.dev/api-docs#operation/auth-token)
- [/auth/context](https://monerium.dev/api-docs#operation/auth-context)

#### Get account information

```ts
// Get all profiles for the authenticated user.
const authCtx: AuthContext = await client.getAuthContext();

// Fetching all accounts for a specific profile
const { id: profileId, accounts }: Profile = await client.getProfile(
  authCtx.profiles[0].id,
);

// Fetching all balances for a specific profile
const balances: Balances = await client.getBalances(profileId);
```

Interfaces:

- {@link types.AuthContext}
- {@link types.Profile}
- {@link types.Balances}

API documentation:

- [/auth/context](https://monerium.dev/api-docs#operation/auth-context)
- [/profile](https://monerium.dev/api-docs#operation/profile)
- [/profile/{profiledId}/balances](https://monerium.dev/api-docs#operation/profile-balances)

#### Get token information

Get the contract addresses of EURe tokens.

```ts
const tokens: Token[] = await client.getTokens();
```

Interfaces:

- {@link types.Token}

API documentation:

- [/tokens](https://monerium.dev/api-docs#operation/tokens)

#### Link a new address to Monerium

It's important to understand, when interacting with a blockchain, the user needs to provide a signature in their wallet.
This signature is used to verify that the user is the owner of the wallet address.

We recommend Viem as an Ethereum interface, see: https://viem.sh/docs/actions/wallet/signMessage.html

```ts

import { constants } from '@monerium/sdk';
import { walletClient } from '...' // See View documentation

const { LINK_MESSAGE } = constants; // "I hereby declare that I am the address owner."

// Send a signature request to the wallet.
const signature = await walletClient.signMessage({
  message: LINK_MESSAGE,
})

// Link a new address to Monerium and create accounts for ethereum and gnosis.
await client.linkAddress(profileId, {
  address: '0xUserAddress72413Fa92980B889A1eCE84dD', // user wallet address
  message: LINK_MESSAGE
  signature,
  accounts: [
    {"currency":"eur","chain":"ethereum","network":"goerli"},
    {"currency":"eur","chain":"gnosis","network":"chiado"}
  ],
} as LinkAddress);
```

Interfaces:

- {@link types.LinkAddress}

API documentation:

- [/profile/{profiledId}/addresses](https://monerium.dev/api-docs#operation/profile-addresses)

#### Get and place orders

```ts
// Get orders for a specific profile
const orders: Order[] = await client.getOrders(profileId);
```

```ts
// Place a redeem order
import { placeOrderMessage } from '@monerium/sdk';
import { walletClient } from '...'; // See View documentation

const amount = '100'; // replace with the amount in EUR
const iban = 'EE12341234123412341234'; // replace with requested IBAN

// First you have to form the message that will be signed by the user
const message = placeOrderMessage(amount, iban);

// The message should look like this, with the current date and time in RFC3339 format:
// Send EUR 100 to EE12341234123412341234 at Thu, 29 Dec 2022 14:58:29Z

// Send a signature request to the wallet.
const signature = await walletClient.signMessage({
  message: message,
});

// Place the order
const order = await client.placeOrder({
  amount,
  signature,
  address: '0xUserAddress72413Fa92980B889A1eCE84dD', // user wallet address
  counterpart: {
    identifier: {
      standard: 'iban', // PaymentStandard.iban,
      iban,
    },
    details: {
      firstName: 'User',
      lastName: 'Userson',
      county: 'IS',
    },
  },
  message,
  memo: 'Powered by Monerium SDK',
  chain: 'ethereum',
  network: 'goerli',
  // supportingDocumentId, see below
});
```

Interfaces:

- {@link types.Order}
- {@link types.PaymentStandard}

API documentation:

- [GET /orders](https://monerium.dev/api-docs#operation/orders)
- [POST /orders](https://monerium.dev/api-docs#operation/post-orders)

#### Add supporting documents

When placing orders with payouts above 15,000 EUR, a supporting document is required. The document must be uploaded to Monerium before the order can be placed. Supporting documents can be an invoice or an agreement.

```ts
// Upload a supporting document
const supportingDocumentId: SupportingDoc = await uploadSupportingDocument(
  document,
);
```

Interfaces:

- {@link types.SupportingDoc}

API documentation:

- [/files](https://monerium.dev/api-docs#operation/supporting-document)

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

# Update the docs. This will run the build and update the docs in the static folder.
# Open static/index.html in your browser to view the docs. Refresh the page to see changes.
yarn docs:watch
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

If you get an error that there is already a package called '@monerium/sdk' registered, but you can't find it and unlinking does nothing, remove it manually with `rm -rf ~/.config/yarn/link/@monerium` and try again.

```sh

#### Documentation

Refer to [Typedocs](https://typedoc.org/) syntaxes to use for this [documentation](https://monerium.github.io/sdk/).

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
```
