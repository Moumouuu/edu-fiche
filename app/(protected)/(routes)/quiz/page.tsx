import { Metadata } from "next";

import QuizPage from "@/components/pages/QuizPage";
import { checkSubscription } from "@/lib/subscription";

export const metadata: Metadata = {
  title: "EduFiche | Quiz",
  description: "Page de génération de Quiz de l'application EduFiche",
};

export default async function Home() {
  const isSubscribed = await checkSubscription();
  return (
    <div className="w-full">
      <QuizPage isSubscribed={isSubscribed} />
    </div>
  );
}
