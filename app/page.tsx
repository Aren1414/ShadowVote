"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";

export default function Home() {
  const { publicKey } = useWallet();
  const [message, setMessage] = useState("");

  const vote = async (choice: string) => {
    if (!publicKey) {
      setMessage("Please connect your wallet first.");
      return;
    }

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet: publicKey.toBase58(),
        vote: choice,
      }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">
        ShadowVote 🔐
      </h1>

      <WalletMultiButton />

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          Is Solana bullish this week?
        </h2>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => vote("YES")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            YES
          </button>

          <button
            onClick={() => vote("NO")}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            NO
          </button>
        </div>

        {message && (
          <p className="mt-6 text-lg text-black dark:text-white">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
