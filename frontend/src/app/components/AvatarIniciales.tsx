// components/AvatarIniciales.jsx (o donde lo almacenes)

import React from "react";

const GET_INICIALES = (name: string) => {
  if (!name) return "??";
  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Función auxiliar para generar un color de fondo basado en el nombre (para consistencia)
const GET_BACKGROUND_COLOR = (name: string) => {
  if (!name) return "bg-gray-500";
  const colors = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-green-600",
    "bg-red-600",
    "bg-indigo-600",
    "bg-yellow-600",
    "bg-pink-600",
    "bg-teal-600",
  ];
  const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
  return colors[charCode % colors.length];
};
type AvatarInicialesProps = {
  name?: string;
  size?: "default" | "large";
};
const AVATAR_INICIALES = ({
  name = "??",
  size = "default",
}: AvatarInicialesProps) => {
  const iniciales = GET_INICIALES(name);
  const bgColor = GET_BACKGROUND_COLOR(name);

  const sizeClasses = {
    default: "w-8 h-8 text-base",
    large: "w-12 h-12 text-xl",
  };
  const currentSizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white ${bgColor} ${currentSizeClass}`}
      style={{ minWidth: sizeClasses.default.split(" ")[0] }} // Evita que se encoja
    >
      {iniciales}
    </div>
  );
};

export default AVATAR_INICIALES;
