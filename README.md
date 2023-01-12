# @monerium/sdk

Everything you need to interact with the Monerium API - an electronic money issuer.

_This package is in development. Please make sure to check if any future updates contain commits
that may change the behavior of your application before you upgrade._

[Documentation](https://monerium.github.io/sdk/)

[Code coverage](https://monerium.github.io/sdk/coverage)

## Installing

```sh
# Node
yarn add @monerium/sdk
```

## Developing

We are using [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) to enforce that developers format the commit messages according to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

## Usage

- `start`: Run Vite in host mode for a local development environment (not included in production build)
- `watch`: Run Vite in watch mode to detect changes to files during development
- `build`: Run Vite to build a production release distributable

## Publishing

When changes are merged to the `main` branch that follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard, [release-please](https://github.com/googleapis/release-please) workflow creates a pull request, preparing for the next release. If kept open, the following commits will also be added to the PR. Merging that PR will create a new release, a workflow will publish it on NPM and tag it on Github.

