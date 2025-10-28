import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const protectedRoutes = ['/dashboard'] // Puedes agregar más
  const authRoutes = ['/login', '/register']

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  const isAuthRoute = authRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  // Si no tiene token y va a una ruta protegida → al login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Si tiene token y quiere ir al login o register → al dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*', // protege dashboard
    '/login',
    '/register',
  ],
}
