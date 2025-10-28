"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const HOME = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.accessToken && session?.userData) {
      sessionStorage.setItem("token", session.accessToken);
      sessionStorage.setItem("user", JSON.stringify(session.userData));

      console.log("Datos guardados en sessionStorage:", {
        token: session.accessToken,
        user: session.userData,
      });
      router.push("/dashboard");
    }
  }, [session, router]);

  return null;
};
export default HOME;
