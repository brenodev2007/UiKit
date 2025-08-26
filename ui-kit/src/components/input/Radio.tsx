import React from "react";

export interface RadioProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  variant?: "primary" | "success" | "danger" | "warning";
  size?: "sm" | "md" | "lg";
}

export function Radio({
  value,
  disabled = false,
  children,
  name,
  checked,
  onChange,
  className = "",
  variant = "primary",
  size = "md",
}: RadioProps) {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  // Configurações de variante
  const variantStyles = {
    primary: {
      checked: "border-blue-600 bg-blue-600",
      hover: "hover:border-blue-400",
    },
    success: {
      checked: "border-green-600 bg-green-600",
      hover: "hover:border-green-400",
    },
    danger: {
      checked: "border-red-600 bg-red-600",
      hover: "hover:border-red-400",
    },
    warning: {
      checked: "border-yellow-500 bg-yellow-500",
      hover: "hover:border-yellow-400",
    },
  };

  // Configurações de tamanho
  const sizeStyles = {
    sm: {
      radio: "h-3 w-3",
      dot: "w-1 h-1",
      text: "text-xs",
    },
    md: {
      radio: "h-4 w-4",
      dot: "w-1.5 h-1.5",
      text: "text-sm",
    },
    lg: {
      radio: "h-5 w-5",
      dot: "w-2 h-2",
      text: "text-base",
    },
  };

  return (
    <label
      className={`
        flex items-center 
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${className}
      `}
    >
      {/* Input escondido visualmente mas acessível */}
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />

      {/* Radio customizado */}
      <span
        className={`
          relative
          rounded-full
          border-2
          transition-all
          duration-200
          flex
          items-center
          justify-center
          ${sizeStyles[size].radio}
          ${
            checked
              ? variantStyles[variant].checked
              : "border-gray-300 bg-white"
          }
          ${disabled ? "border-gray-300 bg-gray-100" : ""}
          ${!disabled && !checked ? variantStyles[variant].hover : ""}
        `}
      >
        {/* Ponto central quando selecionado */}
        {checked && (
          <span
            className={`
              rounded-full
              bg-white
              transition-all
              duration-200
              ${sizeStyles[size].dot}
            `}
          />
        )}
      </span>

      <span
        className={`
          ml-2 
          font-medium
          ${disabled ? "text-gray-400" : "text-gray-700"}
          ${sizeStyles[size].text}
        `}
      >
        {children}
      </span>
    </label>
  );
}
