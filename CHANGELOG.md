# Changelog

## [2.6.2](https://github.com/monerium/sdk/compare/v2.6.1...v2.6.2) (2023-10-18)


### Bug Fixes

* add missing info from README [no-ci] ([600bda5](https://github.com/monerium/sdk/commit/600bda52f9d8b61aa47222ace5308d3087e674e5))
* **docs:** add source code link to README ([c2a9294](https://github.com/monerium/sdk/commit/c2a9294f49e60ba9fd9373d94ec6069b6b559fb0))
* revert changes to action ([36eada9](https://github.com/monerium/sdk/commit/36eada92b89b9bf1de0659f74479d27b58697975))
* update docs on every push to main ([e0f57e6](https://github.com/monerium/sdk/commit/e0f57e61312a5fce0d02608eed6fc7c5aaba5b09))

## [2.6.1](https://github.com/monerium/sdk/compare/v2.6.0...v2.6.1) (2023-09-11)


### Bug Fixes

* add info how to set environment ([c803cc5](https://github.com/monerium/sdk/commit/c803cc579ea11006ab845d4a4790e2a9bffae0b0))

## [2.6.0](https://github.com/monerium/sdk/compare/v2.5.2...v2.6.0) (2023-07-19)


### Features

* removed Chain and Network enum ([600a634](https://github.com/monerium/sdk/commit/600a6348f4f6ce0b3f2cc472c807520620bc0d60))


### Bug Fixes

* constants typed import ([600a634](https://github.com/monerium/sdk/commit/600a6348f4f6ce0b3f2cc472c807520620bc0d60))

## [2.5.2](https://github.com/monerium/sdk/compare/v2.5.1...v2.5.2) (2023-07-05)


### Bug Fixes

* add state to Account type, closes [#96](https://github.com/monerium/sdk/issues/96) ([5693146](https://github.com/monerium/sdk/commit/5693146d8951e9e7024dcd1f8c262707ade8f642))
* getBalances always returns an array, closes [#98](https://github.com/monerium/sdk/issues/98) ([144b1f9](https://github.com/monerium/sdk/commit/144b1f944c78269bf9ebed72a5da046511a15aea))

## [2.5.1](https://github.com/monerium/sdk/compare/v2.5.0...v2.5.1) (2023-06-15)


### Bug Fixes

* extend timeout on place order test ([0a81449](https://github.com/monerium/sdk/commit/0a81449e201df00045694af693c866b801ddea32))

## [2.5.0](https://github.com/monerium/sdk/compare/v2.4.1...v2.5.0) (2023-06-15)


### Features

* expose rfc3339 function ([f9e5bec](https://github.com/monerium/sdk/commit/f9e5bec6fbd2209f58b240be90d833f8fdcaae0a))


### Bug Fixes

* should be client.codeVerifier ([46c986a](https://github.com/monerium/sdk/commit/46c986a246cf4623ce283b2e8b2f9bc2c4c9ad35))

## [2.4.1](https://github.com/monerium/sdk/compare/v2.4.0...v2.4.1) (2023-05-10)


### Bug Fixes

* placeOrderMessage parameters, should take two arguments instead of one nested ([5c32da0](https://github.com/monerium/sdk/commit/5c32da01f3a0018aa69f00511f63fba8c3d7ec8b))

## [2.4.0](https://github.com/monerium/sdk/compare/v2.3.0...v2.4.0) (2023-05-09)


### Features

* kind always redeem from place order [#87](https://github.com/monerium/sdk/issues/87) ([#88](https://github.com/monerium/sdk/issues/88)) ([850921e](https://github.com/monerium/sdk/commit/850921ed0aa8d36e180ee7c1df439e04f5d7085b))


### Bug Fixes

* custom urlEncoder for x-www-forms so the package works for Metamask snapa ([#91](https://github.com/monerium/sdk/issues/91)) ([8375164](https://github.com/monerium/sdk/commit/83751645565c4b7054f8aabffaa8f91eea8d5caf))
* lint ([82f8f7c](https://github.com/monerium/sdk/commit/82f8f7c0192b235c4e0e584a25d52490e1575aa3))
* vscode cant detect the configs in nested folder ([#89](https://github.com/monerium/sdk/issues/89)) ([398dcf1](https://github.com/monerium/sdk/commit/398dcf1513de86a7c3949493e3728aac746349fa))
* we only support EUR for now + adjust placeOrder request type ([1c54932](https://github.com/monerium/sdk/commit/1c549321192c115947f1ce574c97cf618353a6ef))
* we only support EUR for now + adjust placeOrder request type ([07f801a](https://github.com/monerium/sdk/commit/07f801a1088bf2df014af549214199bb17ee8f51))


### Miscellaneous

* add a comment to explain how to use the Network type ([c913224](https://github.com/monerium/sdk/commit/c9132242d2f977524ba6467210344b1c8dc51e85))
* add info about sdks to Readme ([ad10488](https://github.com/monerium/sdk/commit/ad10488ce634787bee3b1eab8be6b8d78f56f834))

## [2.3.0](https://github.com/monerium/sdk/compare/v2.2.3...v2.3.0) (2023-04-30)


### ⚠ BREAKING CHANGES

* '@monerium/sdk' now exports Network and Chain as types, previously enums </br> Enums are now exported under 'constants' </br> import { constants } from '@monerium/sdk'; </br> const { Network } = constants; </br></br> new Network type takes two optional params for Chain and Environmant</br> import { Network } from '@monerium/sdk'</br></br> // is valid </br> const network: Network<'gnosis','production> = 'mainnet';</br> const network: Network<'gnosis','sandbox> = 'chiado';</br> const network: Network<'gnosis',> = 'chiado';</br> const network: Network = 'chiado';</br></br> // is invalid </br> const network: Network<'gnosis','sandbox> = 'mainnet';</br> const network: Network<'gnosis'> = 'goerli';</br>

### Features

* expose helper to create place order message ([#85](https://github.com/monerium/sdk/issues/85)) ([b124370](https://github.com/monerium/sdk/commit/b1243702c534a6d40e0ce657ff8db9a6f55546a5))
* network types with optional chain and env type params ([#82](https://github.com/monerium/sdk/issues/82)) ([154d626](https://github.com/monerium/sdk/commit/154d626798150640ac2ed331b98029a18984555c))
* refactor, improve and test fetch ([#86](https://github.com/monerium/sdk/issues/86)) ([26a8ceb](https://github.com/monerium/sdk/commit/26a8ceb78ec38553709afa2add0108ee3e10e125))


### Miscellaneous

* release 2.3.0 ([bff6ece](https://github.com/monerium/sdk/commit/bff6ece14c0b7b7a362b21df0b024b0a6a8f6678))

## [2.2.3](https://github.com/monerium/sdk/compare/v2.2.2...v2.2.3) (2023-04-28)


### Bug Fixes

* commonjs bundle not properly referenced in package.json ([85d4b19](https://github.com/monerium/sdk/commit/85d4b19c054102b48b9cd55c55b498965e9db7b6))


### Miscellaneous

* add version to action step ([804d0d8](https://github.com/monerium/sdk/commit/804d0d843b809aad960f224a0602edd3359454fc))

## [2.2.2](https://github.com/monerium/sdk/compare/v2.2.1...v2.2.2) (2023-04-26)


### Bug Fixes

* coverage output path ([675b7cd](https://github.com/monerium/sdk/commit/675b7cd3536a320dcbe915bfeb077609bfa834b1))


### Miscellaneous

* archive build and reuse for deploying static files. ([#80](https://github.com/monerium/sdk/issues/80)) ([cfc34d8](https://github.com/monerium/sdk/commit/cfc34d80f2db547505c34b55ab3b2a7d0a37aae5))
* move .prettierignore into configs folder and add some rules ([171b0b3](https://github.com/monerium/sdk/commit/171b0b3c5dc807f0bec0cc9220b390302fdd98e9))

## [2.2.1](https://github.com/monerium/sdk/compare/v2.2.0...v2.2.1) (2023-04-26)

### Miscellaneous

- backward support for node 16.15 ([a80379b](https://github.com/monerium/sdk/commit/a80379b8849f78e541d9f4455cd12cd676e7751f))
- ignore release please branches for build ([4b68cfa](https://github.com/monerium/sdk/commit/4b68cfa17380432136620acb67e856619333e3aa))
- move configs to reduce clutter in root folder ([#78](https://github.com/monerium/sdk/issues/78)) ([f2dcb21](https://github.com/monerium/sdk/commit/f2dcb2190811c9521e029eb15caef3b4ee557c4a))

## [2.2.0](https://github.com/monerium/sdk/compare/v2.1.23...v2.2.0) (2023-04-25)

### Features

- use Yarn PnP ([#73](https://github.com/monerium/sdk/issues/73)) ([4295154](https://github.com/monerium/sdk/commit/4295154487c3eb255b23816b5cf32aac52cae710))

## [2.1.23](https://github.com/monerium/sdk/compare/v2.1.22...v2.1.23) (2023-04-25)

### Bug Fixes

- now it should publish succesfully to npm registry ([#71](https://github.com/monerium/sdk/issues/71)) ([5b5e37b](https://github.com/monerium/sdk/commit/5b5e37b2cde1d1e0411e3e023cfcd5f7eca376d6))

## [2.1.22](https://github.com/monerium/sdk/compare/v2.1.21...v2.1.22) (2023-04-24)

### Bug Fixes

- deploy static pipeline ([#69](https://github.com/monerium/sdk/issues/69)) ([38067e7](https://github.com/monerium/sdk/commit/38067e75e3334b6eb20dcc182f1d6aaca5af0caa))

## [2.1.21](https://github.com/monerium/sdk/compare/v2.1.20...v2.1.21) (2023-04-24)

### Miscellaneous

- cleanup changelog history ([1c4b12b](https://github.com/monerium/sdk/commit/1c4b12b77eaa61d07b0b39d056a35f505416039a))

## [2.1.20](https://github.com/monerium/sdk/compare/v2.0.19...v2.1.20) (2023-04-24)

Issues with Github Actions and Yarn v3 resolved.

## [2.0.19](https://github.com/monerium/sdk/compare/v2.0.18...v2.0.19) (2023-04-24)

### Bug Fixes

- include network and chain in linkAccount ([cd7fe6e](https://github.com/monerium/sdk/commit/cd7fe6e4b52dc38f589e081b7afa6dc36f2436f8))
- pipeline error ([d489695](https://github.com/monerium/sdk/commit/d489695a567630b0da0a7ec2269569b0eaac93f2))
- return BearerProfile from auth function ([ef7fe3b](https://github.com/monerium/sdk/commit/ef7fe3b58b21e3671602c70545e4a04669dd6461))

### Miscellaneous

- added backwards compatibility to node v17.5 ([61bba5e](https://github.com/monerium/sdk/commit/61bba5e15131e7d125ce03fcb65b39120559d9f3))
- migrate to yarn v3 ([4d47d6f](https://github.com/monerium/sdk/commit/4d47d6fe4e798e8af61eab7dd03b188322fd0f31))
- set node engine &gt;= 17.5 ([407cf66](https://github.com/monerium/sdk/commit/407cf66eefa9734e89df9e031f523db70abf7674))

## [2.0.18](https://github.com/monerium/sdk/compare/v2.0.17...v2.0.18) (2023-04-21)

### Bug Fixes

- es6 module imports ([00edf8d](https://github.com/monerium/sdk/commit/00edf8d600e6944fbcc17da00351ffae9ee79b53))
- test credentials ([00edf8d](https://github.com/monerium/sdk/commit/00edf8d600e6944fbcc17da00351ffae9ee79b53))

### Miscellaneous

- explain and add uppercase to the -randomness- ([5ed54d8](https://github.com/monerium/sdk/commit/5ed54d86a79b88293c595bd23ecf07cd30aafe63))

## [2.0.17](https://github.com/monerium/sdk/compare/v2.0.16...v2.0.17) (2023-02-25)

### Miscellaneous

- dont use crypto-js for randomizing a string ([412957e](https://github.com/monerium/sdk/commit/412957e028d968bbc483dbc6f8724f7e2da4739a))

## [2.0.16](https://github.com/monerium/sdk/compare/v2.0.15...v2.0.16) (2023-02-25)

### Bug Fixes

- broken build ([b05107c](https://github.com/monerium/sdk/commit/b05107c9e7246153807fe9a8ca65066f9fede989))

## [2.0.15](https://github.com/monerium/sdk/compare/v2.0.14...v2.0.15) (2023-02-25)

### Bug Fixes

- broken build ([8278788](https://github.com/monerium/sdk/commit/8278788a9bc456016805e9fc65cb1137174e096e))

## [2.0.14](https://github.com/monerium/sdk/compare/v2.0.13...v2.0.14) (2023-02-25)

### Bug Fixes

- broken package ([e3cc93e](https://github.com/monerium/sdk/commit/e3cc93ecab62129387b4bd6ba7d4151adab48ca3))

## [2.0.13](https://github.com/monerium/sdk/compare/v2.0.12...v2.0.13) (2023-02-25)

### Bug Fixes

- pkce incorrect encoding + replaced crypto-js with node:crypto polyfill. ([c1b4e66](https://github.com/monerium/sdk/commit/c1b4e66b4bcf906c414b15250d6aaf9485f931a7))

## [2.0.12](https://github.com/monerium/sdk/compare/v2.0.11...v2.0.12) (2023-02-25)

### Bug Fixes

- replace encodeBase64Url, not available in the downgraded version of crypto-js ([c883b64](https://github.com/monerium/sdk/commit/c883b6422b1d068752a420abce2ce3a14d8a4092))

## [2.0.11](https://github.com/monerium/sdk/compare/v2.0.10...v2.0.11) (2023-02-25)

### Bug Fixes

- crypto-js to 3.1.9-1 because of https://github.com/brix/crypto-js/issues/256 ([00bffd9](https://github.com/monerium/sdk/commit/00bffd9e7e90315f09cee4a8ade60121d1e1b75a))

### Miscellaneous

- remove unnecessary comment ([c8d64ad](https://github.com/monerium/sdk/commit/c8d64adad6157eecd1e2a3faf0bec0a86da74f07))

## [2.0.10](https://github.com/monerium/sdk/compare/v2.0.9...v2.0.10) (2023-02-16)

### Miscellaneous

- define properties for automatic wallet link on auth flow ([#19](https://github.com/monerium/sdk/issues/19)) ([3bf845c](https://github.com/monerium/sdk/commit/3bf845cac60bb8a2d5ee7a9dbfa56c76f6996178))

## [2.0.9](https://github.com/monerium/sdk/compare/v2.0.8...v2.0.9) (2023-02-06)

### Bug Fixes

- build files ([1b0f99f](https://github.com/monerium/sdk/commit/1b0f99fcc6635de69b62de72198f22daa2d36b10))

## [2.0.8](https://github.com/monerium/sdk/compare/v2.0.7...v2.0.8) (2023-02-06)

### Bug Fixes

- move dts-bundle config to configs and update paths ([2de558f](https://github.com/monerium/sdk/commit/2de558f6c69b5c72d77ee1065e326d05072ad16c))

### Miscellaneous

- add getting started to README and document pckeRequest ([8cf68dd](https://github.com/monerium/sdk/commit/8cf68dd7fcf28b098192ca0da8dfdb3878a3e449))
- deprecate pkceRequest for getAuthFlowURI ([4f33174](https://github.com/monerium/sdk/commit/4f33174abbdbc0758b61efc4161e4fc234524ca5))

## [2.0.7](https://github.com/monerium/sdk/compare/v2.0.6...v2.0.7) (2023-01-11)

### Miscellaneous

- add commitlint ([bdae6d8](https://github.com/monerium/sdk/commit/bdae6d83ed386d80be0f27e362e6622ad6ca0ffd))
- add theme for typedoc to expand and make the sidebar more useful ([355f0f8](https://github.com/monerium/sdk/commit/355f0f839b27bdaeaead2463c0afc48409080041))
- fix and document pckeRequest ([3905283](https://github.com/monerium/sdk/commit/390528378206149862795ee7a46b54649927e384))

## [2.0.6](https://github.com/monerium/sdk/compare/v2.0.0...v2.0.6) (2023-01-05)

### Bug Fixes

- Update TypeDocs and set workflow to run only on release ([42e5b41](https://github.com/monerium/sdk/commit/42e5b417eca0e2e1f7d7af51a5cde59df28c1ba0))
- Update TypeDocs and set workflow to run only on release ([#7](https://github.com/monerium/sdk/issues/7)) ([42e5b41](https://github.com/monerium/sdk/commit/42e5b417eca0e2e1f7d7af51a5cde59df28c1ba0))

### Miscellaneous

- cleanup ([5c75dea](https://github.com/monerium/sdk/commit/5c75dea7ee3cd8468a09fdf2f70024047e87f3a0))
- **main:** release 2.0.5 ([#13](https://github.com/monerium/sdk/issues/13)) ([21c4052](https://github.com/monerium/sdk/commit/21c405262a6f6d0503dadc11aea483c2ebf3574f))

## [2.0.5](https://github.com/monerium/sdk/compare/v2.0.0...v2.0.5) (2023-01-05)

### Bug Fixes

- Update TypeDocs and adjust workflows ([42e5b41
  ](https://github.com/monerium/sdk/commit/42e5b417eca0e2e1f7d7af51a5cde59df28c1ba0))
