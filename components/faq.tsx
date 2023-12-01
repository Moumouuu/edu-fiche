import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center px-2 py-20 lg:p-20">
      <h1 className="text-6xl font-bold mr-3 mb-5 text-center lg:text-left">
        Les questions <span className="underline">fréquentes</span>
      </h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            Quand vais-je recevoir mes avantages après mon passage Premium ?
          </AccordionTrigger>
          <AccordionContent>
            Vous recevrez vos avantages instantanément après être passé à
            Premium. Il se peut que vous ayez à vous déconnecter et vous
            reconnecter.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">Puis-je être remboursé ?</AccordionTrigger>
          <AccordionContent>
            Malheureusement, étant donné que les avantages sont numériques, nous
            ne pouvons pas vous rembourser. Cependant, vous pouvez nous
            contacter si vous rencontrez un problème avec votre commande à
            l&apos;adresse suivante :
            <a
              className="underline text-green-400"
              href="mailto:robin@pluviaux.fr"
            >
              ici
            </a>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            Comment fonctionne l&apos;outil de génération de fiches de révision
            ?
          </AccordionTrigger>
          <AccordionContent>
            Pour générer les fiches de révision, EduFiche utilise l&apos;API
            d&apos;OpenAI.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left">
            Les fiches peuvent t&apos;elles contenir des erreurs ?
          </AccordionTrigger>
          <AccordionContent>
            Oui, les fiches peuvent contenir des erreurs car elles sont générées
            automatiquement par une intelligence artificielle. Cependant, aucun
            remboursement n&apos;est possible pour cette raison.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
