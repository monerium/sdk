import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts";

await emptyDir("./node");

await build({
  packageManager: "yarn",
  entryPoints: ["./mod.ts"],
  outDir: "./node",
  shims: {
    deno: true,
    crypto: true,
    undici: true,
    custom: [{
      package: {
        name: "util",
      },
      globalNames: ["TextEncoder"],
    }],
  },
  package: {
    name: "@monerium/sdk",
    version: Deno.args[0]?.replace(/^v/, ""),
    description:
      "Everything you need to interact with the Monerium API - an electronic money issuer.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/monerium/sdk.git",
    },
    bugs: {
      url: "https://github.com/monerium/sdk/issues",
    },
  },
});

Deno.copyFileSync("LICENSE", "node/LICENSE");
Deno.copyFileSync("README.md", "node/README.md");
