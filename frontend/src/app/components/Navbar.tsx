
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white shadow-md">
      <div className="flex justify-between items-center px-4 py-5 md:px-8">
           <button
             className="md:hidden"
               onClick={() => setIsOpen(!isOpen)}
            >
               {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        <div className="text-2xl font-bold"> 
          <Link href="/">Python</Link>
        </div>

       
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/contacto" className="hover:text-gray-200">
            Contáctanos
          </Link>
          <Link href="/about" className="hover:text-gray-200">
            Sobre nosotros
          </Link>
          <Link href="/user/register" className="hover:text-gray-200">
            Registrarse
          </Link>
          <Link
            href="/user/login"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white"
          >
            Iniciar sesión
          </Link>
        </div>

      </div>

      
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Menú</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
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
          <li>
            <Link href="/user/register" onClick={() => setIsOpen(false)}>
              Registrarse
            </Link>
          </li>
          <li>
            <Link
              href="/user/login"
              className="bg-green-500 px-4 py-2 rounded text-white text-center block"
              onClick={() => setIsOpen(false)}
            >
              Iniciar sesión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
