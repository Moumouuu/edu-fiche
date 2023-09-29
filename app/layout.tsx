import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AuthContext from "./context/auth-context";
import "./globals.css";
import GoogleAnalytics from "@/components/google-analytics";

export const metadata: Metadata = {
  title: "EduFiche | Votre générateur de fiche de révision",
  description:
    "EduFiche vous permet de générer des fiches de révision en un clic !",
  openGraph: {
    title: "EduFiche | Votre générateur de fiche de révision",
    description:
      "EduFiche vous permet de générer des fiches de révision en un clic !",
    url: "https://edu-fiche.fr",
    siteName: "Edu-Fiche",
    images: [
      {
        url: "/public/assets/images/edufiche.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={roboto.className}>
          <AuthContext session={session}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <GoogleAnalytics/>
              {children}
            </ThemeProvider>
          </AuthContext>
        </body>
      </html>
      <Script src="https://cdn.lordicon.com/bhenfmcm.js" />
    </>
  );
}
