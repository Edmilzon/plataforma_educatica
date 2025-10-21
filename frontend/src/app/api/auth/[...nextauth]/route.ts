import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { VALIDATE_EMAIL_USER, LOGIN_GOOGLE_USER } from "@/app/api/api";

const HANDLER = NextAuth({
  providers: [
    GoogleProvider({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      clientId: process.env.GOOGLE_CLIENT_ID!,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const exists = await VALIDATE_EMAIL_USER({ email: user.email });
      if (!exists?.exists) {
        console.log("Usuario no registrado:", user.email);
        return "/user/register";
      }

      try {
        const login_data = await LOGIN_GOOGLE_USER(user.email);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (user as any).apiToken = login_data.token;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (user as any).apiUser = login_data.user;

        return true;
      } catch (error) {
        console.error("Error en login Google API:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.apiToken = (user as any).apiToken;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.apiUser = (user as any).apiUser;
      }
      return token;
    },

    async session({ session, token }) {
      // Cast explícito para evitar el error de TS
      session.accessToken = token.apiToken as string | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.userData = token.apiUser as Record<string, any> | undefined;

      return session;
    },
  },
});

export { HANDLER as GET, HANDLER as POST };
