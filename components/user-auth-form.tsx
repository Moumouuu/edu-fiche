"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import z from "zod";
import { Separator } from "./ui/separator";

import { signIn } from "next-auth/react";
import { AiFillGoogleCircle } from "react-icons/ai";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function UserAuthForm() {
  const router = useRouter();
  const schemaLogin = z.object({
    email: z
      .string()
      .email("L'adresse e-mail n'est pas valide. Veuillez réessayer."),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  });

  const schemaRegister = z.object({
    email: z
      .string()
      .email("L'adresse e-mail n'est pas valide. Veuillez réessayer."),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  });

  type FormValuesLogin = z.infer<typeof schemaLogin>;
  type FormValuesRegister = z.infer<typeof schemaRegister>;

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<FormValuesLogin>({
    resolver: zodResolver(schemaLogin),
  });

  const {
    handleSubmit: handleSubmitRegister,
    register: registerRegister,
    formState: { errors: errorsRegister, isLoading: isLoadingRegister },
  } = useForm<FormValuesRegister>({
    resolver: zodResolver(schemaRegister),
  });

  const onSubmitLogin = async (data: FormValuesLogin) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (res?.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log("[LOGIN_ERROR]" + err);
    }
  };

  const onSubmitRegister = async (data: FormValuesRegister) => {
    console.log(data.email);
    try {
      const res = await axios.post("/api/account", data);
      console.log(res);
    } catch (err) {
      console.log("[REGISTER_ERROR]" + err);
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-in">Sign-in</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder à l&apos;application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mot de passe..."
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button
                disabled={isLoading}
                variant={"premium"}
                className="w-full mt-4"
              >
                Connexion
              </Button>
            </form>
          </CardContent>

          <Separator />

          <div className="flex justify-center w-full my-5">
            <Button
              variant={"outline"}
              onClick={() => {
                signIn("google");
              }}
            >
              <AiFillGoogleCircle size={30} />
              <span className="ml-2">Sign-in with Google</span>
            </Button>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
            <CardDescription>
              Créer un compte pour accéder à l&apos;application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...registerRegister("email")}
                />
                {errorsRegister.email && (
                  <span className="text-red-500 text-sm">
                    {errorsRegister.email.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="passwordRegister">Mot de passe</Label>
                <Input
                  id="passwordRegister"
                  type="password"
                  placeholder="Mot de passe..."
                  {...registerRegister("password")}
                />
                {errorsRegister.password && (
                  <span className="text-red-500 text-sm">
                    {errorsRegister.password.message}
                  </span>
                )}
              </div>
              <Button
                disabled={isLoading}
                className="w-full mt-4"
                variant={"premium"}
              >
                Inscription
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
