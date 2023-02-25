import { randomBytes, createHash } from "crypto";

export const generatePKCEPair = () => {
  const NUM_OF_BYTES = 64;
  const randomVerifier = randomBytes(NUM_OF_BYTES).toString("hex");
  const challenge = generatePKCEChallenge(randomVerifier);
  return { verifier: randomVerifier, challenge };
};

export const generatePKCEChallenge = (verifier: string) => {
  return createHash("sha256")
    .update(verifier)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};
