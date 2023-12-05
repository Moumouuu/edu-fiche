import { Sheet, UserApiLimit } from "@prisma/client";

export type SheetWithAuthor = Sheet & { userApiLimit: UserApiLimit };
