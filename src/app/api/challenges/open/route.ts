import { NextRequest, NextResponse } from "next/server";
import { ChallengeService } from "@/lib/services/challenge.service";
import { getToken } from "next-auth/jwt";

const challengeService = new ChallengeService();

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const challenges = await challengeService.getOpenChallenges();
    return NextResponse.json({ challenges }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
