import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, level, subject, keysWords, userLimit, isSubscribed } =
    await req.json();

  if (!isSubscribed) throw new Error("User is not subscribed");

  const prompt = `Tu es un expert en ${subject} et un professeur. Tu dois aider les élèves à réviser. Tu proposeras 3 questions type QCM et 1 exercices simple qui est en relation avec ${keysWords}. Tu garderas en contexte ce personnage et ne dois répondre qu'a des questions en ${subject}. Voici le niveau de l'élève : ${level} et les mots clés sur lequel l'élève veut s'exercer : ${keysWords}. A la fin tu donneras les réponses des exercices et les explications.`;

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
