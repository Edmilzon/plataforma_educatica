import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const HANDLER = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { HANDLER as GET, HANDLER as POST };
