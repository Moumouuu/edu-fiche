"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "./ui/separator";

import { AiFillGoogleCircle } from "react-icons/ai";

import { signIn } from "next-auth/react";

export default function UserAuthForm() {
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
            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="johndoe@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mot de passe..."
              />
            </div>
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

          <CardFooter>
            <Button variant={"premium"} className="w-full">
              Connexion
            </Button>
          </CardFooter>
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
            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="johndoe@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwordRegister">Mot de passe</Label>
              <Input
                id="passwordRegister"
                type="password"
                placeholder="Mot de passe..."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={"premium"}>
              Inscription
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
