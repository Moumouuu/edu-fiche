import { Metadata } from "next";

import SettingsPage from "@/components/pages/SettingsPage";

export const metadata: Metadata = {
  title: "EduFiche | Paramètres",
  description: "Paramètre de votre compte EduFiche.",
};

export default async function Settings() {
  return <SettingsPage />;
}
