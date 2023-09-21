"use client";
import { PremiumButton } from "@/components/premium-button";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
export default function SettingsPage({ isSubscribed} : { isSubscribed: boolean}) {
  const [loading, setLoading] = useState(false);

  const onClickPremiumButton = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-4 px-4 py-14 flex flex-col">
      <h1 className="text-xl md:text-3xl ">Settings</h1>
      <span className="text-primary/70">Gère ton compte.</span>
      {isSubscribed ? (
        <Button
          variant={"premium"}
          className="my-4"
          onClick={onClickPremiumButton}
          disabled={loading}
        >
          Gérer votre abonnement
        </Button>
      ) : (
        // isPro is false obviously
        <PremiumButton isPro={isSubscribed}/>
      )}
    </div>
  );
}
