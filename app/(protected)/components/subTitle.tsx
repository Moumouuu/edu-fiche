export default function SubTitle({ text }: { text: string }) {
  return (
    <div className="flex justify-center">
      <span className="text-md md:text-lg text-center text-black dark:text-zinc-500 italic w-[70%]">
        {text}
      </span>
    </div>
  );
}
