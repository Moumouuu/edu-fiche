import { Metadata } from "next";

import SheetPage from "@/components/pages/SheetPage";
import { checkSubscription } from "@/lib/subscription";

export const metadata: Metadata = {
  title: "EduFiche | Fiche de révision",
  description:
    "Page de génération de fiche de révision de l'application EduFiche",
};

export default async function Home() {
  const isSubscribed = await checkSubscription();

  return (
    <div className="w-full">
      <SheetPage isSubscribed={isSubscribed} />
    </div>
  );
}
