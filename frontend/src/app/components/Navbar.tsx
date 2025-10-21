"use client";
import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";

const NAVBAR = () => {
  const [is_open, set_is_open] = useState(false);
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const isAuthenticated = status === "authenticated";
  console.log("Session data:", session);
  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white shadow-md">
      <div className="flex justify-between items-center px-4 py-5 md:px-8">
        <button className="md:hidden" onClick={() => set_is_open(!is_open)}>
          {is_open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        <div className="text-2xl font-bold">
          <Link href="/">Python</Link>
        </div>

        {/* --- Navegación escritorio --- */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link className="hover:text-gray-200" href="/contacto">
            Contáctanos
          </Link>
          <Link className="hover:text-gray-200" href="/about">
            Sobre nosotros
          </Link>

          {isAuthenticated ? (
            <>
              <Link className="hover:text-gray-200" href="/biblioteca">
                Biblioteca
              </Link>
              <Link className="hover:text-gray-200" href="/cursos">
                Cursos matriculados
              </Link>
              <button
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white"
                // eslint-disable-next-line @typescript-eslint/naming-convention
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link className="hover:text-gray-200" href="/user/register">
                Registrarse
              </Link>
              <Link
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white"
                href="/user/login"
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </div>

      {/* --- Menú móvil --- */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform ${
          is_open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Menú</h2>
          <button onClick={() => set_is_open(false)}>
            <HiX size={28} />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link href="/contacto" onClick={() => set_is_open(false)}>
              Contáctanos
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => set_is_open(false)}>
              Sobre nosotros
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link href="/biblioteca" onClick={() => set_is_open(false)}>
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link href="/cursos" onClick={() => set_is_open(false)}>
                  Cursos matriculados
                </Link>
              </li>
              <li>
                <button
                  className="bg-red-500 px-4 py-2 rounded text-white text-center block w-full"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    signOut({ callbackUrl: "/" });
                    set_is_open(false);
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/user/register" onClick={() => set_is_open(false)}>
                  Registrarse
                </Link>
              </li>
              <li>
                <Link
                  className="bg-green-500 px-4 py-2 rounded text-white text-center block"
                  href="/user/login"
                  onClick={() => set_is_open(false)}
                >
                  Iniciar sesión
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NAVBAR;
