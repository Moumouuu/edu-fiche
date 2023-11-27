"use client";

import RetroGrid from "@/components/magicui/retro-grid";
import { LuPartyPopper } from "react-icons/lu";
import { Badge } from "./ui/badge";

const BannerHomepage = () => {
  return (
    <div className="relative flex flex-col h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background p-36 shadow-2xl">
      <Badge variant="outline" className="mb-5 flex items-center p-3 whitespace-nowrap">
        <LuPartyPopper size={30} />
        <span className="text-sm lg:text-lg ml-3">
          Créez des fiches{" "}
          <span className="bg-gradient-to-b from-green-400 to-blue-600 bg-clip-text text-transparent text-md lg:text-xl uppercase">
            illimitées
          </span>{" "}
          gratuitement !
        </span>
      </Badge>
      <h1 className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b  from-green-400 to-blue-600 bg-clip-text text-center text-5xl lg:text-6xl font-bold leading-none tracking-tighter text-transparent">
        Boostez vos révisions avec des fiches intelligentes. Créez, partagez,
        réussissez !
      </h1>

      <RetroGrid />
    </div>
  );
};

export default BannerHomepage;
