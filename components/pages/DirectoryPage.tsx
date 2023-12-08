"use client";

import { getSheetsWithLimit } from "@/actions/getSheetsWithLimit";
import { Pagination } from "@/app/types/pagination";
import { SheetWithAuthor } from "@/app/types/sheet";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SheetCard from "./app/sheet-card";
import Title from "../title";
import { Separator } from "@radix-ui/react-separator";
import LoadingCard from "../loading-card";

const STEP = 3;

export default function DirectoryPage({
  totalOfSheets,
}: {
  totalOfSheets: number;
}) {
  const [sheets, setSheets] = useState<SheetWithAuthor[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    start: 0,
    end: STEP,
  });

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    const res = await getSheetsWithLimit(pagination);
    if (res.error) return;
    console.log(res);
    setSheets((prev) => [...prev, ...res]);

    // update pagination
    setPagination((prev) => ({
      start: prev.start + STEP,
      end: prev.end + STEP,
    }));
  };

  return (
    <div
      id="scrollableDiv"
      className="w-full h-screen overflow-auto flex flex-col p-4 mt-14 md:mt-0"
    >
      <Title text="Annuaire du WEB" />
      <span className="text-md md:text-lg text-black dark:text-muted-foreground italic">
        Vous pouvez retrouver ici toutes les fiches de révisions de la planète !
        Vous pouvez les consulter et les partager avec vos amis.
      </span>
      <Separator className="my-4" />

      <InfiniteScroll
        dataLength={sheets.length}
        next={fetchSheets}
        hasMore={sheets.length < totalOfSheets}
        loader={<LoadingCard />}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Mince ! Il n&apos;y a plus de fiche</b>
          </p>
        }
      >
        <div className="grid auto-rows-[550px] grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sheets.map((sheet, i) => (
            <SheetCard
              key={i}
              sheet={sheet}
              nbWordsDisplay={i % 4 === 0 ? 500 : 300}
              className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 ${
                i % 4 === 0 && "col-span-2"
              }`}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
