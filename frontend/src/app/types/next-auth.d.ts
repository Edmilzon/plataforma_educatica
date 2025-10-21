// src/app/types/next-auth.d.ts
//import NextAuth from "next-auth";

declare module "next-auth" {
  type Session = {
    accessToken?: string;
    userData?: {
      name?: string;
      email?: string;
      [key: string]: unknown;
    };
  };

  type User = {
    accessToken?: string;
    userData?: {
      name?: string;
      email?: string;
      [key: string]: unknown;
    };
  };
}
