export default function SubTitle({ text }: { text: string }) {
  return (
    <div className="flex justify-center my-3">
      <span className="text-md md:text-lg text-center text-black dark:text-muted-foreground italic w-[80%]">
        {text}
      </span>
    </div>
  );
}
