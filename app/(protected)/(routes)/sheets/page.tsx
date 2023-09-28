import MySheetPage from "@/components/pages/MySheetPage";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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

  return (
    <div>
      <MySheetPage sheets={sheets} />
    </div>
  );
}
