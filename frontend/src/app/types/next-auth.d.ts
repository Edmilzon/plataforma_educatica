import "next-auth";
/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userData?: {
      name?: string;
      email?: string;
      [key: string]: unknown;
    };
  }

  interface User {
    accessToken?: string;
    userData?: {
      name?: string;
      email?: string;
      [key: string]: unknown;
    };
  }
}
