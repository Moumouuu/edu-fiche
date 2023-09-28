import { MAX_FREE_TRIAL } from "@/lib/utils";
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

  if (userLimit === MAX_FREE_TRIAL && !isSubscribed)
    throw new Error("UserApiLimit reached");

  const prompt = `Tu es un expert en ${subject} et un professeur. Tu dois aider les élèves à générer des fiches de révision avec leur niveau scolaire. Tu ne dois pas lister des éléments. Tu proposeras aussi 2 questions type QCM. La fiche doit être soignée et ne pas dépasser les 200 mots. Tu garderas en contexte ce personnage et ne dois répondre qu'a des questions en ${subject}. Voici le niveau de l'élève : ${level} et les mots clés pour la fiche de révision : ${keysWords}.`;

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
