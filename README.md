# @monerium/sdk

Everything you need to interact with the Monerium API - an electronic money issuer.

_This package is in development. Please make sure to check if any future updates contain commits
that may change the behavior of your application before you upgrade._

## Installing

```sh
# Node
yarn add @monerium/sdk
```

## Developing

## Usage

- `start`: Run Vite in host mode for a local development environment (not included in production build)
- `watch`: Run Vite in watch mode to detect changes to files during development
- `build`: Run Vite to build a production release distributable


If you want to make any code contributions, make sure to run the following commands before you pr
them:

```sh
yarn format
yarn lint
yarn test
```

## Publishing

Update your `package.json` to next version number, and remember to tag a release.

Once ready to submit your package to the NPM Registry, execute the following tasks via `yarn`:

- `yarn clean` &mdash; Assure a clean build
- `yarn build` &mdash; Build the package

Submit your package to the registry:

```
yarn publish
