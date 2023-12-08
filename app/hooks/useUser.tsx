import { UserApiLimit } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default async function useUser() {
  const [user, setUser] = useState<UserApiLimit | null>(null);

  // fetch user
  const res = await axios.get("/api/account");

  if (res.data) setUser(res.data);
  return user;
}
