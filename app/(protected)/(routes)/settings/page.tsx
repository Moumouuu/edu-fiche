import SettingsPage from "@/components/pages/SettingsPage";
import { checkSubscription } from "@/lib/subscription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduFiche | Paramètres",
  description: "Page de paramètres de l'application EduFiche",
};

export default async function Settings() {
  const isSubscribed = await checkSubscription();
  return <SettingsPage isSubscribed={isSubscribed} />;
}
