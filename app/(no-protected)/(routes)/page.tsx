import BannerHomepage from "@/components/banner-homepage";
import { Bento } from "@/components/bento";
import Footer from "@/components/footer";
import NavHomepage from "@/components/nav-homepage";
import Reviews from "@/components/reviews";
import Stats from "@/components/stats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduFiche | Générateur de Fiche de révision",
  description:
    "Edufiche est un générateur de fiche de révision en ligne. Il permet de générer des fiches de révision en quelques clics.",
};

export default async function Home() {
  return (
    <div className="w-full">
      <NavHomepage />
      <BannerHomepage />
      <Reviews />
      <Bento />
      <Stats />
      <Footer />
    </div>
  );
}
