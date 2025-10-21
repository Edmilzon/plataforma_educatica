"use client";
import { SessionProvider } from "next-auth/react";

const USER_LAYOUT = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default USER_LAYOUT;
