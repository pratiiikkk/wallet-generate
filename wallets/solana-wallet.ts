import { Keypair } from "@solana/web3.js";


// Function to generate a new keypair and return the keys
export function generateKeypairSolana() {
  // Generate a new keypair
  const keypair = Keypair.generate();
 
  // Extract the public and private keys
  const publicKey = keypair.publicKey.toString();
  const secretKey = keypair.secretKey;

  
  // Return the keys as an object
  return {
    publicKey,
    secretKey
  };
}


