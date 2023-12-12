"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubTitle from "../subTitle";
import Title from "../title";
import { QuizResponseModal } from "./app/quiz-response-modal";
import { SelectLevel } from "./app/select-level";
import { SelectSubject } from "./app/select-subject";

import { incrementFreeTrialQuiz } from "@/actions/incrementFreeTrialQuiz";

import { useResponseModal } from "@/app/hooks/use-response-modal";
import { useUserLimitQuiz } from "@/app/hooks/use-user-limit-quiz";

import { MAX_FREE_TRIAL_QUIZ } from "@/lib/utils";

export default function QuizPage({ isSubscribed }: { isSubscribed: boolean }) {
  const [quiz, setQuiz] = useState<[]>([]);
  const [level, setLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [keysWords, setKeysWords] = useState<string>("");

  const { count, increment } = useUserLimitQuiz();
  const { isOpen, open } = useResponseModal();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      onFinish: (data: Message) => {
        setQuiz(JSON.parse(data.content as any));
        incrementFreeTrial();
      },
      api: "/api/quiz",
      body: {
        level: level,
        subject: subject,
        userLimit: count,
        keysWords: keysWords,
        isSubscribed: isSubscribed,
      },
    });

  const canGenerate = isSubscribed || count < MAX_FREE_TRIAL_QUIZ;

  useEffect(() => {
    if (messages.length > 0) {
      open();
    }
  }, [messages, open]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setKeysWords(e.target.value);
  };

  const incrementFreeTrial = () => {
    // increment global count
    increment();
    // increment db count
    incrementFreeTrialQuiz();
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
      <SubTitle text="Avez-vous besoin de réviser ? Générez vos Quiz de math adaptés à votre niveau en un clin d'œil !" />

      <form className="flex flex-col w-[90%] md:w-auto" onSubmit={handleSubmit}>
        <div className="flex ">
          {/* select for level */}
          <div className="mx-1">
            <SelectLevel onValueChange={(e) => setLevel(e)} value={level} />
          </div>
          {/* select for subject */}

          <div className="mx-1">
            <SelectSubject
              onValueChange={(e) => setSubject(e)}
              value={subject}
            />
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
        <Button disabled={!canGenerate} className="mt-4" type="submit">
          Générer
        </Button>
      </form>

      <QuizResponseModal
        open={isOpen}
        title={"Quiz"}
        quiz={quiz}
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
