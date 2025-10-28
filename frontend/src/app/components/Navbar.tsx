"use client";
import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX, HiSearch, HiChevronDown } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";
/* eslint-disable max-lines-per-function, complexity */

const NANBAR = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const explorarItems = [
    { label: "Cursos", href: "/explorar/cursos" },
    { label: "Autores", href: "/explorar/autores" },
    { label: "Categorías", href: "/explorar/categorias" },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link className="text-2xl font-bold text-blue-800" href="/">
          Python
        </Link>

        {/* Buscador escritorio */}
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
          {/* Explorar Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 hover:text-blue-600 transition"
              onClick={() => setIsExploreOpen(!isExploreOpen)}
            >
              <span>Explorar</span>
              <HiChevronDown size={18} />
            </button>

            {isExploreOpen && (
              <ul className="absolute mt-2 bg-white shadow-lg rounded-md w-40 py-2 z-50">
                {explorarItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      className="block px-4 py-2 hover:bg-blue-100 transition"
                      href={item.href}
                      onClick={() => setIsExploreOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
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
              <button
                className="bg-[#d40d48] hover:bg-[#ff005a] px-4 py-2 rounded-full text-white transition cursor-pointer"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  sessionStorage.clear();
                }}
              >
                Cerrar sesión
              </button>
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

        {/* Botón menú móvil */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out p-6 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-800">Menú</h2>
          <button onClick={() => setIsOpen(false)}>
            <HiX size={28} />
          </button>
        </div>

        {/* Buscador móvil */}
        <div className="mb-6 relative">
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

        <ul className="flex flex-col space-y-4">
          {/* Explorar */}
          <li>
            <button
              className="flex items-center justify-between w-full px-4 py-2 border rounded hover:bg-blue-50 transition"
              onClick={() => setIsExploreOpen(!isExploreOpen)}
            >
              Explorar
              <HiChevronDown />
            </button>
            {isExploreOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                {explorarItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      className="block px-2 py-1 hover:bg-blue-100 rounded transition"
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        setIsExploreOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="/contacto" onClick={() => setIsOpen(false)}>
              Contáctanos
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              Sobre nosotros
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link href="/biblioteca" onClick={() => setIsOpen(false)}>
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link href="/cursos" onClick={() => setIsOpen(false)}>
                  Cursos
                </Link>
              </li>
              <li>
                <button
                  className="bg-red-500 px-4 py-2 rounded-full text-white w-full transition"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    sessionStorage.clear();
                    setIsOpen(false);
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/user/register" onClick={() => setIsOpen(false)}>
                  Registrarse
                </Link>
              </li>
              <li>
                <Link
                  className="bg-green-500 px-4 py-2 rounded-full text-white w-full text-center transition"
                  href="/user/login"
                  onClick={() => setIsOpen(false)}
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

export default NANBAR;
