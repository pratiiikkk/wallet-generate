"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { removeItem, setItem } from "@/lib/storage";
import { walletsContext } from "./Wallet";
import { userContext } from "@/app/page";
import { generateKeypairFromMnemonic } from "@/wallets/solana-wallet";
import { toast } from "sonner";
import { Eye, Trash } from "lucide-react";
import BlurFade from "./BlurFade";
import { generateKeypairFromMnemonicEth } from "@/wallets/ether-wallet";

interface WalletsProps {
  type: string;
  mnemonic: string[];
}

interface Wallet {
  publicKey: string;
  secretKey: string;
}

const defaultWallets: Wallet[] = [
  {
    publicKey: "",
    secretKey: "",
  },
];

function Wallets({ type, mnemonic }: WalletsProps) {
  const [wallets, setWallets] = useState<Wallet[]>(defaultWallets);
  const { recoveryPhrase, setRecoveryPhrase } = useContext(walletsContext);
  const { setWallet } = useContext(userContext);

  useEffect(() => {
    if (type === "solana" && recoveryPhrase) {
      generateKeypairFromMnemonic(recoveryPhrase.join(" ")).then((data) => {
        const { publicKey, secretKey } = data;
        setWallets([{ publicKey, secretKey }]);
      });
    }

    if (type === "ethereum" && recoveryPhrase) {
      generateKeypairFromMnemonicEth(recoveryPhrase.join(" ")).then((data) => {
        const { publicKey, secretKey } = data;
        setWallets([{ publicKey, secretKey }]);
      });
    }
  }, [type, recoveryPhrase]);

  const handleAddWallet = useCallback(() => {
    if (type === "solana" && recoveryPhrase) {
      generateKeypairFromMnemonic(
        recoveryPhrase.join(" "),
        wallets.length
      ).then((data) => {
        const { publicKey, secretKey } = data;
        setWallets((prevWallets) => [...prevWallets, { publicKey, secretKey }]);
        setItem("wallets", JSON.stringify(wallets));
      });
    }

    if (type === "ethereum" && recoveryPhrase) {
      generateKeypairFromMnemonicEth(
        recoveryPhrase.join(" "),
        wallets.length
      ).then((data) => {
        const { publicKey, secretKey } = data;
        setWallets((prevWallets) => [...prevWallets, { publicKey, secretKey }]);
        setItem("wallets", JSON.stringify(wallets));
      });
    }
  }, [recoveryPhrase, wallets.length]);

  const handleClearWallet = useCallback(() => {
    removeItem("mnemonic");
    setRecoveryPhrase(null);
    setWallet(null);
  }, [setRecoveryPhrase, setWallet]);

  return (
    <>
      <BlurFade delay={0.2}>
        <Accordion
          type="single"
          collapsible
          className="w-full border-2 p-4 rounded-xl px-6"
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger>Your Secret Phrase</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-3 transition-all duration-75">
                {mnemonic.map((phrase, index) => (
                  <motion.div
                    whileHover={{ backgroundColor: "#1F1F1F" }}
                    key={index}
                    transition={{ duration: 0.2 }}
                    className="bg-neutral-900 hover:bg-neutral-700 p-4 rounded-lg transition-all duration-75 "
                  >
                    <p className="text-sm">{phrase}</p>
                  </motion.div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex justify-between items-center p-4 rounded-lg">
          <p className="capitalize">{type} Wallet</p>
          <div className="flex gap-4">
            <Button onClick={handleAddWallet}>Add wallet</Button>
            <Button variant="destructive" onClick={handleClearWallet}>
              Clear wallet
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 rounded-lg">
          <WalletsItem wallets={wallets} setWallets={setWallets} />
        </div>
      </BlurFade>
    </>
  );
}

interface WalletsItemProps {
  wallets: Wallet[];
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}

const WalletsItem = ({ wallets, setWallets }: WalletsItemProps) => {
  const [isSecretKeyVisible, setIsSecretKeyVisible] = useState(false);

  const handleReveal = useCallback((e: any) => {
    e.preventDefault();
    setIsSecretKeyVisible((prev) => !prev);
  }, []);

  const handleRemoveWallet = useCallback(
    (index: number) => {
      setWallets((prevWallets) => prevWallets.filter((_, i) => i !== index));
    },
    [setWallets]
  );

  return (
    <>
      {wallets.map((wallet, index) => (
        <BlurFade delay={index * 0.1 + 0.2} className="space-y-4">
          <div key={index} className="border rounded-xl ">
            <div className="flex justify-between items-center p-4 rounded-t-lg">
              <p className="p-4">Wallet {index}</p>
              <Button
                variant="ghost"
                className="text-red-800 hover:text-red-600"
                size="icon"
                onClick={() => handleRemoveWallet(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 space-y-7">
              <div className="space-y-2">
                <p className="text-lg">Public Key:</p>
                <p
                  className="text-sm cursor-pointer transition-opacity opacity-75 hover:opacity-100 duration-300 truncate"
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.publicKey);
                    toast.success("Copied to clipboard");
                  }}
                >
                  {wallet.publicKey}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-lg">Secret Key:</p>
                <div className="flex items-center gap-2 justify-between">
                  <p
                    className="truncate cursor-pointer transition-opacity opacity-75 hover:opacity-100 duration-300"
                    onClick={() => {
                      navigator.clipboard.writeText(wallet.secretKey);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    {isSecretKeyVisible
                      ? wallet.secretKey
                      : "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • "}
                  </p>
                  <Button variant="ghost" onClick={handleReveal}>
                    <Eye />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      ))}
    </>
  );
};

export default Wallets;
