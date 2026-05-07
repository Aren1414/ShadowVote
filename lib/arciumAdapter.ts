/**
 * Arcium Adapter Interface
 *
 * This file defines how ShadowVote will interact
 * with Arcium confidential compute infrastructure.
 *
 * Actual implementation will follow official Arcium docs.
 */

export type ArciumVoteInput = {
  pollId: string;
  wallet: string;
  option: string;
};

export interface ArciumAdapter {
  submitEncryptedVote(
    vote: ArciumVoteInput
  ): Promise<void>;

  tallyPoll(
    pollId: string
  ): Promise<{
    results: Record<string, number>;
    proof?: string;
  }>;
}

/**
 * Temporary mock adapter.
 * Replace with official Arcium integration.
 */
export class MockArciumAdapter
  implements ArciumAdapter
{
  async submitEncryptedVote(): Promise<void> {
    // TODO: Replace with Arcium cluster submission
    return;
  }

  async tallyPoll(): Promise<{
    results: Record<string, number>;
    proof?: string;
  }> {
    // TODO: Replace with Arcium confidential tally
    return { results: {}, proof: undefined };
  }
}
