import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new NextResponse("Missing email or password", { status: 400 });
  }

  const userAlreadyExist = await prismadb.userApiLimit.findUnique({
    where: {
      userEmail: email,
    },
  });

  if (userAlreadyExist) {
    return NextResponse.json({
      error: "User already exist",
    });
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

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return new NextResponse("Missing id", { status: 400 });
  }

  const user = await prismadb.userApiLimit.findUnique({
    where: {
      userEmail: String(email),
    },
  });
  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(user));
}
