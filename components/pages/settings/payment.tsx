import PremiumButton from "@/components/premium-button";
import { Separator } from "@/components/ui/separator";

import { checkSubscription } from "@/lib/subscription";

export default async function Payment() {
  const isSubscribed = await checkSubscription();

  return (
    <div className="flex flex-col">
      <h3 className="text-xl md:text-3xl mb-2">Paiement</h3>
      <span className="mb-2 text-muted-foreground">
        Vous pouvez ici savoir si vous êtes premium ou non. Si vous ne
        l&apos;êtes pas vous pouvez le devenir en cliquant sur le bouton
        ci-dessous.
      </span>
      <div>
        <PremiumButton className="my-4" disabled={isSubscribed} />
      </div>
      <Separator className="my-4" />
    </div>
  );
}
