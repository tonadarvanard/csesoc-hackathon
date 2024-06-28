import { db } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const existingEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingEmail) {
      return NextResponse.json({ error: "Email is taken" }, { status: 400 });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        progressIds: []
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
