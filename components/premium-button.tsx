"use client";

import useStripeSubscribe from "@/app/hooks/use-stripe-subscribe";
import { Button } from "./ui/button";

export default function PremiumButton({
  className,
  disabled,
  children,
}: {
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  const { subscribeToStripe, loading } = useStripeSubscribe();

  return (
    <Button
      type="submit"
      className={className}
      disabled={loading || disabled}
      onClick={subscribeToStripe}
      variant="premium"
    >
      {children || "Passer Premium"}
    </Button>
  );
}
