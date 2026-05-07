import { NextResponse } from "next/server";
import { getResults, getTotalVotes } from "@/lib/voteStore";
import { polls } from "@/lib/polls";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pollId } = body;

    if (!pollId) {
      return NextResponse.json(
        { message: "Poll ID is required." },
        { status: 400 }
      );
    }

    
    const poll = polls.find((p) => p.id === pollId);

    if (!poll) {
      return NextResponse.json(
        { message: "Poll not found." },
        { status: 404 }
      );
    }

    
    const now = new Date();
    const endDate = new Date(poll.endDate);

    if (now <= endDate) {
      return NextResponse.json(
        { message: "Poll is still active." },
        { status: 400 }
      );
    }

    const results = getResults(pollId);
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
