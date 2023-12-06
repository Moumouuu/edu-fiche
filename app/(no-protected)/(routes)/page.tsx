import { Metadata } from "next";

import HeroBanner from "@/components/pages/homepage/hero-banner";
import { Bento } from "@/components/pages/homepage/bento";
import { Cards } from "@/components/pages/homepage/cards";
import { Faq } from "@/components/pages/homepage/faq";
import Footer from "@/components/pages/homepage/footer";
import NavHomepage from "@/components/pages/homepage/nav-homepage";
import Reviews from "@/components/pages/homepage/reviews";
import Stats from "@/components/pages/homepage/stats";

export const metadata: Metadata = {
  title: "EduFiche | Générateur de Fiche de révision",
  description:
    "Edufiche est un générateur de fiche de révision en ligne. Il permet de générer des fiches de révision en quelques clics.",
};

export default async function Home() {
  return (
    <div className="w-full">
      <NavHomepage />
      <HeroBanner />
      <Reviews />
      <Bento />
      <Cards />
      <Stats />
      <Faq />
      <Footer />
    </div>
  );
}
