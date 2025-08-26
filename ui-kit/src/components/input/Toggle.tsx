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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  // Configurações de tamanho
  const sizeStyles = {
    sm: {
      container: "w-8 h-4",
      thumb: "w-3 h-3",
      thumbChecked: "translate-x-4",
      text: "text-xs",
      icon: "text-[8px]",
    },
    md: {
      container: "w-10 h-5",
      thumb: "w-4 h-4",
      thumbChecked: "translate-x-5",
      text: "text-sm",
      icon: "text-[10px]",
    },
    lg: {
      container: "w-12 h-6",
      thumb: "w-5 h-5",
      thumbChecked: "translate-x-6",
      text: "text-base",
      icon: "text-[12px]",
    },
  };

  // Configurações de variante
  const variantStyles = {
    primary: {
      background: "bg-blue-600",
      backgroundDisabled: "bg-blue-300",
      thumb: "bg-white",
      text: "text-blue-600",
    },
    success: {
      background: "bg-green-600",
      backgroundDisabled: "bg-green-300",
      thumb: "bg-white",
      text: "text-green-600",
    },
    danger: {
      background: "bg-red-600",
      backgroundDisabled: "bg-red-300",
      thumb: "bg-white",
      text: "text-red-600",
    },
    warning: {
      background: "bg-yellow-500",
      backgroundDisabled: "bg-yellow-300",
      thumb: "bg-white",
      text: "text-yellow-600",
    },
    neutral: {
      background: "bg-gray-600",
      backgroundDisabled: "bg-gray-300",
      thumb: "bg-white",
      text: "text-gray-600",
    },
  };

  const LabelComponent = label ? (
    <span
      className={`
        ${sizeStyles[size].text}
        font-medium
        ${disabled ? "text-gray-400" : "text-gray-700"}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      onClick={() => !disabled && onChange?.(!checked)}
    >
      {label}
    </span>
  ) : null;

  return (
    <label
      className={`
        flex items-center
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${className}
        gap-3
      `}
    >
      {/* Label à esquerda */}
      {label && labelPosition === "left" && LabelComponent}

      {/* Input escondido */}
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        className="sr-only"
      />

      {/* Toggle Switch customizado */}
      <span
        className={`
          relative
          rounded-full
          transition-colors
          duration-300
          flex
          items-center
          ${sizeStyles[size].container}
          ${
            checked
              ? disabled
                ? variantStyles[variant].backgroundDisabled
                : variantStyles[variant].background
              : "bg-gray-300"
          }
        `}
      >
        {/* Ícones dentro do toggle */}
        {withIcons && (
          <>
            <span
              className={`
                absolute
                left-1
                ${sizeStyles[size].icon}
                font-bold
                text-white
                transition-opacity
                duration-300
                ${checked ? "opacity-0" : "opacity-100"}
              `}
            >
              {offIcon}
            </span>
            <span
              className={`
                absolute
                right-1
                ${sizeStyles[size].icon}
                font-bold
                text-white
                transition-opacity
                duration-300
                ${checked ? "opacity-100" : "opacity-0"}
              `}
            >
              {onIcon}
            </span>
          </>
        )}

        {/* Thumb (bolinha) */}
        <span
          className={`
            absolute
            rounded-full
            transition-all
            duration-300
            ${variantStyles[variant].thumb}
            ${sizeStyles[size].thumb}
            top-1/2
            -translate-y-1/2
            left-0.5
            ${checked ? sizeStyles[size].thumbChecked : "translate-x-0"}
            shadow-md
            ${!disabled && "hover:scale-110"}
            flex
            items-center
            justify-center
          `}
        >
          {/* Ícone no thumb */}
          {withIcons && (
            <span
              className={`
                ${sizeStyles[size].icon}
                font-bold
                ${variantStyles[variant].text}
              `}
            >
              {checked ? onIcon : offIcon}
            </span>
          )}
        </span>
      </span>

      {/* Label à direita */}
      {label && labelPosition === "right" && LabelComponent}
    </label>
  );
}
