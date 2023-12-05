"use client";
import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_TRIAL, cn, itemsMenu } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PremiumModal } from "./premium-modal";
import { UserProfile } from "./user-profile";

export default function NavbarDesk({
  userLimit,
  isPro,
}: {
  userLimit: number | undefined;
  isPro: boolean;
}) {
  const path = usePathname();
  const { open } = usePremiumModal();

  return (
    <div className="w-[300px] border-r h-screen p-4">
      <div className="mb-8">
        <div className="flex ">
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
          </div>
        </div>
      </div>
      <div className="h-[90%] flex flex-col justify-between">
        <div className="flex flex-col">
          {itemsMenu.map((item) =>
            item.premium && !isPro ? (
              <div
                key={item.name}
                className="my-3 cursor-pointer"
                onClick={open}
              >
                <div
                  className={cn(
                    "flex items-center w-full hover:bg-primary/10 p-3 rounded",
                    item.href === path && "bg-primary/10"
                  )}
                >
                  {/* @ts-ignore */}
                  <lord-icon
                    src={item.icon}
                    trigger="hover"
                    colors={"primary:#fff"}
                  />
                  <span className="ml-2"> {item.name}</span>
                </div>
              </div>
            ) : (
              <Link href={item.href} key={item.name} className="my-3">
                <div
                  className={cn(
                    "flex items-center w-full hover:bg-primary/10 p-3 rounded-lg",
                    item.href === path && "bg-primary/10"
                  )}
                >
                  {/* @ts-ignore */}
                  <lord-icon
                    src={item.icon}
                    trigger="hover"
                    colors={"primary:#fff"}
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
              <span>
                {userLimit ?? 0}/{MAX_FREE_TRIAL} générations gratuites
              </span>
              <Progress
                value={userLimit ? userLimit * 20 : 0}
                className="border"
              />
            </div>
          )}
          <PremiumModal isPro={isPro} />
          <div className="flex w-full justify-between items-center mt-2">
            <UserProfile />
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
