import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
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

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/user/home/:path*",
    "/user/login",
    "/user/register",
  ],
};
