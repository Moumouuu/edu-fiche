import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: "EduFiche | Votre générateur de fiche de révision",
  description:
    "EduFiche vous permet de générer des fiches de révision en un clic !",
};

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={roboto.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
      <Script src="https://cdn.lordicon.com/bhenfmcm.js" />
    </>
  );
}
