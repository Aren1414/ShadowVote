"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { polls } from "@/lib/polls";

function getStatus(endDate: string) {
  const now = new Date();
  const end = new Date(endDate);
  return now > end ? "Closed" : "Active";
}

export default function Home() {
  const { publicKey } = useWallet();
  const [message, setMessage] = useState("");

  const vote = async (pollId: string, option: string) => {
    if (!publicKey) {
      setMessage("Connect wallet first.");
      return;
    }

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pollId,
        wallet: publicKey.toBase58(),
        option,
      }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">
        ShadowVote 🔐
      </h1>

      <div className="flex justify-center mb-10">
        <WalletMultiButton />
      </div>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {polls.map((poll) => {
          const status = getStatus(poll.endDate);

          return (
            <div
              key={poll.id}
              className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">
                  {poll.title}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    status === "Active"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                {poll.description}
              </p>

              <div className="flex gap-3 flex-wrap">
                {poll.options.map((opt) => (
                  <button
                    key={opt.id}
                    disabled={status === "Closed"}
                    onClick={() => vote(poll.id, opt.id)}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {message && (
        <p className="text-center mt-8 text-lg">{message}</p>
      )}
    </div>
  );
}
