import React from "react";
import { motion } from "framer-motion";

interface AvatarProps {
  src?: string; // URL da imagem
  name?: string; // Nome para pegar inicial
  size?: "sm" | "md" | "lg"; // Tamanhos
  rounded?: "sm" | "md" | "lg" | "full"; // Personalização do arredondamento
  className?: string; // Classe extra
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
};

const roundedClasses = {
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "U",
  size = "md",
  rounded = "full",
  className = "",
}) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <motion.div
      className={`
        flex items-center justify-center 
        bg-gradient-to-r from-blue-500 to-indigo-600 
        text-white font-semibold select-none 
        shadow-md overflow-hidden
        ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className={`object-cover w-full h-full ${roundedClasses[rounded]}`}
        />
      ) : (
        <span>{initial}</span>
      )}
    </motion.div>
  );
};
