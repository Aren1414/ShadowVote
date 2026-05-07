import { NextResponse } from "next/server";
import { polls } from "@/lib/polls";
import {
  storeEncryptedVote,
  hasVoted,
} from "@/lib/confidentialEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pollId, wallet, option } = body;

    // ✅ Basic validation
    if (!pollId || !wallet || !option) {
      return NextResponse.json(
        { message: "Invalid request data." },
        { status: 400 }
      );
    }

    // ✅ Check if poll exists
    const poll = polls.find((p) => p.id === pollId);

    if (!poll) {
      return NextResponse.json(
        { message: "Poll not found." },
        { status: 404 }
      );
    }

    // ✅ Check if poll is still active
    const now = new Date();
    const endDate = new Date(poll.endDate);

    if (now > endDate) {
      return NextResponse.json(
        { message: "This poll is closed." },
        { status: 400 }
      );
    }

    // ✅ Prevent duplicate voting
    if (hasVoted(pollId, wallet)) {
      return NextResponse.json({
        message: "You have already voted.",
      });
    }

    // ✅ Store encrypted vote
    storeEncryptedVote({
      pollId,
      wallet,
      option,
    });

    return NextResponse.json({
      message: "Vote submitted confidentially 🔐",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}
