"use client";
import Navabr from "@/components/Navabr";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Wallet from "@/components/Wallet";
import { createContext } from "react";
import { Toaster } from "@/components/ui/sonner"



export const userContext = createContext<any>(null);
export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  
  const handleEthereum = () => {
    setWallet("ethereum");
   
  };

  const handleSolana = () => {
    setWallet("solana");
    
  };

  


  return (
    <>
    <Toaster />
      <Navabr />
      <userContext.Provider value={{wallet,setWallet}}>

      <main className="flex min-h-screen flex-col items-center justify-between ">
        {wallet === null ? (
          <motion.section
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 50 }}
          transition={{ duration: 0.3 }}
          className="w-3/4 p-4 py-10"
          >
            <div className="flex flex-col ">
              <p className="text-4xl font-bold">
                Posh supports multiple blockchains
              </p>
              <p className="text-lg">Choose a blockchain to get started.</p>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4">
              <Button onClick={handleEthereum}>Ethereum</Button>
              <Button onClick={handleSolana}>Solana</Button>
            </div>
          </motion.section>
        ) : (
          ""
        )}
       
           <section
          className="w-3/4 p-4 py-10 "
          >
            {wallet === "ethereum" ? <Wallet type="ethereum" /> : ""}
            {wallet === "solana" ? <Wallet type="solana" /> : ""}
          </section> 
       
      </main>
            </userContext.Provider>
    </>
  );
}
