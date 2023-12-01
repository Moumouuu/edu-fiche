"use client";

import { Input } from "@/components/ui/input";
import SubTitle from "../subTitle";
import Title from "../title";

import { createSheet } from "@/actions/createSheet";
import { incrementFreeTrial } from "@/actions/incrementFreeTrial";
import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { useResponseModal } from "@/app/hooks/use-response-modal";
import { Button } from "@/components/ui/button";
import { MAX_FREE_TRIAL } from "@/lib/utils";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ResponseModal } from "../response-modal";
import { SelectLevel } from "../select-level";
import { SelectSubject } from "../select-subject";

export default function SheetPage({
  userLimit,
  isSubscribed,
}: {
  userLimit: number | undefined;
  isSubscribed: boolean;
}) {
  const [level, setLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [keysWords, setKeysWords] = useState<string>("");
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/sheet/generate",
      body: {
        level: level,
        subject: subject,
        keysWords: keysWords,
        userLimit: userLimit,
        isSubscribed: isSubscribed,
      },
    });

  const { open, isOpen } = useResponseModal();
  const { open: openSubscriptionModal } = usePremiumModal();
  const router = useRouter();

  useEffect(() => {
    if (userLimit === MAX_FREE_TRIAL && !isSubscribed) {
      return openSubscriptionModal();
    }
  }, [userLimit, isSubscribed, openSubscriptionModal]);

  useEffect(() => {
    if (messages.length > 0) {
      open();
      if (!error && !isLoading) {
        incrementFreeTrial();
        createSheet(messages, {
          level,
          subject,
          keysWords,
        });
        router.refresh();
      }
    }
  }, [messages, isLoading, error]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setKeysWords(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Toaster />
      <div>
        {/* @ts-ignore */}
        <lord-icon
          src="https://cdn.lordicon.com/isugonwi.json"
          trigger="loop"
          delay="2000"
          colors="primary:#fff"
          style={{ width: "100px", height: "100px" }}
        />
      </div>

      <Title text="Fiche de révision" />
      <SubTitle text="Générez votre fiche de révision en un instant ! Sélectionnez votre niveau d'études, la matière et les mots-clés de votre cours." />

      <form className="flex flex-col w-[90%] md:w-auto" onSubmit={handleSubmit}>
        <div className="flex ">
          {/* select for level */}
          <SelectLevel onValueChange={(e) => setLevel(e)} />
          {/* select for subject */}
          <SelectSubject onValueChange={(e) => setSubject(e)} />
        </div>

        {/* keywords */}
        <Input
          className="mt-4"
          placeholder="Guerre mondiale, 1914, 1918 ..."
          type="text"
          value={input}
          onChange={handleInput}
        />

        {/* submit button */}
        <Button className="mt-4" type="submit">
          Générer
        </Button>
      </form>

      <ResponseModal
        title={"Fiche de révision"}
        open={isOpen}
        content={messages}
        isLoading={isLoading}
        isSubscribed={isSubscribed}
        userLimit={userLimit}
      />
    </div>
  );
}
