import Title from "@/components/title";
import { Separator } from "@/components/ui/separator";

export default function HeaderSettings() {
  return (
    <div className="flex flex-col w-full">
      <Title text="Paramètres" />
      <span className="text-md md:text-lg text-black dark:text-muted-foreground italic">
        Vous pouvez gérer votre abonnement ici et en savoir plus sur vos
        paramètres.
      </span>
      <Separator className="my-4" />
    </div>
  );
}
