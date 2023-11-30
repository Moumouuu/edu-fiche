import { checkSubscription } from "@/lib/subscription";
import Pricing from "./pricing";

export async function Cards() {
  const isSubscribed = await checkSubscription();

  return (
    <div className="w-full px-2 py-20 lg:p-20">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold">
          C&apos;est presque{" "}
          <span className="p-1 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase">
            gratuit
          </span>{" "}
          pour vous !
        </h1>
        <h3 className="mt-6 text-xl font-semibold text-muted-foreground">
          Améliorez votre expérience avec notre abonnement premium ! Soutenez
          directement le développement, l&apos;unique étudiant derrière ce
          projet. Rejoignez-nous maintenant !
        </h3>
        <Pricing isSubscribed={isSubscribed} />
      </div>
    </div>
  );
}
