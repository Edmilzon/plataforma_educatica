import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

type GoogleProfile = {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const googleProfile = profile as GoogleProfile;

        try {
          await axios.post("http://localhost:5000/auth/google/signin", {
            email: googleProfile.email,
            name: googleProfile.given_name || googleProfile.name,
            lastname: googleProfile.family_name || "",
          });
        } catch (error) {
          console.error("Error al registrar con Google:", error);
        }

        token.user = {
          email: googleProfile.email,
          name: googleProfile.given_name || googleProfile.name,
          lastname: googleProfile.family_name || "",
          picture: googleProfile.picture,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
