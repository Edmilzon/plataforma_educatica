import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

// Imports de tu primer archivo
import { VALIDATE_EMAIL_USER, LOGIN_GOOGLE_USER } from "@/app/api/api";
type GoogleProfile = {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

const HANDLER = NextAuth({
  providers: [
    GoogleProvider({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      clientId: process.env.GOOGLE_CLIENT_ID!,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Configuraciones añadidas de tu segundo archivo
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return false;

      try {
        const exists = await VALIDATE_EMAIL_USER({ email: user.email });

        if (!exists?.exists) {
          console.log("Usuario no registrado, creando:", user.email);
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const googleProfile = profile as GoogleProfile | undefined;

          if (!googleProfile) {
            console.error(
              "No se recibió el perfil de Google para el registro.",
            );
            return false; // No se puede registrar sin perfil
          }

          try {
            // Usamos la llamada axios de tu segundo archivo para registrar
            await axios.post("http://localhost:5000/auth/google/signin", {
              email: googleProfile.email,
              name: googleProfile.given_name || googleProfile.name,
              lastname: googleProfile.family_name || "",
              // Nota: Tu segundo archivo no enviaba 'picture',
              // pero podrías añadirlo si tu backend lo acepta:
              // picture: googleProfile.picture,
            });
            console.log("Usuario creado exitosamente:", googleProfile.email);
          } catch (error) {
            console.error("Error al registrar con Google (axios post):", error);
            return false; // Detener el login si falla el registro
          }
        }

        // 3. Loguear al usuario (existente o recién creado)
        // (lógica de tu primer archivo)
        const login_data = await LOGIN_GOOGLE_USER(user.email);

        // Adjuntamos el token y datos del backend al objeto 'user'
        // para que pasen al callback 'jwt'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (user as any).apiToken = login_data.token;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (user as any).apiUser = login_data.user;

        return true; // Login exitoso
      } catch (error) {
        console.error("Error en el callback signIn:", error);
        return false;
      }
    },

    // Callback 'jwt' de tu primer archivo (sin cambios)
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.apiToken = (user as any).apiToken;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.apiUser = (user as any).apiUser;
      }
      return token;
    },

    // Callback 'session' de tu primer archivo (sin cambios)
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
