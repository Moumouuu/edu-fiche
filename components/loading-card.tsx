export default function LoadingCard() {
  return (
    <div className="grid auto-rows-[400px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`animate-pulse row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 ${
            i % 4 === 0 && "col-span-2"
          }`}
        ></div>
      ))}
    </div>
  );
}
