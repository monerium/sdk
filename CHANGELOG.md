# Changelog


## [2.1.22](https://github.com/monerium/sdk/compare/v2.1.21...v2.1.22) (2023-04-24)


### Bug Fixes

* deploy static pipeline ([#69](https://github.com/monerium/sdk/issues/69)) ([38067e7](https://github.com/monerium/sdk/commit/38067e75e3334b6eb20dcc182f1d6aaca5af0caa))


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
