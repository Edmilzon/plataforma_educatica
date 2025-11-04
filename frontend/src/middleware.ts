import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
/* eslint-disable  complexity */

type AuthToken = {
  roles?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as AuthToken;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
    const path = req.nextUrl.pathname;

    //rutas publicas
    const isPublicPage =
      path.startsWith("/user/login") || path.startsWith("/user/register");

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (isAuth && isPublicPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!isAuth && (isAdminPage || isDashboardPage)) {
      return NextResponse.redirect(
        new URL(`/user/login?callbackURL=${req.nextUrl.pathname}`, req.url),
      );
    }

    if (isAuth && isAdminPage) {
      const roles: string[] = token.roles || [];
      console.log("Roles del usuario:", roles);
      if (!roles.includes("administrador")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const CONFIG = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/user/home/:path*",
    "/user/login",
    "/user/register",
  ],
};
