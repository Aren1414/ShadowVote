/**
 * Confidential Voting Engine
 *
 * This layer handles:
 * - Encrypted vote storage
 * - Duplicate vote prevention
 * - Confidential tally
 *
 * NOTE:
 * This currently uses a mock encryption layer.
 * It is designed to be replaced with official Arcium integration.
 */

import {
  encryptVote,
  decryptVote,
  VotePayload,
} from "./encryption";

type EncryptedVote = {
  pollId: string;
  encryptedData: string;
};

// In-memory encrypted shared state
const encryptedState: EncryptedVote[] = [];

/**
 * Store encrypted vote
 */
export function storeEncryptedVote(
  payload: VotePayload
) {
  const encrypted = encryptVote(payload);

  encryptedState.push({
    pollId: payload.pollId,
    encryptedData: encrypted,
  });

  return encrypted;
}

/**
 * Check if wallet has already voted
 */
export function hasVoted(
  pollId: string,
  wallet: string
): boolean {
  return encryptedState.some((record) => {
    const decrypted = decryptVote(record.encryptedData);

    return (
      decrypted.pollId === pollId &&
      decrypted.wallet === wallet
    );
  });
}

/**
 * Confidential tally computation
 */
export function confidentialTally(
  pollId: string
) {
  const pollVotes = encryptedState.filter(
    (v) => v.pollId === pollId
  );

  const counts: Record<string, number> = {};

  pollVotes.forEach((record) => {
    const decrypted = decryptVote(
      record.encryptedData
    );

    counts[decrypted.option] =
      (counts[decrypted.option] || 0) + 1;
  });

  return counts;
}

/**
 * Total vote count
 */
export function getTotalVotes(
  pollId: string
) {
  return encryptedState.filter(
    (v) => v.pollId === pollId
  ).length;
}
