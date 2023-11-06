"use client";
import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PremiumButton } from "./premium-button";
import { UserProfile } from "./user-profile";
import { MAX_FREE_TRIAL } from "@/lib/utils";

export default function NavbarDesk({
  userLimit,
  isPro,
}: {
  userLimit: number | undefined;
  isPro: boolean;
}) {
  // TODO : icon color change in function of theme
  const path = usePathname();
  const { open, isOpen } = usePremiumModal();

  const itemsMenu = [
    {
      name: "Fiche de révision",
      href: "/app",
      icon: "https://cdn.lordicon.com/isugonwi.json",
      premium: false,
      isActive: "/" === path,
    },
    {
      name: "Générateur d'exercices",
      href: "/exercices",
      icon: "https://cdn.lordicon.com/kipaqhoz.json",
      premium: true,
      isActive: "/exercices" === path,
    },
    {
      name: "Mes fiches",
      href: "/sheets",
      icon: "https://cdn.lordicon.com/hpivxauj.json",
      premium: false,
      isActive: "/sheets" === path,
    },
  ];
  return (
    <div className="w-[300px] border-r h-[100vh] p-4">
      <div className="mb-8">
        <div className="flex ">
          <span className="text-3xl flex items-center">
            <Image
              src="/assets/images/edu-fiche-logo.png"
              width={65}
              height={65}
              alt="Logo edu-fiche"
              className="mr-3"
            />
            EduFiche
          </span>
        </div>
      </div>
      <div className="h-[90%] flex flex-col justify-between">
        <div className="flex flex-col">
          {itemsMenu.map((item) =>
            item.premium && !isPro ? (
              <div
                key={item.name}
                className="my- cursor-pointer"
                onClick={open}
              >
                <div
                  className={cn(
                    "flex items-center w-full hover:bg-primary/10 p-1 py-3 rounded",
                    item.isActive && "bg-primary/10"
                  )}
                >
                  {/* @ts-ignore */}
                  <lord-icon
                    src={item.icon}
                    trigger="hover"
                    colors="primary:#fff"
                  />
                  <span className="ml-2"> {item.name}</span>
                </div>
              </div>
            ) : (
              <Link href={item.href} key={item.name} className="my-3">
                <div
                  className={cn(
                    "flex items-center w-full hover:bg-primary/10 p-1 py-3 rounded",
                    item.isActive && "bg-primary/10"
                  )}
                >
                  {/* @ts-ignore */}
                  <lord-icon
                    src={item.icon}
                    trigger="hover"
                    colors="primary:#fff"
                  />
                  <span className="ml-2"> {item.name}</span>
                </div>
              </Link>
            )
          )}
        </div>
        <div className="flex flex-col">
          {!isPro && (
            <div className="flex flex-col my-3">
              <span>{userLimit ?? 0}/{MAX_FREE_TRIAL} free generation</span>
              <Progress
                value={userLimit ? userLimit * 10 : 0}
                className="border"
              />
            </div>
          )}
          <PremiumButton isPro={isPro} />
          <div className="flex w-full justify-between items-center">
            <UserProfile />
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
