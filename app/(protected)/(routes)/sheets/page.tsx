import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import SheetPage from "@/components/pages/SheetsPage";
import prismadb from "@/lib/prismadb";

export const metadata: Metadata = {
  title: "EduFiche | Mes fiches",
  description: "Pages de consultation des fiches de l'application EduFiche",
};

export default async function Page() {
  const session = await getServerSession();

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userEmail: session?.user?.email! },
  });

  if (!userApiLimit) return redirect("/sign-in");

  const sheets = await prismadb.sheet.findMany({
    where: { userApiLimitId: userApiLimit.id },
    include: { userApiLimit: true },
    orderBy: { createdAt: "desc" },
  });

  return <SheetPage sheets={sheets} />;
}
