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

export default function DirectoryPage() {
  // fetch sheets from api avec infinite scroll
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
        hasMore={true}
        loader={<LoadingCard />}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay ! Vous avez tout vu</b>
          </p>
        }
      >
        {sheets.map((sheet: SheetWithAuthor, index) => (
          <SheetCard key={index} sheet={sheet} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
