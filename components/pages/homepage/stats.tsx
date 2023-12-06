import GridPattern from "@/components/magicui/grid-pattern";
import prismadb from "@/lib/prismadb";
import { cn } from "@/lib/utils";
import NumberTicker from "../../magicui/number-ticket";

const Stats = async () => {
  const numberOfUsers = await prismadb.userApiLimit.count();
  const numberOfSheet = await prismadb.sheet.count();

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background px-2 py-20 lg:p-20 shadow-2xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white flex flex-col">
        <span className="uppercase text-6xl font-bold bg-gradient-to-b from-green-400 to-blue-600 bg-clip-text text-transparent">
          Merci !
        </span>
        <span className="text-4xl mt-5">
          Vous êtes plus de{" "}
          <NumberTicker
            className="inline bg-gradient-to-b from-green-400 to-blue-600 bg-clip-text text-transparent"
            value={numberOfUsers}
          />{" "}
          à utiliser EduFiche !
          <br />
          Et vous avez généré plus de{" "}
          <NumberTicker
            className="inline bg-gradient-to-b from-green-400 to-blue-600 bg-clip-text text-transparent"
            value={numberOfSheet}
          />{" "}
          fiches de révision !
        </span>
      </p>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
};

export default Stats;
