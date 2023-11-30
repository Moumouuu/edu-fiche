import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_TRIAL } from "@/lib/utils";
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
    return newUserApiLimit?.count;
  }

  return userApiLimit?.count;
}

export async function apiUserLimitIncrement() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return ;

  const userEmail = session?.user?.email;

  const userApiLimit = await prismadb.userApiLimit.findFirst({
    where: {
      userEmail: userEmail,
    },
  });

  if (!userApiLimit) return;

  if (userApiLimit?.count === MAX_FREE_TRIAL) return Error("UserApiLimit reached");

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

  return userApiLimitUpdated?.count;
}
