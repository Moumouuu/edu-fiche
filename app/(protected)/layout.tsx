import { apiUserLimit } from "@/actions/apiUserLimit";
import Nav from "@/components/nav";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLimit = await apiUserLimit();
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <html lang="en">
      <body>
        <main className="flex h-[100vh]">
          <Nav userLimit={userLimit} />
          {children}
        </main>
      </body>
    </html>
  );
}
