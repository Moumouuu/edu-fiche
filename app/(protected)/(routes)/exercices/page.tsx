import { apiUserLimit } from "@/actions/apiUserLimit";
import ExercicesPage from "@/components/pages/ExercicesPage";
import { checkSubscription } from "@/lib/subscription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduFiche | Exercices",
  description: "Page de génération d'exercices de l'application EduFiche",
};

export default async function Home() {
  const userLimit = await apiUserLimit();
  const isSubscribed = await checkSubscription();
  return (
    <div className="w-full">
      <ExercicesPage userLimit={userLimit} isSubscribed={isSubscribed} />
    </div>
  );
}
