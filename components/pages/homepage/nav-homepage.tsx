import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "../../mode-toggle";
import { Button } from "../../ui/button";
import { NavHomepageMobile } from "./nav-homapage-mobile";

export default function NavHomepage() {
  return (
    <>
      <NavHomepageMobile />
      <nav className="hidden lg:flex items-center p-5 justify-between sticky top-0 backdrop-blur z-50">
        <div className="flex items-center">
          <Image
            src="/assets/images/edu-fiche-logo.png"
            alt="EduFiche"
            width={50}
            height={50}
          />
          <h1 className="hidden md:block text-xl md:text-2xl ml-2">
            Edu
            <span className="font-semibold text-2xl md:text-3xl text-transparent bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text">
              Fiche
            </span>
          </h1>
          <div className="flex ml-2">
            <Link
              href={"#pricing"}
              className="mx-2 text-lg text-muted-foreground hover:text-white/90 anim transition duration-200 ease-out"
            >
              Prix
            </Link>
            <Link
              href={"#pricing"}
              className="mx-2 text-lg text-muted-foreground hover:text-white/90 anim transition duration-200 ease-out"
            >
              FAQ
            </Link>
            <Link
              href={"https://edufiche.featurebase.app/"}
              className="mx-2 text-lg text-muted-foreground hover:text-white/90 anim transition duration-200 ease-out"
            >
              Feedback
            </Link>
            <Link
              href={"https://edufiche.featurebase.app/roadmap"}
              className="mx-2 text-lg text-muted-foreground hover:text-white/90 anim transition duration-200 ease-out"
            >
              Roadmap
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <Link href="/app">
            <Button variant={"premium"} className="mr-3">
              Essaie gratuit
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
