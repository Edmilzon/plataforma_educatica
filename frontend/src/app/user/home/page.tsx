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
      const roles: string[] =
        session.userData.user_role?.map((r: any) => r.role.name) || [];
      if (roles.includes("administrador")) {
        router.push("/admin/users");
      } else {
        router.push("/dashboard");
      }
    }
  }, [session, router]);

  return null;
};
export default HOME;
