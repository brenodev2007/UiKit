import React from "react";
import { motion } from "framer-motion";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Rounded = "none" | "sm" | "md" | "lg" | "full";
type Shadow = "none" | "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit" | "reset";
  rounded?: Rounded;
  shadow?: Shadow;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  rounded = "md",
  shadow = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  onClick,
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const base =
    "font-semibold transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 focus:ring-blue-500 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-95 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95 focus:ring-gray-400 active:bg-gray-100 dark:border-gray-600 dark:text-gray-200",
    ghost:
      "text-gray-700 hover:bg-gray-100 active:scale-95 focus:ring-gray-400 dark:text-gray-200 dark:hover:bg-gray-700",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:scale-95 focus:ring-red-500 active:bg-red-800 dark:bg-red-500",
    success:
      "bg-green-600 text-white hover:bg-green-700 active:scale-95 focus:ring-green-500 active:bg-green-800 dark:bg-green-500",
  };

  const sizes: Record<Size, string> = {
    xs: "text-xs px-2.5 py-1.5",
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-2.5",
    lg: "text-lg px-5 py-3",
    xl: "text-xl px-6 py-3.5",
  };

  const roundedStyles: Record<Rounded, string> = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  };

  const shadowStyles: Record<Shadow, string> = {
    none: "shadow-none",
    sm: "shadow-sm hover:shadow",
    md: "shadow-md hover:shadow-lg",
    lg: "shadow-lg hover:shadow-xl",
    xl: "shadow-xl hover:shadow-2xl",
  };

  const iconSizes: Record<Size, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const disabledStyles = "opacity-60 cursor-not-allowed";
  const loadingStyles = "cursor-wait";
  const widthStyle = fullWidth ? "w-full" : "";

  const iconClasses = `${iconSizes[size]} flex-shrink-0 ${
    iconPosition === "left" ? "mr-2" : "ml-2"
  }`;

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      aria-disabled={disabled}
      aria-busy={loading}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${roundedStyles[rounded]}
        ${shadowStyles[shadow]}
        ${disabled ? disabledStyles : ""}
        ${loading ? loadingStyles : ""}
        ${widthStyle}
        ${className}
        relative
      `}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}

      <span
        className={`flex items-center transition-opacity ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {icon && iconPosition === "left" && (
          <span className={iconClasses}>{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className={iconClasses}>{icon}</span>
        )}
      </span>
    </motion.button>
  );
}
