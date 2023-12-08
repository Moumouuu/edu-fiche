import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function LoadingCard() {
  return (
    <div className="flex flex-col justify-center">
      <Skeleton className="m-4 h-80 w-[90%] rounded-lg" />
      <Skeleton className="m-4 h-80 w-[90%] rounded-lg" />
      <Skeleton className="m-4 h-80 w-[90%] rounded-lg" />
      <Skeleton className="m-4 h-80 w-[90%] rounded-lg" />
    </div>
  );
}
