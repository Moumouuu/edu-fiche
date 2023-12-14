import { EmailTemplate } from "@/components/email-cron-template";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const weekTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const newUser = await prismadb.userApiLimit.count({
    where: { createdAt: { gt: weekTime } },
  });
  const newSheet = await prismadb.sheet.count({
    where: { createdAt: { gt: weekTime } },
  });
  const totalOfUsers = await prismadb.userApiLimit.count();
  const totalOfSheets = await prismadb.sheet.count();

  const data = await resend.emails.send({
    from: `Acme <ne-pas-repondre@edu-fiche.fr>`,
    to: ["robin@pluviaux.fr"],
    subject: "📦 Cron result from EduFiche",
    react: EmailTemplate({
      newUser,
      newSheet,
      totalOfUsers,
      totalOfSheets,
    }) as React.ReactElement,
  });

  return NextResponse.json(data);
}
