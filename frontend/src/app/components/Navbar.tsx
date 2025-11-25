"use client";
import { useState } from "react";
import Link from "next/link";
// Importamos HiMenu y HiX para el botón del menú
import { HiMenu, HiX, HiSearch, HiChevronDown } from "react-icons/hi";
import { useSession } from "next-auth/react";

import UserMenu from "./UserMenu";
/* eslint-disable max-lines-per-function, complexity */

const NANBAR = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla el menú móvil
  const [isExploreOpen, setIsExploreOpen] = useState(false); // Controla el dropdown de Explorar
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold text-blue-800" href="/">
          Python
        </Link>
        <div className="hidden md:flex flex-1 mx-4 relative">
          <HiSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={20}
          />
          <input
            className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Buscar cursos..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Navegación escritorio */}
        <div className="hidden md:flex items-center space-x-6 relative">
          <div className="relative">
            <button
              className="flex items-center space-x-1 hover:text-blue-600 transition"
              onClick={() => setIsExploreOpen(!isExploreOpen)}
            >
              <span>Explorar</span>
              <HiChevronDown size={18} />
            </button>
          </div>
          <Link className="hover:text-blue-600 transition" href="/contacto">
            Contáctanos
          </Link>
          <Link className="hover:text-blue-600 transition" href="/about">
            Sobre nosotros
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                className="hover:text-blue-600 transition"
                href="/biblioteca"
              >
                Biblioteca
              </Link>
              <Link className="hover:text-blue-600 transition" href="/cursos">
                Cursos
              </Link>
              {/* UserMenu en escritorio se muestra como botón desplegable normal */}
              <UserMenu
                email={session?.user?.email || "sincorreo@example.com"}
                isMobileMode={false}
                name={session?.user?.name || "Usuario"}
                onCloseMobile={closeMobileMenu}
              />
            </>
          ) : (
            <>
              <Link
                className="hover:text-blue-600 transition"
                href="/user/register"
              >
                Registrarse
              </Link>
              <Link
                className="bg-[#19a2b6] hover:bg-[#19a2b6] px-4 py-2 rounded-full text-white transition"
                href="/user/login"
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          ></div>
          {isAuthenticated ? (
            <UserMenu
              email={session?.user?.email || "sincorreo@example.com"}
              isMobileMode={true}
              name={session?.user?.name || "Usuario"}
              onCloseMobile={closeMobileMenu}
            />
          ) : (
            <div
              className={`fixed top-0 left-0 h-full bg-white z-50 shadow-xl transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out w-4/5 max-w-sm p-6 flex flex-col`}
            >
              {/* Header menú */}

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-800">Menú</h2>
                <button onClick={closeMobileMenu}>
                  <HiX
                    className="text-gray-700 hover:text-red-500 transition"
                    size={28}
                  />
                </button>
              </div>
              <ul className="flex flex-col space-y-4 text-gray-700">
                <li>
                  <Link
                    className="hover:text-blue-600 transition"
                    href="/contacto"
                    onClick={closeMobileMenu}
                  >
                    Contáctanos
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-blue-600 transition"
                    href="/about"
                    onClick={closeMobileMenu}
                  >
                    Sobre nosotros
                  </Link>
                </li>

                {/* Botones de Auth */}
                <li>
                  <Link
                    className="block hover:text-blue-600 transition"
                    href="/user/register"
                    onClick={closeMobileMenu}
                  >
                    Registrarse
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-[#19a2b6] px-4 py-2 rounded-full text-white w-full text-center transition hover:bg-[#19a2b6]/90 block"
                    href="/user/login"
                    onClick={closeMobileMenu}
                  >
                    Iniciar sesión
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default NANBAR;
