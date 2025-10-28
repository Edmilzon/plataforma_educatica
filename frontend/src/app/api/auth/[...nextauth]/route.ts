import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { VALIDATE_EMAIL_USER, LOGIN_GOOGLE_USER, LOGIN_USER } from "@/app/api/api";

type GoogleProfile = {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

const HANDLER = NextAuth({
  providers: [
    // -------------------
    // LOGIN MANUAL (email + password)
    // -------------------
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "correo@dominio.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          // Usamos tu helper LOGIN_USER de api.ts
          const data = await LOGIN_USER({
            email: credentials.email,
            password: credentials.password,
          });

          if (!data?.token || !data?.user) return null;

          return {
            id: data.user.uuid_user,
            name: data.user.name,
            email: data.user.email,
            lastname: data.user.lastname,
            role: data.user.role,
            apiToken: data.token,
            apiUser: data.user,
          };
        } catch (err) {
          console.error("Error en login manual:", err);
          return null;
        }
      },
    }),

    // -------------------
    // LOGIN CON GOOGLE
    // -------------------
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    // -------------------
    // SignIn callback
    // -------------------
    async signIn({ user, account, profile }) {
      // Google login
      if (account?.provider === "google") {
        if (!user.email) return false;

        try {
          const exists = await VALIDATE_EMAIL_USER({ email: user.email });

          if (!exists?.exists) {
            const googleProfile = profile as GoogleProfile | undefined;
            if (!googleProfile) return false;

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/signin`, {
              email: googleProfile.email,
              name: googleProfile.given_name || googleProfile.name,
              lastname: googleProfile.family_name || "",
            });
          }

          const login_data = await LOGIN_GOOGLE_USER(user.email);
          (user as any).apiToken = login_data.token;
          (user as any).apiUser = login_data.user;

          return true;
        } catch (error) {
          console.error("Error en signIn con Google:", error);
          return false;
        }
      }

      // Credentials login → pasar sin cambios
      return true;
    },

    // -------------------
    // JWT callback
    // -------------------
    async jwt({ token, user }) {
      if (user) {
        token.apiToken = (user as any).apiToken;
        token.apiUser = (user as any).apiUser;
      }
      return token;
    },

    // -------------------
    // Session callback
    // -------------------
    async session({ session, token }) {
      session.accessToken = token.apiToken as string | undefined;
      session.userData = token.apiUser as Record<string, any> | undefined;
      return session;
    },
  },

  pages: {
    signIn: "/user/login",
  },
});

export { HANDLER as GET, HANDLER as POST };
