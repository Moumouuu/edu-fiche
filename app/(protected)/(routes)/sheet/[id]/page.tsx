import { redirect } from "next/navigation";

import SheetPage from "@/components/pages/SheetPage";
import prismadb from "@/lib/prismadb";

export default async function Page({ params }: { params: { id: string } }) {
  const sheet = await prismadb.sheet.findUnique({
    where: { id: params.id },
    include: { userApiLimit: true },
  });

  if (!sheet) return redirect("/not-found");

  return <SheetPage sheet={sheet} />;
}
