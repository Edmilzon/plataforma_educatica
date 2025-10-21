"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const HOME = () => {
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
};
export default HOME;
