import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Roboto } from "next/font/google";
import Script from "next/script";

import GoogleAnalytics from "@/components/google-analytics";
import { authOptions } from "@/lib/auth";

import AuthContext from "@/app/providers/auth-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";

import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "EduFiche | Votre générateur de fiche de révision automatique et gratuit",
  description:
    "Fin de soirée un peu trop arrosée ? EduFiche vous permet de générer automatiquement et gratuitement des fiches de révision en un clic !",
  openGraph: {
    title:
      "EduFiche | Votre générateur de fiche de révision automatique et gratuit",
    description:
      "Fin de soirée un peu trop arrosée ? EduFiche vous permet de générer automatiquement et gratuitement des fiches de révision en un clic !",
    url: "https://edu-fiche.fr",
    siteName: "EduFiche",
    images: [
      {
        url: "/assets/images/opengraph-edufiche.png",
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
          <Toaster />
          <AuthContext session={session}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <GoogleAnalytics />
              {children}
            </ThemeProvider>
          </AuthContext>
        </body>
      </html>
      <Script src="https://cdn.lordicon.com/bhenfmcm.js" />
    </>
  );
}
