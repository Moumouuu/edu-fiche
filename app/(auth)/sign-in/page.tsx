import { Metadata } from "next";

import UserAuthForm from "@/components/form/form-auth-user";

export const metadata: Metadata = {
  title: "EduFiche | Autentification ",
  description: "Page d'autentification de l'application EduFiche",
};

export default function AuthenticationPage() {
  return <UserAuthForm />;
}
