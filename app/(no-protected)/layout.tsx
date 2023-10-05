import { Rubik } from "next/font/google";


const font = Rubik({ subsets: ['latin'] })

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr">
      <body>
        <main className={font.className}>
          {children}
        </main>
      </body>
    </html>
  );
}
