import type { Config } from "./types.ts";

const MONERIUM_CONFIG: Config = {
  environments: {
    production: {
      api: "https://api.monerium.app",
      web: "https://monerium.app",
    },
    sandbox: {
      api: "https://api.monerium.dev",
      web: "https://sandbox.monerium.dev",
    },
  },
};

export { MONERIUM_CONFIG };
