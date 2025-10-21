"use client";
import { SessionProvider } from "next-auth/react";

export const PROVIDERS = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <SessionProvider>{children}</SessionProvider>;
}
