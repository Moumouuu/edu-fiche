import { apiUserLimit } from "@/actions/apiUserLimit";
import Navbar from "@/components/navbar/Sidebar";

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
          <Navbar userLimit={userLimit} />
          {children}
        </main>
      </body>
    </html>
  );
}
