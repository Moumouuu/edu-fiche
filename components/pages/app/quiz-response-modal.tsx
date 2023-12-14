import { useResponseModal } from "@/app/hooks/use-response-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type QuizStep = {
  choices: string[];
  question: string;
  answer: string;
};

import { cn } from "@/lib/utils";
import { useState } from "react";
export function QuizResponseModal({
  open,
  quiz,
  isLoading,
  title,
}: {
  open: boolean;
  quiz: QuizStep[];
  isLoading: boolean;
  title: string;
}) {
  const { close } = useResponseModal();

  const [step, setStep] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);

  const handleAnswer = (answer: string) => {
    if (answer === quiz[step].answer) {
      setPoints((prev) => prev + 1);
    }
    setShowAnswer(true);
  };

  const nextStep = () => {
    if (step >= quiz.length - 1) {
      setEnd(true);
      return;
    }
    setStep((prev) => prev + 1);
    setShowAnswer(false);
  };

  const resetQuiz = () => {
    close();
    setStep(0);
    setPoints(0);
    setEnd(false);
    setShowAnswer(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetQuiz}>
      <DialogContent className="sm:max-w-[700px] h-[60vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl">
            Votre{" "}
            <span className="font-extrabold text-xl md:text-3xl p-1 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase ease">
              {title || "réponse"}
            </span>
          </DialogTitle>
          <DialogDescription>
            Votre Quiz est unique, vous ne pourrez plus le consulter si vous
            fermez cette page. <span className="underline">Pour rappel</span> :
            le Quiz peut contenir des erreurs !
          </DialogDescription>
        </DialogHeader>
        <div className="p-3 ">
          {isLoading ? (
            <div className="flex flex-col items-center ">
              <Loader />
              <span className="text-2xl text-center mt-6 font-semibold">
                La génération du quiz est en cours (temps estimé : 1 minute).
              </span>
            </div>
          ) : end ? (
            <div className="flex flex-col items-center">
              {/* @ts-ignore */}
              <lord-icon
                src="https://cdn.lordicon.com/gedfcmxx.json"
                trigger="loop"
                delay="1500"
                colors="primary:#fff"
                style={{ width: "200px", height: "200px" }}
              />
              <span className="text-4xl p-1 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase">
                Bravo !
              </span>
              <span className="text-xl my-3">
                <span className="underline">Score</span>: {points} /{" "}
                {quiz.length}
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex mb-2">
                <span className="text-2xl font-semibold">
                  {quiz[step]?.question}
                </span>
              </div>
              <ul>
                {quiz[step]?.choices.map((choice, index) => (
                  <li
                    key={index}
                    onClick={() => handleAnswer(choice)}
                    className={cn(
                      showAnswer &&
                        choice === quiz[step].answer &&
                        "bg-green-800 hover:bg-green-700 ",
                      "flex items-center justify-center my-2 p-2 border border-primary/40 rounded cursor-pointer transition duration-200 ease-in-out"
                    )}
                  >
                    <span className="text-xl">{choice}</span>
                  </li>
                ))}
              </ul>
              <Progress
                className="h-2 my-5"
                value={((step + 1) * 100) / quiz.length}
              />
              <div className="flex justify-between items-center">
                <span>
                  {step + 1}/{quiz.length}
                </span>
                <Button disabled={!showAnswer} onClick={nextStep}>
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const Loader = () => {
  // css of the animation in global.css
  return (
    <div className="loader">
      <div className="box1"></div>
      <div className="box2"></div>
      <div className="box3"></div>
    </div>
  );
};
