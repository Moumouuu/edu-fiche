import { apiUserLimit } from "@/actions/apiUserLimit";
import SheetPage from "@/components/pages/SheetGenerationPage";
import { checkSubscription } from "@/lib/subscription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduFiche | Fiche de révision",
  description:
    "Page de génération de fiche de révision de l'application EduFiche",
};

export default async function Home() {
  const userLimit = await apiUserLimit();
  const isSubscribed = await checkSubscription();

  return (
    <div className="w-full">
      <SheetPage userLimit={userLimit} isSubscribed={isSubscribed} />
    </div>
  );
}
