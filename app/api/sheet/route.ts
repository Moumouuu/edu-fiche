import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { FiltersBar } from "@/actions/getSheetsWithLimit";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  // idSheet is only for update
  const { messages, level, subject, keysWords, idSheet } = await req.json();
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

export async function GET(req: NextRequest) {
  const start = req.nextUrl.searchParams.get("start");
  const end = req.nextUrl.searchParams.get("end");

  const filters: FiltersBar = {
    content: req.nextUrl.searchParams.get("content") ?? "",
    level: req.nextUrl.searchParams.get("level") ?? "",
    subject: req.nextUrl.searchParams.get("subject") ?? "",
  };

  console.log(filters);

  if (!start || !end) {
    return NextResponse.json({ error: "Error getting sheets" });
  }

  //count sheets with filters
  const count = await prismadb.sheet.count({
    where: {
      AND: [
        {
          text: {
            contains: filters.content,
          },
        },
        {
          level: {
            contains: filters.level,
          },
        },
        {
          subject: {
            contains: filters.subject,
          },
        },
      ],
    },
  });

  // get sheets with limit and filters
  const sheets = await prismadb.sheet.findMany({
    include: {
      userApiLimit: true,
    },
    where: {
      AND: [
        {
          text: {
            contains: filters.content,
            mode: "insensitive",
          },
        },
        {
          level: {
            contains: filters.level,
            mode: "insensitive",
          },
        },
        {
          subject: {
            contains: filters.subject,
            mode: "insensitive",
          },
        },
      ],
    },
    skip: Number(start),
    take: Number(end) - Number(start),
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ sheets, totalOfSheets: count });
}
