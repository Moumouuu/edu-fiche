import { apiUserLimit } from "@/actions/apiUserLimit";
import Nav from "@/components/nav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLimit = await apiUserLimit();
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
