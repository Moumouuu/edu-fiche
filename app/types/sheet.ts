import { Sheet, UserApiLimit } from "@prisma/client";

export type SheetWithAuthor = Sheet & { userApiLimit: UserApiLimit };
export type UserLimit = {
  userLimitQuiz: number | undefined;
  userLimitSheet: number | undefined;
};
