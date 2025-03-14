import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/lib/services/user.service";

const userService = new UserService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email } = body;

    const user = await userService.resendVerification(email);

    const response = NextResponse.json(
      {
        message: "Email sent. Please check your email for verification.",
        user,
      },
      { status: 201 }
    );

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
