"use client";

import { cn } from "@/lib/utils";

export default function Title({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <h1 className={cn(className, "text-2xl md:text-4xl my-2 font-medium")}>{text}</h1>;
}
