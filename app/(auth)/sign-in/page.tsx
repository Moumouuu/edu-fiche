import { Metadata } from "next";

import UserAuthForm from "@/components/user-auth-form";

export const metadata: Metadata = {
  title: "EduFiche | Authentication",
  description: "Page d'autentification de l'application EduFiche",
};

export default function AuthenticationPage() {
  return <UserAuthForm />;
}
