import { apiUserLimit } from "@/actions/apiUserLimit";
import Nav from "@/components/nav";
import { checkSubscription } from "@/lib/subscription";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLimit = await apiUserLimit();
  const session = await getServerSession();
  const isPro = await checkSubscription();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <html lang="en">
      <body>
        <main className="flex ">
          <Nav userLimit={userLimit} isPro={isPro} />
          {children}
        </main>
      </body>
    </html>
  );
}
