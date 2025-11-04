"use client";

import { useState, useRef, useEffect } from "react";
import { CiSquareMore } from "react-icons/ci";
import { createPortal } from "react-dom";

import { UPDATE_ROLE } from "../api/api";

type DropdownMenuProps = {
  userId: string;
  token: string;
  currentRole: string;
  isOpen: boolean;
  onToggle: () => void;
  onRoleUpdated: (userId: string, newRole: string) => void;
};
/* eslint-disable max-lines-per-function*/
const DROPDOWN_MENU = ({
  userId,
  token,
  currentRole,
  isOpen,
  onToggle,
  onRoleUpdated,
}: DropdownMenuProps) => {
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.getElementById("dropdown-menu-${userId}");
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        menuElement &&
        !menuElement.contains(event.target as Node)
      ) {
        onToggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userId, onToggle]);

  const toggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.right + window.scrollX - 160,
      });
    }
    onToggle();
  };

  const handleRoleChange = async (newRole: string) => {
    try {
      const res = await UPDATE_ROLE(token, userId, newRole);
      onRoleUpdated(userId, newRole);
      onToggle();
    } catch (error) {
      console.error("Error al cambiar rol", error);
      alert("Error al actulizar el rol");
    }
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

      {isOpen &&
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
              {[
                "alumno",
                "profesor que inicia el curso",
                "profesor que crea el curso",
                "administrador",
              ].map((role) => (
                <li key={role}>
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 
                        ${role === currentRole ? "text-[#017fb8] cursor-not-allowed" : ""}`}
                    disabled={role === currentRole}
                    onClick={() => {
                      handleRoleChange(role);
                    }}
                  >
                    {role}
                  </button>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
};
export default DROPDOWN_MENU;
