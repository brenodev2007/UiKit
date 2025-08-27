import React from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
type IconPosition = "left" | "right";
type Rounded = "sm" | "md" | "lg" | "full";

interface ButtonIconProps {
  icon: React.ReactElement | string;
  text?: string;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit" | "reset";
  iconPosition?: IconPosition;
  rounded?: Rounded;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function ButtonIcon({
  icon,
  text,
  variant = "primary",
  size = "md",
  type = "button",
  iconPosition = "left",
  rounded = "md",
  disabled = false,
  fullWidth = false,
  className = "",
  ariaLabel,
}: ButtonIconProps) {
  const baseClasses =
    "font-semibold transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-95 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 active:scale-95 focus:ring-gray-400 dark:border-gray-600 dark:text-gray-200",
    ghost:
      "text-gray-700 hover:bg-gray-100 active:scale-95 focus:ring-gray-400 dark:text-gray-200 dark:hover:bg-gray-700",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:scale-95 focus:ring-red-500 dark:bg-red-500",
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm px-3 py-1.5 gap-1.5",
    md: "text-base px-4 py-2 gap-2",
    lg: "text-lg px-6 py-3 gap-3",
  };

  const roundedStyles: Record<Rounded, string> = {
    sm: "rounded",
    md: "rounded-lg", // padronizei igual ao Button
    lg: "rounded-xl",
    full: "rounded-full",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";
  const widthStyle = fullWidth ? "w-full" : "";

  const iconSizes: Record<Size, string> = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  const iconClasses = `${iconSizes[size]} flex-shrink-0 ${
    iconPosition === "left" ? "order-first mr-2" : "order-last ml-2"
  }`;

  return (
    <motion.button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={text ? undefined : ariaLabel}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${roundedStyles[rounded]}
        ${disabled ? disabledStyles : ""}
        ${widthStyle}
        ${className}
      `}
    >
      {iconPosition === "left" && <span className={iconClasses}>{icon}</span>}
      {text && <span>{text}</span>}
      {iconPosition === "right" && <span className={iconClasses}>{icon}</span>}
    </motion.button>
  );
}
