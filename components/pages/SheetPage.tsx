"use client";

import { createSheet } from "@/actions/createSheet";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

import { useResponseModal } from "@/app/hooks/use-response-modal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubTitle from "../subTitle";
import Title from "../title";

import { incrementFreeTrialSheet } from "@/actions/incrementFreeTrialSheet";
import { useUserLimitSheet } from "@/app/hooks/use-user-limit-sheet";
import { MAX_FREE_TRIAL } from "@/lib/utils";
import { SelectLevel } from "./app/select-level";
import { SelectSubject } from "./app/select-subject";
import SheetResponseModal from "./app/sheet-response-modal";

export default function SheetPage({ isSubscribed }: { isSubscribed: boolean }) {
  const [level, setLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [keysWords, setKeysWords] = useState<string>("");

  const { count, increment } = useUserLimitSheet();
  const { open, isOpen } = useResponseModal();
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      onFinish: (data: any) => {
        incrementFreeTrial();
        createSheet(data, {
          level,
          subject,
          keysWords,
        });
      },
      api: "/api/sheet/generate",
      body: {
        level: level,
        userLimit: count,
        subject: subject,
        keysWords: keysWords,
        isSubscribed: isSubscribed,
      },
    });

  const canGenerate = isSubscribed || count < MAX_FREE_TRIAL;

  useEffect(() => {
    if (messages.length > 0) {
      open();
    }
  }, [messages, isLoading, error, open]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setKeysWords(e.target.value);
  };

  const incrementFreeTrial = () => {
    // increment global count
    increment();
    // increment db count
    incrementFreeTrialSheet();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
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
        <div className="flex justify-center">
          {/* select for level */}
          <div className="mx-1">
            <SelectLevel value={level} onValueChange={(e) => setLevel(e)} />
          </div>
          <div className="mx-1">
            <SelectSubject
              value={subject}
              onValueChange={(e) => setSubject(e)}
            />
          </div>
          {/* select for subject */}
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
        <Button disabled={!canGenerate} className="mt-4" type="submit">
          Générer
        </Button>
      </form>

      <SheetResponseModal
        title={"Fiche de révision"}
        open={isOpen}
        content={messages}
        isLoading={isLoading}
      />
      {!canGenerate && (
        <span className="m-3">
          Vous avez atteint la limite gratuite autorisée.
        </span>
      )}
    </div>
  );
}
