"use client";

import { createContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getItem, setItem } from "@/lib/storage";
import { generateRandomPhrase } from "@/lib/generatePhrase";
import Wallets from "./Wallets";


interface WalletProps {
  type: string;
  
}
export const walletsContext = createContext<any>(null);

function Wallet({ type }: WalletProps) {
  const [recoveryPhrase, setRecoveryPhrase] = useState<string[] | null>(null);
  async function handleGeneratePhrase(mnemonic?: string) {
    if (mnemonic) {
      setItem("mnemonic", JSON.stringify(mnemonic.split(" ")));
      setRecoveryPhrase(mnemonic.split(" "));
      return;
    }
    const phrase = await generateRandomPhrase(12);
    console.log();
    setItem("mnemonic", JSON.stringify(phrase));
    setRecoveryPhrase(phrase);
  }
  useEffect(() => {
    const phrase = getItem("mnemonic");
    if (phrase) {
      setRecoveryPhrase(JSON.parse(phrase));
    }
  }, []);
  return (
    <walletsContext.Provider value={{recoveryPhrase,setRecoveryPhrase}}>

    <div>
      {recoveryPhrase === null ? (
          <div>
          <div>
            <p className="text-4xl font-bold">Secret Recovery Phrase</p>
            <p className="text-lg">Save these words in a safe place.</p>
          </div>
          <div className="py-2 flex gap-2">
            <Input placeholder="Enter your recovery phrase or generate a new one" 
            onBlur={(e) => {
              handleGeneratePhrase(e.target.value);
            }}
            />
            <Button onClick={
              () => handleGeneratePhrase()
            }>Generate</Button>
          </div>
        </div>
      ) : (
        <>
          {type === "ethereum" ? (
              <>
              <Wallets type={type} mnemonic={recoveryPhrase} />
            </>
          ) : type === "solana" ? (
              <>
              <Wallets type={type} mnemonic={recoveryPhrase} />
            </>
          ) : (
              ""
            )}
        </>
      )}
    </div>
      </walletsContext.Provider>
  );
}

export default Wallet;
