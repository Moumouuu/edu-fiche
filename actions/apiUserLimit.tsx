import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export async function apiUserLimit() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  if (!session?.user?.email) return;

  const userEmail = session.user.email;

  const userApiLimit = await prismadb.userApiLimit.findFirst({
    where: {
      userEmail: userEmail,
    },
  });

  // account create with google auth => need to create userApiLimit
  if (!userApiLimit) {
    const newUserApiLimit = await prismadb.userApiLimit.create({
      data: {
        userEmail: userEmail,
      },
    });
    return newUserApiLimit?.sheetGenerated;
  }

  return userApiLimit?.sheetGenerated;
}

export async function apiUserLimitQuiz() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  if (!session?.user?.email) return;

  const userEmail = session.user.email;

  const userApiLimit = await prismadb.userApiLimit.findFirst({
    where: {
      userEmail: userEmail,
    },
  });

  // account create with google auth => need to create userApiLimit
  if (!userApiLimit) {
    const newUserApiLimit = await prismadb.userApiLimit.create({
      data: {
        userEmail: userEmail,
      },
    });
    return newUserApiLimit?.quizGenerated;
  }

  return userApiLimit?.quizGenerated;
}
