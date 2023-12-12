"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getSheetsWithLimit } from "@/actions/getSheetsWithLimit";

import usePagination from "@/app/hooks/use-pagination";
import { useTotalOfSheets } from "@/app/hooks/use-total-of-sheets";

import { SheetWithAuthor } from "@/app/types/sheet";

import { FiltersBar } from "@/app/types/pagination";
import LoadingCard from "../loading-card";
import Title from "../title";
import { Separator } from "../ui/separator";
import SheetCard from "./app/sheet-card";
import FilterBar from "./directory/filter-bar";

export default function DirectoryPage() {
  const [sheets, setSheets] = useState<SheetWithAuthor[]>([]);

  const { pagination, setPagination, resetPagination } = usePagination();
  const { values: totalOfSheets, setValues } = useTotalOfSheets();
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

    const resSheetsWithLimit = await getSheetsWithLimit(pagination, filters);
    //update total of sheets with the total of sheet filtered
    setValues(resSheetsWithLimit.totalOfSheets);
    setSheets((prev) => [...prev, ...resSheetsWithLimit.sheets]);

    // update pagination to fetch next sheets
    setPagination();
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

      <FilterBar
        setSheets={setSheets}
        pagination={pagination}
        resetPagination={resetPagination}
      />

      <InfiniteScroll
        dataLength={sheets.length}
        next={fetchSheets}
        scrollThreshold={0.4}
        hasMore={totalOfSheets === -1 ? true : sheets.length < totalOfSheets}
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
