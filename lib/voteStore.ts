type VoteRecord = {
  pollId: string;
  wallet: string;
  option: string;
  timestamp: string;
};

const votes: VoteRecord[] = [];

/**
 * Submit a vote (prevents duplicate votes per wallet per poll)
 */
export function submitVote(
  pollId: string,
  wallet: string,
  option: string
) {
  const existing = votes.find(
    (v) => v.pollId === pollId && v.wallet === wallet
  );

  if (existing) {
    return {
      success: false,
      message: "You have already voted in this poll.",
    };
  }

  votes.push({
    pollId,
    wallet,
    option,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message: "Vote submitted successfully 🔐",
  };
}

/**
 * Get results for a poll
 */
export function getResults(pollId: string) {
  const pollVotes = votes.filter((v) => v.pollId === pollId);

  const counts: Record<string, number> = {};

  pollVotes.forEach((v) => {
    counts[v.option] = (counts[v.option] || 0) + 1;
  });

  return counts;
}

/**
 * Get total votes for a poll
 */
export function getTotalVotes(pollId: string) {
  return votes.filter((v) => v.pollId === pollId).length;
}
