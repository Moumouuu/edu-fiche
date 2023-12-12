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

export default function SheetResponseModal({
  open,
  content,
  isLoading,
  title,
}: {
  open: boolean;
  content: Message[];
  isLoading: boolean;
  title: string;
}) {
  const { copyToClipboard } = useClipboard();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[700px] h-[60vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl">
            Votre{" "}
            <span className="font-extrabold text-xl p-1 md:text-3xl bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase ">
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
