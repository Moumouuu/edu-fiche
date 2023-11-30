import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // title & idSheet is only for update
  const { messages, level, subject, keysWords, idSheet, title } =
    await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect("sign-in");
  }

  if (!idSheet && messages.lenght === 0) {
    return NextResponse.json("No messages to save");
  }

  const user = await prismadb.userApiLimit.findUniqueOrThrow({
    where: {
      userEmail: session?.user?.email!,
    },
  });

  if (!user) {
    return NextResponse.redirect("sign-in");
  }

  let messagesFormated;

  // creation
  if (!idSheet) {
    messagesFormated = messages.map((message: any) => {
      if (message.role === "assistant") {
        return message.content;
      }
    });

    // remove undefined (other than assistant messages)
    messagesFormated.filter((message: any) => message !== undefined);

    // get last message (assistant message)
    messagesFormated = Object.values(messagesFormated).pop();
  }

  let oldSheet;

  //update case
  if (idSheet) {
    oldSheet = await prismadb.sheet.findUnique({
      where: {
        id: idSheet,
      },
    });
  }

  const sheet = await prismadb.sheet.upsert({
    create: {
      text: messagesFormated ?? messages,
      level: level,
      subject: subject,
      keywords: keysWords,
      userApiLimitId: user.id,
    },
    update: {
      title: title == "" ? oldSheet?.title : title,
      text: messagesFormated ?? messages,
      level: level,
      subject: subject,
      keywords: keysWords == "" ? oldSheet?.keywords : keysWords,
    },
    where: {
      id: idSheet ?? ".",
    },
  });

  if (!sheet) {
    return NextResponse.json("Error creating sheet");
  }

  return NextResponse.json("Sheet successfully created");
}
