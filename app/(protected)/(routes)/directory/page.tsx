import DirectoryPage from "@/components/pages/DirectoryPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EduFiche | Annuaire du Web",
  description:
    "Annuaire du Web de l'application EduFiche permettant de trouver des fiches de révision parmi les fiches de révision du monde entier.",
};

export default async function Page() {
  return <DirectoryPage />;
}
