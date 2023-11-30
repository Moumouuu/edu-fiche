"use client";
import useStripeSubscribe from "@/app/hooks/use-stripe-subscribe";
import { PremiumModal } from "@/components/premium-modal";
import { Button } from "@/components/ui/button";
export default function SettingsPage({
  isSubscribed,
}: {
  isSubscribed: boolean;
}) {
  const { subscribeToStripe, loading } = useStripeSubscribe();

  return (
    <div className="md:p-4 px-4 py-14 flex flex-col">
      <h1 className="text-xl md:text-3xl ">Settings</h1>
      <span className="text-primary/70">Gère ton compte.</span>
      {isSubscribed ? (
        <Button
          variant={"premium"}
          className="my-4"
          onClick={subscribeToStripe}
          disabled={loading || isSubscribed}
        >
          Gérer votre abonnement
        </Button>
      ) : (
        // isPro is false obviously
        <PremiumModal isPro={isSubscribed} />
      )}
    </div>
  );
}
