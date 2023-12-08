import DirectoryPage from "@/components/pages/DirectoryPage";
import prismadb from "@/lib/prismadb";
import React from "react";

export default async function Page() {
  const totalOfSheets = await prismadb.sheet.count();
  return <DirectoryPage totalOfSheets={totalOfSheets} />;
}
