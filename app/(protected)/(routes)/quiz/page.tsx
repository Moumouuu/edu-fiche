import { Metadata } from "next";

import QuizPage from "@/components/pages/QuizPage";
import { checkSubscription } from "@/lib/subscription";

export const metadata: Metadata = {
  title: "EduFiche | Quiz",
  description:
    "Générer des Quiz en un clic ! Vos devoirs seront un jeu d'enfant !",
};

export default async function Home() {
  const isSubscribed = await checkSubscription();
  return (
    <div className="w-full">
      <QuizPage isSubscribed={isSubscribed} />
    </div>
  );
}
