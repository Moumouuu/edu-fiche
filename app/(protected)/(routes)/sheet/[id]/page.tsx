import SheetPage from "@/components/pages/SheetPage";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const sheet = await prismadb.sheet.findUnique({
    where: { id: params.id },
  });

  if (!sheet) return redirect("/not-found");

  return <SheetPage sheet={sheet} />;
}
