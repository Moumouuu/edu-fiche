import { apiUserLimit } from "@/actions/apiUserLimit";
import Navbar from "../../components/navbar/Navbar";

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
