import { EmailTemplate } from "@/components/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { message, sender } = await req.json();
  try {
    const data = await resend.emails.send({
      from: `Acme <ne-pas-repondre@edu-fiche.fr>`,
      to: ["robin@pluviaux.fr"],
      subject: "📦 Nouveau message de Edu-Fiche",
      react: EmailTemplate({
        message,
        sender,
      }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
