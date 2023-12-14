"use client";

import { useEffect, useState } from "react";

import { usePremiumModal } from "@/app/hooks/use-premium-modal";

import { premiumLabels } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiCircleCheck } from "react-icons/ci";
import PremiumButton from "../../premium-button";
import { Separator } from "../../ui/separator";

export function PremiumModal({ isPro }: { isPro: boolean }) {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, open } = usePremiumModal();

  useEffect(() => {
    setIsMounted(true);
  }, [isOpen]);

  if (!isMounted) return null;

  if (isPro) {
    return (
      <Button variant="premium" disabled>
        Vous êtes Premium !
      </Button>
    );
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={open} variant="premium">
          Passer Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <span className="mr-4 text-xl md:text-3xl">
              Passer{" "}
              <span className="py-1 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase">
                Premium
              </span>
            </span>
            {/* @ts-ignore */}
            <lord-icon
              src="https://cdn.lordicon.com/tyvtvbcy.json"
              trigger="loop"
              delay="2000"
              colors="primary:#fff"
              style={{ width: "50px", height: "50px" }}
            />
          </DialogTitle>
          <DialogDescription className="text-center">
            C&apos;est le prix d&apos;un menu au McDo, mais vous soutenez un
            étudiant qui a besoin de vous ! Le paiement est unique et vous avez
            un <span className="underline">accès à vie</span> .
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col">
          {premiumLabels.map((label, i) => (
            <div key={i} className="flex items-center my-2">
              <div>
                <CiCircleCheck color="green" size="30" />
              </div>
              <span className="ml-2 text-left">{label}</span>
            </div>
          ))}
        </div>

        <DialogFooter>
          <PremiumButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
