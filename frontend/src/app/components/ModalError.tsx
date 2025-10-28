"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";

type ToastProps = {
  message: string;
  type?: "error" | "success" | "warning" | "info";
  onClose: () => void;
  duration?: number;
};
/* eslint-disable max-lines-per-function*/
const TOAST = ({
  message,
  type = "info",
  onClose,
  duration = 8000,
}: ToastProps) => {
  // Auto-cierre después del tiempo definido
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  // Estilos según el tipo
  const styles = {
    error: {
      icon: <AiOutlineCloseCircle className="text-red-500 w-6 h-6" />,
      bg: "bg-red-50 border-red-300",
      border: "border-red-300",
    },
    success: {
      icon: <AiOutlineCheckCircle className="text-green-500 w-6 h-6" />,
      bg: "bg-green-50 border-green-200",
      border: "border-green-200",
    },
    warning: {
      icon: <AiOutlineWarning className="text-yellow-500 w-6 h-6" />,
      bg: "bg-yellow-50 border-yellow-200",
      border: "border-yellow-200",
    },
    info: {
      icon: <AiOutlineInfoCircle className="text-red-500 w-6 h-6" />,
      bg: "bg-blue-50 border-blue-200",
      border: "border-blue-200",
    },
  };

  const { icon, bg, border } = styles[type];

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className={`fixed top-5 right-5 z-50 ${bg} ${border} shadow-lg rounded-xl p-4 flex items-center space-x-3 text-sm w-[90%] sm:w-[22rem] md:w-[24rem] lg:w-[26rem]`}
        exit={{ opacity: 0, x: 100 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {/* Ícono */}
        <div>{icon}</div>

        {/* Mensaje */}
        <p className="text-gray-800 font-medium flex-1 break-words">
          {message}
        </p>

        {/* Botón de cierre */}
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors text-lg"
          onClick={onClose}
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
export default TOAST;
