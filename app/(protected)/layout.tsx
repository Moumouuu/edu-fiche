import { getServerSession } from "next-auth/next";
import { Rubik } from "next/font/google";
import { redirect } from "next/navigation";

import { apiUserLimit } from "@/actions/apiUserLimit";
import { checkSubscription } from "@/lib/subscription";

import Nav from "@/components/pages/app/nav";

const font = Rubik({ subsets: ["latin"] });

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
    <html lang="fr">
      <body>
        <main className={font.className + " flex"}>
          <Nav userLimit={userLimit} isPro={isPro} />
          {children}
        </main>
      </body>
    </html>
  );
}
