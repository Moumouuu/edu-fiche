"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthContext({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
