import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/lib/services/user.service";
import { userSchema } from "@/validations/schema.validation";
import { getToken } from "next-auth/jwt";
import { hashPassword } from "@/lib/utils/password";

const userService = new UserService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }

    // Hash password before creating user
    body.password = await hashPassword(body.password);

    const user = await userService.createUser(body);

    // Set cookie for email verification
    const response = NextResponse.json(
      {
        message: "User created. Please check your email for verification.",
        user,
      },
      { status: 201 }
    );

    response.cookies.set("userEmail", user.email, {
      maxAge: 3600,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await userService.getAllUsers();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
