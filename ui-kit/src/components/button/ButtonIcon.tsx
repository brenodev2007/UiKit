import React from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
type IconPosition = "left" | "right";
type Rounded = "sm" | "md" | "lg" | "full";

interface ButtonIconProps {
  children?: React.ReactNode;
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
}

export default function ButtonIcon({
  children,
  icon,
  variant = "primary",
  size = "md",
  type = "button",
  iconPosition = "left",
  text,
  rounded = "md",
  disabled = false,
  fullWidth = false,
  className = "",
}: ButtonIconProps) {
  const baseClasses =
    "font-semibold transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm px-3 py-1.5 gap-1.5",
    md: "text-base px-4 py-2 gap-2",
    lg: "text-lg px-6 py-3 gap-3",
  };

  const roundedStyles: Record<Rounded, string> = {
    sm: "rounded",
    md: "rounded-xl",
    lg: "rounded-2xl",
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
    iconPosition === "left" ? "order-first" : "order-last"
  }`;

  // Determinar o conteúdo textual do botão
  const buttonContent = children || text;

  return (
    <button
      type={type}
      disabled={disabled}
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
      {buttonContent && <span>{buttonContent}</span>}
      {iconPosition === "right" && <span className={iconClasses}>{icon}</span>}
    </button>
  );
}
