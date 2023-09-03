"use client";
export default function Title({ text }: { text: string }) {
  return <h1 className="text-2xl md:text-4xl my-2">{text}</h1>;
}
