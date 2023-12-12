import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { promptGenerateQuiz } from "@/lib/prompts";
import { MAX_FREE_TRIAL_QUIZ } from "@/lib/utils";
import { NextResponse } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, level, subject, keysWords, isSubscribed, userLimit } =
    await req.json();

  if (userLimit >= MAX_FREE_TRIAL_QUIZ && !isSubscribed)
    return NextResponse.json({ error: "UserApiLimit reached" });

  const prompt = promptGenerateQuiz(subject, level, keysWords);

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
