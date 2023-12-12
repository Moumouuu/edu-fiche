"use client";

import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { useResponseModal } from "@/app/hooks/use-response-modal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubTitle from "../subTitle";
import Title from "../title";
import { SheetResponseModal } from "./app/sheet-response-modal";

import { SelectLevel } from "./app/select-level";
import { SelectSubject } from "./app/select-subject";

export default function QuizPage({
  userLimit,
  isSubscribed,
}: {
  userLimit: number | undefined;
  isSubscribed: boolean;
}) {
  const [level, setLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [keysWords, setKeysWords] = useState<string>("");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/quiz",
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
    if (!isSubscribed) {
      openSubscriptionModal();
      router.push("/app");
    }
  }, [isSubscribed, openSubscriptionModal]);

  useEffect(() => {
    if (messages.length > 0) {
      open();
    }
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setKeysWords(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div>
        {/* @ts-ignore */}
        <lord-icon
          src="https://cdn.lordicon.com/kipaqhoz.json"
          trigger="loop"
          delay="2000"
          colors="primary:#fff"
          style={{ width: "100px", height: "100px" }}
        />
      </div>

      <Title text="Générateur de Quiz" />
      <SubTitle text="Vous avez besoin de réviser ? Générez vos Quiz de math adapté à votre niveau en un clin d'oeil !" />

      <form className="flex flex-col w-[90%] md:w-auto" onSubmit={handleSubmit}>
        <div className="flex ">
          {/* select for level */}
          <div className="mx-1">
            <SelectLevel onValueChange={(e) => setLevel(e)} />
          </div>
          {/* select for subject */}

          <div className="mx-1">
            <SelectSubject onValueChange={(e) => setSubject(e)} />
          </div>
        </div>

        {/* keywords */}
        <Input
          className="mt-4"
          placeholder="Addition de matrice, équation différentielle ..."
          type="text"
          value={input}
          onChange={handleInput}
        />

        {/* submit button */}
        <Button className="mt-4" type="submit">
          Générer
        </Button>
      </form>

      {/* TODO : refactor with modal quiz */}
      <SheetResponseModal
        title={"Exercice"}
        open={isOpen}
        content={messages}
        isLoading={isLoading}
        isSubscribed={isSubscribed}
        userLimit={userLimit}
      />
    </div>
  );
}
