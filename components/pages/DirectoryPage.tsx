"use client";

import { FiltersBar, getSheetsWithLimit } from "@/actions/getSheetsWithLimit";
import { Pagination } from "@/app/types/pagination";
import { SheetWithAuthor } from "@/app/types/sheet";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SheetCard from "./app/sheet-card";
import Title from "../title";
import LoadingCard from "../loading-card";
import { Separator } from "../ui/separator";
import { Filter } from "lucide-react";
import FilterBar from "./directory/filter-bar";
import usePagination from "@/app/hooks/use-pagination";
import { useSearchParams } from "next/navigation";

export default function DirectoryPage({
  totalOfSheets,
}: {
  totalOfSheets: number;
}) {
  const [sheets, setSheets] = useState<SheetWithAuthor[]>([]);
  const { pagination, setPagination } = usePagination();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    // get filters if exist in query params and apply them to the request
    const filters: FiltersBar = {
      content: searchParams.get("content") ?? "",
      level: searchParams.get("level") ?? "",
      subject: searchParams.get("subject") ?? "",
    };
    const res = await getSheetsWithLimit(pagination, filters);
    if (res.error) return;
    setSheets((prev) => [...prev, ...res]);

    // update pagination
    setPagination({
      start: pagination.start,
      end: pagination.end,
    });
  };

  return (
    <div
      id="scrollableDiv"
      className="w-full h-screen overflow-auto flex flex-col p-4 mt-14 lg:mt-0"
    >
      <Title text="Annuaire du WEB" />
      <span className="text-md md:text-lg text-black dark:text-muted-foreground italic">
        Vous pouvez retrouver ici toutes les fiches de révisions de la planète !
        Vous pouvez les consulter et les partager avec vos amis.
      </span>
      <Separator className="my-4" />

      <FilterBar setSheets={setSheets} />

      <InfiniteScroll
        dataLength={sheets.length}
        next={fetchSheets}
        scrollThreshold={0.5}
        hasMore={sheets.length < totalOfSheets}
        loader={<LoadingCard />}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Mince ! Vous avez tout consulté...</b>
          </p>
        }
      >
        <div className="grid auto-rows-[550px] grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {sheets.map((sheet, i) => (
            <SheetCard
              key={i}
              sheet={sheet}
              className={`row-span-1 rounded-xl border-2  ${
                i % 4 === 0 && "lg:col-span-2"
              }`}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
