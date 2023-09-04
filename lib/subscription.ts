
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
const DAY_IN_MS = 86_400_000;


export const checkSubscription = async () => {
  const data = await getServerSession();
  const userEmail = data?.user?.email

  if (!userEmail) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
        userEmail: userEmail,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid;
};