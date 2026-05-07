"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { polls } from "@/lib/polls";
import Countdown from "@/components/Countdown";

function getStatus(endDate: string) {
  const now = new Date();
  const end = new Date(endDate);
  return now > end ? "Closed" : "Active";
}

export default function Home() {
  const { publicKey } = useWallet();
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<Record<string, any>>({});

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

  const fetchResults = async (pollId: string) => {
    const res = await fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pollId }),
    });

    const data = await res.json();

    if (!data.results) {
      setMessage(data.message);
      return;
    }

    setResults((prev) => ({
      ...prev,
      [pollId]: data,
    }));
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
          const pollResult = results[poll.id];

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

              <p className="text-sm text-gray-500 mb-2">
                {poll.description}
              </p>

              {/* ✅ Countdown اضافه شده */}
              {status === "Active" && (
                <div className="mb-4">
                  <Countdown endDate={poll.endDate} />
                </div>
              )}

              {/* ✅ Active Poll Voting */}
              {status === "Active" && (
                <div className="flex gap-3 flex-wrap">
                  {poll.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => vote(poll.id, opt.id)}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* ✅ Closed Poll Results */}
              {status === "Closed" && (
                <div>
                  <button
                    onClick={() => fetchResults(poll.id)}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Reveal Results
                  </button>

                  {pollResult && (
                    <div>
                      {Object.entries(pollResult.results).map(
                        ([option, count]: any) => {
                          const percentage =
                            pollResult.total > 0
                              ? Math.round(
                                  (count / pollResult.total) * 100
                                )
                              : 0;

                          return (
                            <div key={option} className="mb-3">
                              <div className="flex justify-between text-sm">
                                <span>{option}</span>
                                <span>
                                  {count} votes ({percentage}%)
                                </span>
                              </div>

                              <div className="h-2 bg-gray-200 rounded mt-1">
                                <div
                                  className="h-2 bg-black rounded transition-all duration-500"
                                  style={{
                                    width: `${percentage}%`,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              )}
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
