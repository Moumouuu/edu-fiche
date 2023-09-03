import Navbar from "./components/Navbar/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex ">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
