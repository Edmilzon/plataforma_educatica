// src/app/user/home/page.tsx
"use client"; // <- esto es obligatorio

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken && session?.userData) {
      sessionStorage.setItem("token", session.accessToken);
      sessionStorage.setItem("user", JSON.stringify(session.userData));

      console.log("Datos guardados en sessionStorage:", {
        token: session.accessToken,
        user: session.userData,
      });
    }
  }, [session]);

  return <div>Bienvenido {session?.userData?.name}</div>;
}
