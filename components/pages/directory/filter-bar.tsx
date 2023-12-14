"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { getSheetsWithLimit } from "@/actions/getSheetsWithLimit";

import { useTotalOfSheets } from "@/app/hooks/use-total-of-sheets";

import { SheetWithAuthor } from "@/app/types/sheet";

import { FaFilter } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { FiltersBar } from "@/app/types/pagination";
import { SelectLevel } from "../app/select-level";
import { SelectSubject } from "../app/select-subject";
import { FilterBarMobileContent } from "./filter-bar-mobile-content";

export default function FilterBar({
  setSheets,
  pagination,
  resetPagination,
}: {
  setSheets: React.Dispatch<React.SetStateAction<SheetWithAuthor[]>>;
  pagination: { start: number; end: number };
  resetPagination: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setValues } = useTotalOfSheets();

  const [level, setLevel] = useState<string>(searchParams.get("level") ?? "");
  const [subject, setSubject] = useState<string>(
    searchParams.get("subject") ?? ""
  );

  const formSchema = z.object({
    content: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const updateSearchParam = useCallback(
    (filters: FiltersBar) => {
      // Create a copy of the current searchParams
      const updatedParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );

      // Update the copy based on the provided filters
      Object.entries(filters).forEach(([key, value]) => {
        if (!value) {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, value);
        }
      });

      // Convert the updatedParams to string
      const updatedSearch = updatedParams.toString();

      // Build the final query string
      const query = updatedSearch ? `?${updatedSearch}` : "";

      // Push the updated URL to the router
      router.push(`${pathname}${query}`);
    },
    [searchParams, router, pathname]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const filters: FiltersBar = {
      content: values.content ?? "",
      level,
      subject,
    };
    // Reset pagination to fetch the first sheets with the new filters
    resetPagination();
    // Update the URL with the new filters
    updateSearchParam(filters);
    // Fetch the sheets with the new filters & updates values (totalSheets) & sheets
    await updateSheetsWithLimit(filters);
  }

  const updateSheetsWithLimit = async (filters?: FiltersBar) => {
    // Fetch the sheets with the new filters
    const res = await getSheetsWithLimit(pagination, filters);
    // Update the sheets with the new sheets
    setSheets(res.sheets);
    // Update total of sheets with the total of sheet filtered (used for infinite scroll)
    setValues(res.totalOfSheets);
  };

  // Reset filters and pagination & refetch sheets
  const resetFilters = () => {
    form.reset();

    setLevel("");
    setSubject("");
    resetPagination();

    updateSearchParam({
      content: "",
      level: "",
      subject: "",
    });
    updateSheetsWithLimit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-primary-foreground rounded-lg p-5"
      >
        <FilterBarMobileContent
          form={form}
          level={level}
          resetFilters={resetFilters}
          setLevel={setLevel}
          setSubject={setSubject}
          subject={subject}
          onSubmit={onSubmit}
        />

        <div className="hidden lg:flex flex-wrap justify-left lg:justify-center items-end">
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
            <SelectLevel value={level} onValueChange={setLevel} />
          </div>
          <div className="mx-1">
            <SelectSubject value={subject} onValueChange={setSubject} />
          </div>

          <Button className="mx-1" type="submit" variant={"default"}>
            Filtrer
            <FaFilter className="ml-2" />
          </Button>
          <Button
            onClick={resetFilters}
            className="mx-1"
            type="submit"
            variant={"destructive"}
          >
            <MdDelete size="20" color="white" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
