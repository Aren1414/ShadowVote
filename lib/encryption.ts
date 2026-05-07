/**
 * Encryption Abstraction Layer
 *
 * IMPORTANT:
 * This is NOT real Arcium encryption yet.
 * This is a placeholder layer that will later
 * be replaced with official Arcium SDK integration.
 */

export type VotePayload = {
  pollId: string;
  wallet: string;
  option: string;
};

/**
 * Encrypt vote payload
 * (Temporary encoding — NOT real encryption)
 */
export function encryptVote(payload: VotePayload): string {
  const json = JSON.stringify(payload);
  return Buffer.from(json).toString("base64");
}

/**
 * Decrypt vote payload
 */
export function decryptVote(
  encrypted: string
): VotePayload {
  const decoded = Buffer.from(
    encrypted,
    "base64"
  ).toString("utf-8");

  return JSON.parse(decoded);
}
