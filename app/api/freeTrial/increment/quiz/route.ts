import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { MAX_FREE_TRIAL_QUIZ } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const isSubscribed = await checkSubscription();

  if (!session?.user?.email) throw new Error("No user connected");

  const userEmail = session?.user?.email;

  const userApiLimit = await prismadb.userApiLimit.findFirst({
    where: {
      userEmail: userEmail,
    },
  });

  if (!userApiLimit) throw new Error("No user connected");

  if (userApiLimit.quizGenerated >= MAX_FREE_TRIAL_QUIZ && !isSubscribed)
    return Error("UserApiLimit reached");

  const userApiLimitUpdated = await prismadb.userApiLimit.update({
    where: {
      id: userApiLimit.id,
    },
    data: {
      quizGenerated: {
        increment: 1,
      },
    },
  });

  if (!userApiLimitUpdated) {
    throw new Error("[Free Trial] UserApiLimit not updated");
  }

  return NextResponse.json({ success: true });
}
