import { Metadata } from "next";

import SettingsPage from "@/components/pages/SettingsPage";
import { checkSubscription } from "@/lib/subscription";

export const metadata: Metadata = {
  title: "EduFiche | Paramètres",
  description: "Page de paramètres de l'application EduFiche",
};

export default async function Settings() {
  return <SettingsPage />;
}
