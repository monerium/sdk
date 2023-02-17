import { ethers } from "ethers";
/**
 * Create a burner address and sign a message with it
 * @param message The message to be signed
 * @returns { signature, publicKey, privateKey }
 */
const burnerSign = async (message: string) => {
  // Generate a new Ethereum account
  const wallet = ethers.Wallet.createRandom();

  // Get the private key and public key from the wallet
  const publicKey = wallet.address;
  const privateKey = wallet.privateKey;

  // Sign a message with the private key
  const signature = await wallet.signMessage(message);

  return {
    signature,
    publicKey,
    privateKey,
  };
};

const retrieveWalletAndSign = async (message: string, privateKey: string) => {
  // Create a wallet from the private key
  const wallet = new ethers.Wallet(privateKey);

  // Sign a message with the private key
  const signature = await wallet.signMessage(message);

  return signature;
};

export { burnerSign, retrieveWalletAndSign };
