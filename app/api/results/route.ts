import { NextResponse } from "next/server";
import { polls } from "@/lib/polls";
import {
  confidentialTally,
  getTotalVotes,
} from "@/lib/confidentialEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pollId } = body;

    // ✅ Validate input
    if (!pollId) {
      return NextResponse.json(
        { message: "Poll ID is required." },
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

    // ✅ Ensure poll is closed before revealing results
    const now = new Date();
    const endDate = new Date(poll.endDate);

    if (now <= endDate) {
      return NextResponse.json(
        { message: "Poll is still active." },
        { status: 400 }
      );
    }

    // ✅ Confidential tally
    const results = confidentialTally(pollId);
    const total = getTotalVotes(pollId);

    return NextResponse.json({
      results,
      total,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}
