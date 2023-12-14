import { getServerSession } from "next-auth/next";
import { Rubik } from "next/font/google";
import { redirect } from "next/navigation";

import { apiUserLimit, apiUserLimitQuiz } from "@/actions/apiUserLimit";
import { checkSubscription } from "@/lib/subscription";

import Nav from "@/components/pages/app/nav";

const font = Rubik({ subsets: ["latin"] });

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLimitSheet = await apiUserLimit();
  const userLimitQuiz = await apiUserLimitQuiz();
  const userLimit = {
    userLimitQuiz,
    userLimitSheet,
  };

  const session = await getServerSession();
  const isPro = await checkSubscription();

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className={font.className + " flex"}>
      <Nav userLimit={userLimit} isPro={isPro} />
      {children}
    </main>
  );
}
