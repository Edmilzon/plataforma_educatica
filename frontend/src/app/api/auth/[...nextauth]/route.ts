import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { VALIDATE_EMAIL_USER, LOGIN_GOOGLE_USER } from "@/app/api/api";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
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
        const loginData = await LOGIN_GOOGLE_USER(user.email);


        (user as any).apiToken = loginData.token;
        (user as any).apiUser = loginData.user;

        return true;
      } catch (error) {
        console.error("Error en login Google API:", error);
        return false;
      }
    },


    async jwt({ token, user }) {
      if (user) {
        token.apiToken = (user as any).apiToken;
        token.apiUser = (user as any).apiUser;
      }
      return token;
    },

 
   async session({ session, token }) {
  // Cast explícito para evitar el error de TS
  session.accessToken = token.apiToken as string | undefined;
  session.userData = token.apiUser as Record<string, any> | undefined;

  return session;
}
  },
});

export { handler as GET, handler as POST };
