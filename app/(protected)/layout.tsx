import { getApiUserLimit } from "@/actions/apiUserLimit";
import Navbar from "../../components/Navbar/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiUserLimit = await getApiUserLimit();
  console.log(apiUserLimit);
  return (
    <html lang="en">
      <body>
        <main className="flex h-[100vh]">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
