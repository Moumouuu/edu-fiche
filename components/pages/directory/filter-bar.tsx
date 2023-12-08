"use client";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SelectLevel } from "../app/select-level";
import { SelectSubject } from "../app/select-subject";
import { FaFilter } from "react-icons/fa";
import { FiltersBar, getSheetsWithLimit } from "@/actions/getSheetsWithLimit";
import { Pagination } from "@/app/types/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sheet } from "@prisma/client";
import { SheetWithAuthor } from "@/app/types/sheet";
import usePagination from "@/app/hooks/use-pagination";

export default function FilterBar({
  setSheets,
}: {
  setSheets: React.Dispatch<React.SetStateAction<SheetWithAuthor[]>>;
}) {
  const [level, setLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const { pagination } = usePagination();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formSchema = z.object({
    content: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // reset pagination & apply filters

    const filters: FiltersBar = {
      content: values.content ?? "",
      level,
      subject,
    };
    // todo : refactor & remove old filters from query params
    router.push(
      pathname +
        "?" +
        createQueryString("level", filters.content ?? "") +
        "&" +
        createQueryString("subject", filters.subject ?? "") +
        "&" +
        createQueryString("content", filters.content ?? "")
    );

    const res = await getSheetsWithLimit(pagination, filters);
    if (res.error) return;
    setSheets(res);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-end w-full bg-primary-foreground rounded-lg p-5"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mx-2">
              <FormControl>
                <Input
                  className="w-[300px]"
                  placeholder="Chercher dans le contenu d'une fiche"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mx-1">
          <SelectLevel onValueChange={setLevel} />
        </div>
        <div className="mx-1">
          <SelectSubject onValueChange={setSubject} />
        </div>

        <Button className="mx-1" type="submit" variant={"default"}>
          Filtrer
          <FaFilter className="ml-2" />
        </Button>
      </form>
    </Form>
  );
}
