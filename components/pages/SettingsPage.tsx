"use client";
import { PremiumModal } from "@/components/premium-modal";
import PremiumButton from "../premium-button";

export default function SettingsPage({
  isSubscribed,
}: {
  isSubscribed: boolean;
}) {
  return (
    <div className="md:p-4 px-4 py-14 flex flex-col">
      <h1 className="text-xl md:text-3xl ">Settings</h1>
      <span className="text-primary/70">Gère ton compte.</span>
      {isSubscribed ? (
        <PremiumButton className="my-4" disabled={isSubscribed}>
          Gérer votre abonnement
        </PremiumButton>
      ) : (
        // isPro is false obviously
        <PremiumModal isPro={isSubscribed} />
      )}
    </div>
  );
}
