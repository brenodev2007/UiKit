import React from "react";

export interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "danger" | "warning" | "neutral";
  label?: React.ReactNode;
  labelPosition?: "left" | "right";
  withIcons?: boolean;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  className?: string;
  name?: string;
  value?: string;
}

export default function Toggle({
  checked = false,
  disabled = false,
  onChange,
  size = "md",
  variant = "primary",
  label,
  labelPosition = "right",
  withIcons = false,
  onIcon = "✓",
  offIcon = "✕",
  className = "",
  name,
  value,
}: ToggleProps) {
  const handleChange = () => {
    if (!disabled) onChange?.(!checked);
  };

  // Configurações de tamanho
  const sizeStyles = {
    sm: {
      container: "w-10 h-5",
      thumb: "w-4 h-4",
      translate: "translate-x-5",
      icon: "text-xs",
    },
    md: {
      container: "w-14 h-7",
      thumb: "w-6 h-6",
      translate: "translate-x-7",
      icon: "text-sm",
    },
    lg: {
      container: "w-16 h-8",
      thumb: "w-7 h-7",
      translate: "translate-x-8",
      icon: "text-base",
    },
  };

  // Variantes de cores
  const variantStyles = {
    primary: {
      on: "bg-blue-600",
      off: "bg-gray-300",
      thumb: "bg-white",
      icon: "text-white",
    },
    success: {
      on: "bg-green-600",
      off: "bg-gray-300",
      thumb: "bg-white",
      icon: "text-white",
    },
    danger: {
      on: "bg-red-600",
      off: "bg-gray-300",
      thumb: "bg-white",
      icon: "text-white",
    },
    warning: {
      on: "bg-yellow-500",
      off: "bg-gray-300",
      thumb: "bg-white",
      icon: "text-white",
    },
    neutral: {
      on: "bg-gray-600",
      off: "bg-gray-300",
      thumb: "bg-white",
      icon: "text-white",
    },
  };

  const currentVariant = variantStyles[variant];

  const LabelComponent = label ? (
    <span
      className={`font-medium ${sizeStyles[size].icon} ${
        disabled ? "text-gray-400" : "text-gray-700"
      } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleChange}
    >
      {label}
    </span>
  ) : null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && labelPosition === "left" && LabelComponent}

      <div
        onClick={handleChange}
        className={`relative flex items-center transition-colors duration-300 rounded-full cursor-pointer ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        } ${checked ? currentVariant.on : currentVariant.off} ${
          sizeStyles[size].container
        }`}
      >
        {/* Ícones opcionais dentro do toggle */}
        {withIcons && (
          <>
            <span
              className={`absolute left-1 transition-opacity duration-300 ${
                checked ? "opacity-0" : "opacity-100"
              } ${sizeStyles[size].icon} font-bold ${currentVariant.icon}`}
            >
              {offIcon}
            </span>
            <span
              className={`absolute right-1 transition-opacity duration-300 ${
                checked ? "opacity-100" : "opacity-0"
              } ${sizeStyles[size].icon} font-bold ${currentVariant.icon}`}
            >
              {onIcon}
            </span>
          </>
        )}

        {/* Thumb */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 left-0.5 rounded-full ${
            currentVariant.thumb
          } transition-transform duration-300 shadow-md
            ${sizeStyles[size].thumb} ${
            checked ? sizeStyles[size].translate : "translate-x-0"
          } 
            ${
              !disabled ? "hover:scale-110" : ""
            } flex items-center justify-center`}
        >
          {withIcons && (
            <span className={`${sizeStyles[size].icon} font-bold`}>
              {checked ? onIcon : offIcon}
            </span>
          )}
        </span>
      </div>

      {label && labelPosition === "right" && LabelComponent}
    </div>
  );
}
