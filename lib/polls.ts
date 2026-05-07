export type PollCategory = "crypto" | "farcaster" | "governance";

export type PollOption = {
  id: string;
  label: string;
};

export type Poll = {
  id: string;
  title: string;
  description: string;
  category: PollCategory;
  options: PollOption[];
  startDate: string;
  endDate: string;
};

export const polls: Poll[] = [
  {
    id: "crypto-1",
    title: "Will SOL outperform ETH this week?",
    description: "Private crypto sentiment vote powered by ShadowVote.",
    category: "crypto",
    startDate: "2026-05-01T00:00:00Z",
    endDate: "2026-05-20T00:00:00Z",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
  {
    id: "fc-1",
    title: "Best Mini App category this month?",
    description: "Vote privately for your favorite Farcaster ecosystem category.",
    category: "farcaster",
    startDate: "2026-05-01T00:00:00Z",
    endDate: "2026-05-25T00:00:00Z",
    options: [
      { id: "snap", label: "Snaps" },
      { id: "games", label: "Games" },
      { id: "ai", label: "AI Tools" },
    ],
  },
  {
    id: "gov-1",
    title: "Should DAOs adopt private voting by default?",
    description: "Governance privacy poll for Web3 communities.",
    category: "governance",
    startDate: "2026-05-01T00:00:00Z",
    endDate: "2026-05-30T00:00:00Z",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
];
