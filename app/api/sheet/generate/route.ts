import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { promptGenerateSheet } from "@/lib/prompts";
import { MAX_FREE_TRIAL } from "@/lib/utils";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const data = await req.json();
  const { level, subject, keysWords, isSubscribed, userLimit } = data;

  if (userLimit >= MAX_FREE_TRIAL && !isSubscribed)
    throw new Error("UserApiLimit reached");

  const prompt = promptGenerateSheet(subject, level, keysWords);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    stream: true,
    max_tokens: 12000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
