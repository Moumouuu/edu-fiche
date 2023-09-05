import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new NextResponse("Missing email or password", { status: 400 });
  }

  const newUserApiLimit = await prismadb.userApiLimit.create({
    data: {
      userEmail: email,
      userPassword: bcrypt.hashSync(password, 10),
    },
  });

  if (!newUserApiLimit) {
    return new NextResponse("Error creating user", { status: 500 });
  }

  return new NextResponse("User created", {
    status: 200,
  });
}