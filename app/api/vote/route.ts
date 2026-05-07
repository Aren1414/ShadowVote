import { NextResponse } from "next/server";
import { submitVote } from "@/lib/voteStore";
import { polls } from "@/lib/polls";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pollId, wallet, option } = body;

    
    if (!pollId || !wallet || !option) {
      return NextResponse.json(
        { message: "Invalid request data." },
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

    if (now > endDate) {
      return NextResponse.json(
        { message: "This poll is closed." },
        { status: 400 }
      );
    }

    const result = submitVote(pollId, wallet, option);

    return NextResponse.json({
      message: result.message,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}
