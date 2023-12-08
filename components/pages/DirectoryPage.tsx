"use client";

import { getSheetsWithLimit } from "@/actions/getSheetsWithLimit";
import { Pagination } from "@/app/types/pagination";
import { Sheet } from "@prisma/client";
import React, { useEffect, useState } from "react";

const STEP = 2;

export default function DirectoryPage() {
  // fetch sheets from api avec infinite scroll
  const [sheets, setSheets] = useState<Sheet[]>([]);
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

    setSheets((prev) => [...prev, ...sheets]);

    // update pagination
    setPagination((prev) => ({
      start: prev.start + STEP,
      end: prev.end + STEP,
    }));
  };

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col p-4 mt-14 md:mt-0">
      Helllo world
    </div>
  );
}
