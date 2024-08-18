import { generateMnemonic, validateMnemonic } from "bip39";


export const generateRandomPhrase = async (length:number) => {
    const words = generateMnemonic(length === 12 ? 128 : 256);
    return words.split(" ");
  };