import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const apiUserLimit = 3;

export async function getApiUserLimit() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    // User not logged in
    return new Error("User not logged in");
  }

  const UserApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      id: userId,
    },
  });

  if (!UserApiLimit) {
    // Create a new UserApiLimit
    const newUserApiLimit = await prismadb.userApiLimit.create({
      data: {
        userId: userId,
        count: 0,
      },
    });
    return newUserApiLimit.count;
  }

  return UserApiLimit.count;
}

export async function incrementApiUserLimit() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    // User not logged in
    return new Error("User not logged in");
  }

  let UserApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      id: userId,
    },
  });

  if (!UserApiLimit) {
    // Create a new UserApiLimit
    const newUserApiLimit = await prismadb.userApiLimit.create({
      data: {
        userId: userId,
        count: 0,
      },
    });
    UserApiLimit = newUserApiLimit;
  }

  const updatedUserApiLimit = await prismadb.userApiLimit.update({
    where: {
      userId: userId,
    },
    data: {
      count: UserApiLimit.count + 1,
    },
  });

  return updatedUserApiLimit;
}
