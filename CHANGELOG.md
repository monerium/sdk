# Changelog


## [2.0.6](https://github.com/monerium/sdk/compare/v2.0.19...v2.0.6) (2023-04-24)


### Features

* add link account function ([f521fb3](https://github.com/monerium/sdk/commit/f521fb3ae8bdda62ed0418f426fd0a152b0c1e46))
* add monerium client ([1aee84d](https://github.com/monerium/sdk/commit/1aee84dbf1cf8a0039488288ce32b0613f929cdd))
* add monerium config ([d7f3fa1](https://github.com/monerium/sdk/commit/d7f3fa1a863b64a9deeb3cdaf2113c670d2e8347))
* change from deno to node ([d9d5f03](https://github.com/monerium/sdk/commit/d9d5f03c4a9b221e2bd2a1ed6c7fd40b70dd1183))


### Bug Fixes

* broken build ([b05107c](https://github.com/monerium/sdk/commit/b05107c9e7246153807fe9a8ca65066f9fede989))
* broken build ([8278788](https://github.com/monerium/sdk/commit/8278788a9bc456016805e9fc65cb1137174e096e))
* broken package ([e3cc93e](https://github.com/monerium/sdk/commit/e3cc93ecab62129387b4bd6ba7d4151adab48ca3))
* build files ([1b0f99f](https://github.com/monerium/sdk/commit/1b0f99fcc6635de69b62de72198f22daa2d36b10))
* correct fs and crypto import maps? ([0edc625](https://github.com/monerium/sdk/commit/0edc625a063e2a262f11008271f13512f332835b))
* coverage report added to github pages ([#4](https://github.com/monerium/sdk/issues/4)) ([c721ddd](https://github.com/monerium/sdk/commit/c721ddd08477a69c64e190a1ecf073688871da31))
* crypto-js to 3.1.9-1 because of https://github.com/brix/crypto-js/issues/256 ([00bffd9](https://github.com/monerium/sdk/commit/00bffd9e7e90315f09cee4a8ade60121d1e1b75a))
* es6 module imports ([00edf8d](https://github.com/monerium/sdk/commit/00edf8d600e6944fbcc17da00351ffae9ee79b53))
* format and lint ([8701928](https://github.com/monerium/sdk/commit/87019285cb3d49ace5f658fffeaf6e7900041c12))
* include network and chain in linkAccount ([cd7fe6e](https://github.com/monerium/sdk/commit/cd7fe6e4b52dc38f589e081b7afa6dc36f2436f8))
* include node auth in yarnrc ([9fd64aa](https://github.com/monerium/sdk/commit/9fd64aa0f2e401fe1dbf8979e85dc9ec7e302ba0))
* move dts-bundle config to configs and update paths ([2de558f](https://github.com/monerium/sdk/commit/2de558f6c69b5c72d77ee1065e326d05072ad16c))
* npm publish ([82805a1](https://github.com/monerium/sdk/commit/82805a16a3183eecbf29c6421d50691ba0aaf4c8))
* npm publish ([e2f4d46](https://github.com/monerium/sdk/commit/e2f4d46635715f82ce0b84de24cbf14d642fede4))
* pipeline error ([d489695](https://github.com/monerium/sdk/commit/d489695a567630b0da0a7ec2269569b0eaac93f2))
* pkce incorrect encoding + replaced crypto-js with node:crypto polyfill. ([c1b4e66](https://github.com/monerium/sdk/commit/c1b4e66b4bcf906c414b15250d6aaf9485f931a7))
* replace encodeBase64Url, not available in the downgraded version of crypto-js ([c883b64](https://github.com/monerium/sdk/commit/c883b6422b1d068752a420abce2ce3a14d8a4092))
* return BearerProfile from auth function ([ef7fe3b](https://github.com/monerium/sdk/commit/ef7fe3b58b21e3671602c70545e4a04669dd6461))
* test credentials ([00edf8d](https://github.com/monerium/sdk/commit/00edf8d600e6944fbcc17da00351ffae9ee79b53))
* trigger Please release ([4d92507](https://github.com/monerium/sdk/commit/4d92507dec39508e8fa83359e0baecff98434b27))
* try import map for polyfills ([313eb2c](https://github.com/monerium/sdk/commit/313eb2c931d058e3d5ac379a2f908c8d96870c86))
* update packages ([240e844](https://github.com/monerium/sdk/commit/240e844924019a401607089d0836170f95748915))
* Update TypeDocs and set workflow to run only on release ([42e5b41](https://github.com/monerium/sdk/commit/42e5b417eca0e2e1f7d7af51a5cde59df28c1ba0))
* Update TypeDocs and set workflow to run only on release ([#7](https://github.com/monerium/sdk/issues/7)) ([42e5b41](https://github.com/monerium/sdk/commit/42e5b417eca0e2e1f7d7af51a5cde59df28c1ba0))


### Miscellaneous

* add commitlint ([bdae6d8](https://github.com/monerium/sdk/commit/bdae6d83ed386d80be0f27e362e6622ad6ca0ffd))
* add getting started to README and document pckeRequest ([8cf68dd](https://github.com/monerium/sdk/commit/8cf68dd7fcf28b098192ca0da8dfdb3878a3e449))
* add theme for typedoc to expand and make the sidebar more useful ([355f0f8](https://github.com/monerium/sdk/commit/355f0f839b27bdaeaead2463c0afc48409080041))
* added backwards compatibility to node v17.5 ([61bba5e](https://github.com/monerium/sdk/commit/61bba5e15131e7d125ce03fcb65b39120559d9f3))
* cleanup ([5c75dea](https://github.com/monerium/sdk/commit/5c75dea7ee3cd8468a09fdf2f70024047e87f3a0))
* define properties for automatic wallet link on auth flow ([#19](https://github.com/monerium/sdk/issues/19)) ([3bf845c](https://github.com/monerium/sdk/commit/3bf845cac60bb8a2d5ee7a9dbfa56c76f6996178))
* deprecate pkceRequest for getAuthFlowURI ([4f33174](https://github.com/monerium/sdk/commit/4f33174abbdbc0758b61efc4161e4fc234524ca5))
* dont use crypto-js for randomizing a string ([412957e](https://github.com/monerium/sdk/commit/412957e028d968bbc483dbc6f8724f7e2da4739a))
* explain and add uppercase to the -randomness- ([5ed54d8](https://github.com/monerium/sdk/commit/5ed54d86a79b88293c595bd23ecf07cd30aafe63))
* fix and document pckeRequest ([3905283](https://github.com/monerium/sdk/commit/390528378206149862795ee7a46b54649927e384))
* **main:** release 2.0.10 ([#20](https://github.com/monerium/sdk/issues/20)) ([86ac1de](https://github.com/monerium/sdk/commit/86ac1de04bc9759defb7c1feca65a1b0037dc326))
* **main:** release 2.0.11 ([#21](https://github.com/monerium/sdk/issues/21)) ([4b2596e](https://github.com/monerium/sdk/commit/4b2596eb5440c17093221d6d11a8b09a24728d4e))
* **main:** release 2.0.12 ([#22](https://github.com/monerium/sdk/issues/22)) ([a540990](https://github.com/monerium/sdk/commit/a540990c16e9dce28651fc943cab24294f65432d))
* **main:** release 2.0.13 ([#24](https://github.com/monerium/sdk/issues/24)) ([fc17884](https://github.com/monerium/sdk/commit/fc17884e283918427a8c9121f7e30448c6e600fc))
* **main:** release 2.0.14 ([#26](https://github.com/monerium/sdk/issues/26)) ([2c9d133](https://github.com/monerium/sdk/commit/2c9d133c10ae55fe6be892b05fd45ee0942dea71))
* **main:** release 2.0.15 ([#27](https://github.com/monerium/sdk/issues/27)) ([596f6b3](https://github.com/monerium/sdk/commit/596f6b334167f65ce3372704100e390f8cd0894e))
* **main:** release 2.0.16 ([#28](https://github.com/monerium/sdk/issues/28)) ([4ac73ff](https://github.com/monerium/sdk/commit/4ac73ffdf876842e2be967ee784d5f6eb08dcf46))
* **main:** release 2.0.17 ([#29](https://github.com/monerium/sdk/issues/29)) ([52df1b3](https://github.com/monerium/sdk/commit/52df1b30b9874f6e92c0e491c5e9da7f203104b5))
* **main:** release 2.0.18 ([#32](https://github.com/monerium/sdk/issues/32)) ([50403ce](https://github.com/monerium/sdk/commit/50403ce0c1ed84af5f723bfbecc55531b6114cd9))
* **main:** release 2.0.19 ([#36](https://github.com/monerium/sdk/issues/36)) ([e0bf090](https://github.com/monerium/sdk/commit/e0bf090c31a63d71cc94fdaae0bfb8bacf6dd994))
* **main:** release 2.0.19 ([#41](https://github.com/monerium/sdk/issues/41)) ([0e6b96b](https://github.com/monerium/sdk/commit/0e6b96b0995b23ffe42649d9c101fbbdf6662c32))
* **main:** release 2.0.19 ([#42](https://github.com/monerium/sdk/issues/42)) ([3c21717](https://github.com/monerium/sdk/commit/3c21717eb19d73e4783adf329f192b7605a39c14))
* **main:** release 2.0.20 ([#38](https://github.com/monerium/sdk/issues/38)) ([58f29a6](https://github.com/monerium/sdk/commit/58f29a6161d5879445bdfe7059330782856ff917))
* **main:** release 2.0.21 ([#39](https://github.com/monerium/sdk/issues/39)) ([6e501bd](https://github.com/monerium/sdk/commit/6e501bd1cd11e08fa9e5c8de011b0582d85d3d4e))
* **main:** release 2.0.22 ([#40](https://github.com/monerium/sdk/issues/40)) ([8c3c975](https://github.com/monerium/sdk/commit/8c3c97580f1988a0741c3425a1ce0bc8bd877147))
* **main:** release 2.0.5 ([#13](https://github.com/monerium/sdk/issues/13)) ([21c4052](https://github.com/monerium/sdk/commit/21c405262a6f6d0503dadc11aea483c2ebf3574f))
* **main:** release 2.0.6 ([#15](https://github.com/monerium/sdk/issues/15)) ([60cadbd](https://github.com/monerium/sdk/commit/60cadbdf47252190abff68eb3879d57c4bd990c8))
* **main:** release 2.0.7 ([#16](https://github.com/monerium/sdk/issues/16)) ([cf622b6](https://github.com/monerium/sdk/commit/cf622b65a46f5fd8d76a583119cde0dd5e3fd090))
* **main:** release 2.0.8 ([#17](https://github.com/monerium/sdk/issues/17)) ([97b6bfc](https://github.com/monerium/sdk/commit/97b6bfca30b3bd4b3a6875bd20582e9d7f78e6f6))
* **main:** release 2.0.9 ([#18](https://github.com/monerium/sdk/issues/18)) ([f303564](https://github.com/monerium/sdk/commit/f303564795cdd0929f48a95b14035a2d6d419549))
* migrate to yarn v3 ([4d47d6f](https://github.com/monerium/sdk/commit/4d47d6fe4e798e8af61eab7dd03b188322fd0f31))
* release 2.0.19 ([30744fe](https://github.com/monerium/sdk/commit/30744fe5cdc181eaac9ae1b6c65dc07f69ac7141))
* remove unnecessary comment ([c8d64ad](https://github.com/monerium/sdk/commit/c8d64adad6157eecd1e2a3faf0bec0a86da74f07))
* set node engine &gt;= 17.5 ([407cf66](https://github.com/monerium/sdk/commit/407cf66eefa9734e89df9e031f523db70abf7674))
* trigger a build ([5463262](https://github.com/monerium/sdk/commit/54632624e4f3e03bcdd621d19a7b463935167241))

## [2.0.19](https://github.com/monerium/sdk/compare/v2.0.18...v2.0.19) (2023-04-24)

Force Please Release update..

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
