"use client";

import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { useResponseModal } from "@/app/hooks/use-response-modal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponseModal } from "../response-modal";
import SubTitle from "../subTitle";
import Title from "../title";

import { studentLevel, subjects } from "@/lib/utils";

export default function ExercicesPage({
  userLimit,
  isSubscribed,
}: {
  userLimit: number | undefined;
  isSubscribed: boolean;
}) {
  const [level, setLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [keysWords, setKeysWords] = useState<string>("");
  const [typeOfExercice, setTypeOfExercice] = useState<string>("");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/exercices",
      body: {
        level: level,
        subject: subject,
        keysWords: keysWords,
        userLimit: userLimit,
        isSubscribed: isSubscribed,
        typeOfExercice: typeOfExercice,
      },
    });

  const { open, isOpen } = useResponseModal();
  const { open: openSubscriptionModal } = usePremiumModal();
  const router = useRouter();

  useEffect(() => {
    if (!isSubscribed) {
      openSubscriptionModal();
      router.push("/");
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
    <div className="h-[100vh] flex flex-col items-center justify-center">
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

      <Title text="Générateur d'exercices" />
      <SubTitle text="Vous avez besoin de réviser ? Générez vos exercices de math adapté à votre niveau en un clin d'oeil !" />

      <form className="flex flex-col w-[90%] md:w-auto" onSubmit={handleSubmit}>
        <div className="flex ">
          {/* select for level */}
          <Select onValueChange={(e) => setLevel(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              {studentLevel.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* select for subject */}
          <Select onValueChange={(e) => setSubject(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Matière" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* select for type of exercice */}
          <Select onValueChange={(e) => setTypeOfExercice(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type Question" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"QCM"}>QCM</SelectItem>
              <SelectItem value={"Question ouverte"}>
                Question ouverte
              </SelectItem>
              <SelectItem value={"YES/NO"}>Oui / Non </SelectItem>
            </SelectContent>
          </Select>
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

      <ResponseModal
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
