"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-select";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const FormSchema = z.object({
  message: z.string().min(10, {
    message: "Votre message doit contenir au moins 10 caractères.",
  }),
});

export default function Feedback() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      await axios.post("/api/send", {
        ...data,
        sender: session?.user?.email,
      });
    } catch (e) {
      console.log(`ERROR DURING SENDING FEEDBACK : ${e}`);
    } finally {
      setIsLoading(false);
      toast.success("Votre feedback a bien été envoyé !");
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className="flex flex-col">
      <h3 className="text-xl md:text-3xl mb-2 ">Feedback</h3>
      <span className="mb-2 text-muted-foreground">
        Vous pouvez, si vous le souhaitez me faire part de votre ressenti sur
        l&apos;application.
      </span>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Envoyer un Feedback</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Votre{" "}
                <span className="p-1 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase">
                  Feedback !
                </span>
              </DialogTitle>
              <DialogDescription>
                Votre feedback sera envoyé au développeur de l&apos;application.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ton application est vraiment géniale !"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} className="mt-3" type="submit">
                  Envoyer
                  <IoMdSend className="ml-2" size={20} />
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="my-4" />
    </div>
  );
}
