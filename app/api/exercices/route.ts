import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { MAX_FREE_TRIAL } from "@/lib/utils";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const {
    messages,
    level,
    subject,
    keysWords,
    userLimit,
    isSubscribed,
    typeOfExercice,
  } = await req.json();

  if (!isSubscribed) throw new Error("User is not subscribed");

  if (userLimit === MAX_FREE_TRIAL && !isSubscribed)
    throw new Error("UserApiLimit reached");

  const prompt = `Tu es un expert en ${subject} et un professeur. Tu dois aider les élèves à réviser. Tu proposeras obligatoirement des exercices en fonction du niveau d'étude de l'élève, et qui est en relation avec ${keysWords}. Les 3 exercices que tu proposes doit être du type : ${typeOfExercice}. Tu garderas en contexte ce personnage et ne dois répondre qu'a des questions en ${subject}. Voici le niveau de l'élève : ${level} et les mots clés sur lequel l'élève veut s'exercer : ${keysWords}. Tu donneras les réponses des exercices et les explications.`;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    stream: true,
    max_tokens: 12000,
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
      ...messages,
    ],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
