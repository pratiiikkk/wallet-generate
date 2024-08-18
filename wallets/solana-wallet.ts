import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39"; // Ensure you have this import
import bs58 from "bs58";
export async function generateKeypairFromMnemonic(mnemonic: string,walletNo:number=0) {
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${walletNo}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secretKeyUint8Array = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const publicKey = Keypair.fromSecretKey(secretKeyUint8Array).publicKey.toBase58();
  const secretKey = bs58.encode(secretKeyUint8Array); // Convert secretKey to base58 string
  return { publicKey, secretKey };
}

//example usage
// const mnemonic = "door alarm swamp crawl luggage material glare enjoy casino blood machine humor";
// const { publicKey, secretKey } = generateKeypairFromMnemonic(mnemonic);
// console.log(publicKey, secretKey);
