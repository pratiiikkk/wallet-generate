import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export async function generateKeypairFromMnemonicEth(
  mnemonic: string,
  walletNo: number = 0
) {
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/60'/${walletNo}'/0'`; // This is the derivation path
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(path);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);
  return { publicKey: wallet.address, secretKey: wallet.privateKey };
}
