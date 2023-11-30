import { useState } from "react";
import toast from "react-hot-toast";

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        toast.success("Lien copié dans le presse-papier !");
      })
      .catch((error) => {
        console.error("Erreur lors de la copie dans le presse-papier :", error);
        setIsCopied(false);
        toast.success("Lien copié dans le presse-papier !");
      });
  };

  return { copyToClipboard, isCopied };
};

export default useClipboard;
