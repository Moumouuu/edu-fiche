import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { MAX_FREE_TRIAL } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

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

  if (userApiLimit?.count === MAX_FREE_TRIAL && !isSubscribed)
    return Error("UserApiLimit reached");

  const userApiLimitUpdated = await prismadb.userApiLimit.update({
    where: {
      id: userApiLimit.id,
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });

  return true;
}
