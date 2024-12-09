"use server";
import { signIn } from "next-auth/react";

export async function authenticate(loginkey: string, password: string) {
  const r = await signIn("credentials", {
    loginkey: loginkey,
    password: password,
    redirect: true,
    callbackUrl: "/",
  });
  return r;
}
