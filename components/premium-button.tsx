"use client";
import { usePremiumModal } from "@/app/hooks/use-premium-modal";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

export function PremiumButton({ isPro }: { isPro: boolean }) {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, open, close } = usePremiumModal();

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, [isOpen]);

  if (!isMounted) return null;

  if (isPro) {
    return (
      <Button variant="premium" disabled>
        You have a premium account
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
              <span className="font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
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
            Vous souhaitez passer Premium ? C&apos;est par ici ! Vous
            béneficirez d&apos;un accès illimité à toutes les fonctionnalités.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <ul>
              <li className="flex items-center mb-3 ">
                <span className="mr-2">
                  {/* @ts-ignore */}
                  <lord-icon
                    src="https://cdn.lordicon.com/hiqmdfkt.json"
                    trigger="loop"
                    delay="2000"
                    colors="primary:#4ade80,secondary:#2563eb"
                    style={{ width: "50px", height: "50px" }}
                  />
                </span>{" "}
                Accès illimité à
                <span className="ml-2 font-bold text-transparent text-md md:text-xl uppercase bg-clip-text bg-gradient-to-l from-green-400 to-blue-600">
                  toutes les fonctionnalités
                </span>
              </li>
              <li className="flex items-center mb-3">
                <span className="mr-2 text-2xl">
                  {/* @ts-ignore */}
                  <lord-icon
                    src="https://cdn.lordicon.com/hursldrn.json"
                    trigger="loop"
                    colors="primary:#4ade80,secondary:#2563eb"
                    state="loop"
                    style={{ width: "50px", height: "50px" }}
                  />
                </span>{" "}
                Accès à des
                <span className="ml-2 font-bold text-transparent text-md md:text-xl uppercase bg-clip-text bg-gradient-to-l from-green-400 to-blue-600">
                  fonctionnalités exclusives
                </span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={loading}
            type="submit"
            variant={"premium"}
            onClick={onSubscribe}
          >
            Passer Premium
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
