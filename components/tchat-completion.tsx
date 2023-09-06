"use client";

import { useChat } from "ai/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TchatCompletion() {
  const { messages, input, handleInputChange, handleSubmit  } = useChat();
  const { data: session } = useSession();
  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full">
        <div className="flex flex-col h-[85vh] overflow-y-scroll p-14 md:p-20">
          {messages.map((m) => (
            <div className="mb-4 flex items-center my-3" key={m.id}>
              {m.role === "user" ? (
                <Image
                  src={
                    session?.user?.image ?? "/assets/images/default-profile.png"
                  }
                  alt="user image"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
              ) : (
                <Image
                  src={"/assets/images/ai.png"}
                  alt="user image"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
              )}
              <span className="text-sm md:text-lg">{m.content}</span>
            </div>
          ))}
        </div>
      </div>
      <form
        className="flex items-center h-full justify-center p-3 md:p-10 border-t"
        onSubmit={handleSubmit}
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Posez une question pour commencer à discuter ..."
          type="text"
          className="text-sm md:text-lg md:w-1/2 w-full"
        />
        <Button variant={"default"} className="mx-3">
          Envoyer
        </Button>
      </form>
    </div>
  );
}
