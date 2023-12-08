import PremiumButton from "@/components/premium-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { checkSubscription } from "@/lib/subscription";
import Image from "next/image";
import Link from "next/link";
import { CgMenuGridO } from "react-icons/cg";
import { LuPartyPopper } from "react-icons/lu";

export async function NavHomepageMobile() {
  const isSubscribed = await checkSubscription();
  return (
    <Sheet>
      <SheetTrigger asChild className="block lg:hidden">
        <div className="z-50 p-4 fixed top-2 left-2">
          <CgMenuGridO size={20} />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center">
              <Image
                src="/assets/images/edu-fiche-logo.png"
                alt="EduFiche"
                width={50}
                height={50}
              />
              <h1 className="text-xl md:text-2xl ml-2">
                Edu
                <span className="font-semibold text-2xl md:text-3xl text-transparent bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text">
                  Fiche
                </span>
              </h1>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col my-8">
          <SheetClose asChild>
            <Link
              href={"#pricing"}
              className="m-2 text-2xl text-muted-foreground hover:text-white/90 anim transition duration-200 ease-out"
            >
              Prix
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"#pricing"}
              className="m-2 text-2xl text-muted-foreground hover:text-white/90 anim transition duration-200 ease-out"
            >
              FAQ
            </Link>
          </SheetClose>
          <Link
            href={"https://edufiche.featurebase.app/"}
            className="m-2 text-2xl text-muted-foreground hover:text-white/90 anim transition duration-200 ease-out"
          >
            Feedback
          </Link>
          <Link
            href={"https://edufiche.featurebase.app/roadmap"}
            className="m-2 text-2xl text-muted-foreground hover:text-white/90 anim transition duration-200 ease-out"
          >
            Roadmap
          </Link>
        </div>
        <SheetFooter className="flex flex-col">
          <Link href={"/app"}>
            <Button className="m-1 w-full" variant={"default"}>
              Essaie gratuit
            </Button>
          </Link>
          <PremiumButton className="m-1 w-full">
            <LuPartyPopper size={25} />
            <span className="ml-2">
              {isSubscribed ? "Vous êtes Premium" : "Passer premium"}
            </span>
          </PremiumButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
