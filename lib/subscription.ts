import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export const checkSubscription = async () => {
  const data = await getServerSession();
  const userEmail = data?.user?.email;

  if (!userEmail) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userEmail: userEmail,
    },
  });

  if (!userSubscription) {
    return false;
  }

  return !!userSubscription;
};
