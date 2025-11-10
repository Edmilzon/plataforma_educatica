"use client";
import { useState, useRef, useEffect } from "react";
import {
  HiChevronDown,
  HiUserCircle,
  HiLogout,
  HiCog,
  HiArrowLeft,
} from "react-icons/hi";
import { signOut } from "next-auth/react";
import Link from "next/link";

import AvatarIniciales from "./AvatarIniciales";

type UserMenuProps = {
  name?: string;
  email?: string;
  isMobileMode?: boolean;
  onCloseMobile?: () => void;
};
/* eslint-disable max-lines-per-function, complexity */
const USER_MENU: React.FC<UserMenuProps> = ({
  name,
  email,
  isMobileMode = false,
  onCloseMobile,
}) => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(isMobileMode);
  const [view, setView] = useState<"main" | "cuenta">("main");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileMode) {
      setDrawerOpen(true);
    }
  }, [isMobileMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isMobileMode &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMode]);

  const handleToggle = () => {
    if (!isMobileMode) {
      setOpen(!open);
    }
  };

  const getFirstName = (fullName?: string) => {
    if (!fullName) return "Usuario";
    return fullName.split(" ")[0];
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setView("main");
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {!isMobileMode && (
        <button
          className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200"
          onClick={handleToggle}
        >
          <HiUserCircle className="text-blue-700" size={22} />
          <span className="text-gray-700 font-medium text-sm truncate max-w-[100px]">
            {name}
          </span>
          <HiChevronDown
            className={`text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            size={18}
          />
        </button>
      )}

      {open && !isMobileMode && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 transition-all duration-200 ease-out"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>

          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link
                className="flex items-center px-4 py-2 hover:bg-blue-50 transition"
                href="/perfil"
                onClick={() => setOpen(false)}
              >
                <HiUserCircle className="mr-2 text-blue-600" /> Mi perfil
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center px-4 py-2 hover:bg-blue-50 transition"
                href="/admin/users"
                onClick={() => setOpen(false)}
              >
                <HiCog className="mr-2 text-blue-600" /> Administración de
                Usuarios
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center px-4 py-2 hover:bg-blue-50 transition"
                href="/admin/curso"
                onClick={() => setOpen(false)}
              >
                <HiCog className="mr-2 text-blue-600" /> Administración de
                cursos
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center px-4 py-2 hover:bg-blue-50 transition"
                href="/configuracion"
                onClick={() => setOpen(false)}
              >
                <HiCog className="mr-2 text-blue-600" /> Configuración
              </Link>
            </li>
          </ul>

          <div className="border-t border-gray-100">
            <button
              className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <HiLogout className="mr-2" /> Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {drawerOpen && isMobileMode && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40">
          <div className="fixed top-0 left-0 h-full w-[80%] bg-white z-50 flex flex-col animate-slide-right shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              {view === "cuenta" ? (
                <button
                  className="flex items-center text-blue-700"
                  onClick={() => setView("main")}
                >
                  <HiArrowLeft className="mr-2" /> Atrás
                </button>
              ) : (
                <button
                  className="flex items-center space-x-3 w-full"
                  onClick={() => setView("cuenta")}
                >
                  <div className="relative">
                    <AvatarIniciales name={name} size="large" />
                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-purple-500"></span>
                  </div>

                  <div className="flex flex-col text-left">
                    <p className="text-lg font-semibold text-gray-800">
                      Hola, {getFirstName(name)}
                    </p>
                    <p className="text-sm text-gray-500">¡Hola de nuevo!</p>
                  </div>

                  <HiChevronDown
                    className="text-gray-500 transform -rotate-90 ml-auto"
                    size={24}
                  />
                </button>
              )}
              <button
                className="text-gray-600 absolute top-4 right-4"
                onClick={handleCloseDrawer}
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {view === "main" && (
                <div className="space-y-4">
                  <button
                    className="w-full text-left font-medium text-gray-800 hover:text-blue-600"
                    onClick={() => setView("cuenta")}
                  >
                    Mi cuenta
                  </button>
                  <Link
                    className="block font-medium text-gray-800 hover:text-blue-600"
                    href="/explorar"
                    onClick={handleCloseDrawer}
                  >
                    principal
                  </Link>
                  <Link
                    className="block font-medium text-gray-800 hover:text-blue-600"
                    href="/admin/curso"
                    onClick={handleCloseDrawer}
                  >
                    Administración de cursos
                  </Link>
                  <Link
                    className="block font-medium text-gray-800 hover:text-blue-600"
                    href="/admin/users"
                    onClick={handleCloseDrawer}
                  >
                    Administración de Usuarios
                  </Link>
                </div>
              )}

              {view === "cuenta" && (
                <div className="space-y-4">
                  <Link
                    className="block text-gray-800 hover:text-blue-600"
                    href="/perfil"
                    onClick={handleCloseDrawer}
                  >
                    Mi perfil
                  </Link>
                  <Link
                    className="block text-gray-800 hover:text-blue-600"
                    href="/configuracion"
                    onClick={handleCloseDrawer}
                  >
                    Configuración
                  </Link>
                  <button
                    className="block text-red-600 mt-6"
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      handleCloseDrawer();
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-right {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-right {
          animation: slide-right 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default USER_MENU;
