import MySheetPage from "@/components/pages/MySheetPage";
import prismadb from "@/lib/prismadb";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "EduFiche | Mes fiches",
  description: "Pages de consultation des fiches de l'application EduFiche",
};

export default async function Page() {
  const session = await getServerSession();

  if (!session) return redirect("/sign-in");

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userEmail: session.user?.email! },
  });

  if (!userApiLimit) return redirect("/sign-in");

  const sheets = await prismadb.sheet.findMany({
    where: { userApiLimitId: userApiLimit.id },
    orderBy: { createdAt: "desc" },
  });

  return <MySheetPage sheets={sheets} />;
}
