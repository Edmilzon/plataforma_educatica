import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userData?: {
      name?: string;
      email?: string;
      [key: string]: any;
    };
  }

  interface User {
    accessToken?: string;
    userData?: {
      name?: string;
      email?: string;
      [key: string]: any;
    };
  }
  
}
