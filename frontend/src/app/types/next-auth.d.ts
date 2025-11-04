import "next-auth";
/* eslint-disable @typescript-eslint/consistent-type-definitions */
type UserRole = {
  role: {
    name: string;
  };
};

export type UserData = {
  uuid_user: string;
  email: string;
  name: string;
  lastname: string;
  isConfirmed: boolean;
  user_role?: UserRole[];
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData?: any;
  }

  interface User {
    accessToken?: string;
    userData?: UserData;
  }
}
