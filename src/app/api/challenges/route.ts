import { NextRequest, NextResponse } from "next/server";
import { ChallengeService } from "@/lib/services/challenge.service";
import { challengeValidationSchema } from "@/validations/schema.validation";
import { getToken } from "next-auth/jwt";

const challengeService = new ChallengeService();

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = challengeValidationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }

    const challenge = await challengeService.createChallenge(body);

    if (!challenge) {
      return NextResponse.json(
        { error: "Failed to create challenge" },
        { status: 500 }
      );
    }

    return NextResponse.json({ challenge }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const challenges = await challengeService.getAllChallenges();
    return NextResponse.json({ challenges }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
