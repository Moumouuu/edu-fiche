import { Message } from "ai";

import useClipboard from "@/app/hooks/use-clip-board";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaCopy } from "react-icons/fa";
import { Button } from "../../ui/button";

import { MAX_FREE_TRIAL } from "@/lib/utils";
export function SheetResponseModal({
  open,
  content,
  isLoading,
  isSubscribed,
  userLimit,
  title,
}: {
  open: boolean;
  content: Message[];
  isLoading: boolean;
  isSubscribed: boolean;
  userLimit: number | undefined;
  title: string;
}) {
  const { copyToClipboard } = useClipboard();

  if (!isSubscribed && userLimit === MAX_FREE_TRIAL) {
    return (
      <span className="m-3">
        Vous avez atteint la limite gratuite autorisée.{" "}
      </span>
    );
  }

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[700px] h-[60vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl">
            Votre{" "}
            <span className="font-extrabold text-xl md:text-3xl text-transparent uppercase bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 ease  ">
              {title || "réponse"}
            </span>
          </DialogTitle>
          <DialogDescription>
            Votre fiche est automatiquement sauvegardée ! Vous pouvez la
            consulter a tout moment.
          </DialogDescription>
        </DialogHeader>
        <div className="p-3 ">
          <p className="text-sm md:text-lg whitespace-pre-wrap">
            {content[content.length - 1]?.content}
          </p>
          {!isLoading && (
            <Button
              variant={"default"}
              onClick={() =>
                copyToClipboard(content[content.length - 1]?.content)
              }
              className="mt-3 flex items-center"
            >
              <FaCopy size={20} />
              <span className="ml-3">Copier</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
