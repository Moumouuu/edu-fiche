import { Rubik } from "next/font/google";

const font = Rubik({ subsets: ["latin"] });

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={font.className}>{children}</main>;
}
