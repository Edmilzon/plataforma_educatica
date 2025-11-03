"use client";

import { useState, useRef, useEffect } from "react";
import { CiSquareMore } from "react-icons/ci";
import { createPortal } from "react-dom";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.right + window.scrollX - 160,
      });
    }
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* Botón */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        ref={buttonRef}
        onClick={toggleMenu}
      >
        <CiSquareMore size={24} />
      </button>

      {open &&
        createPortal(
          <div
            className="absolute z-[9999] w-44 bg-white border border-gray-200 rounded-xl shadow-lg animate-fade-in"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            <ul className="flex flex-col text-sm text-gray-700">
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                  onClick={() => {
                    alert("Admin seleccionado");
                    setOpen(false);
                  }}
                >
                  Admin
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                  onClick={() => {
                    alert("Estudiante seleccionado");
                    setOpen(false);
                  }}
                >
                  Estudiante
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    alert("Docente Editor seleccionado");
                    setOpen(false);
                  }}
                >
                  Docente Editor
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl"
                  onClick={() => {
                    alert("Docente Ejecutador seleccionado");
                    setOpen(false);
                  }}
                >
                  Docente Ejecutador
                </button>
              </li>
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
}
