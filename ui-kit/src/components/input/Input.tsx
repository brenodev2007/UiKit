import React from "react";

type InputVariant = "outline" | "filled" | "flushed" | "unstyled";
type InputSize = "sm" | "md" | "lg";
type Rounded = "none" | "sm" | "md" | "lg" | "full";

interface InputProps {
  placeholder?: string;
  error?: string;
  success?: string;
  helperText?: string;
  icon?: React.ElementType;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  variant?: InputVariant;
  size?: InputSize;
  rounded?: Rounded;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  label?: string;
  required?: boolean;
}

export default function Input({
  placeholder = "",
  error = "",
  success = "",
  helperText = "",
  icon: Icon,
  type = "text",
  variant = "outline",
  size = "md",
  rounded = "md",
  disabled = false,
  fullWidth = false,
  className = "",
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  name,
  id,
  label,
  required = false,
}: InputProps) {
  // Estilos base
  const baseStyles = "outline-none transition-all duration-300 bg-transparent";

  const sizes: Record<InputSize, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const roundedStyles: Record<Rounded, string> = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const stateColors = error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : success
    ? "border-green-500 focus:ring-green-500 focus:border-green-500"
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

  const stateBgColors = error
    ? "bg-red-50"
    : success
    ? "bg-green-50"
    : "bg-transparent";

  const disabledStyles = "opacity-60 cursor-not-allowed";
  const widthStyle = fullWidth ? "w-full" : "";

  const containerBase = "flex items-center transition-all duration-300";
  const containerVariantStyles = {
    outline: `${stateBgColors} border ${roundedStyles[rounded]} ${stateColors}`,
    filled: `${stateBgColors} ${roundedStyles[rounded]} ${
      error ? "bg-red-50" : success ? "bg-green-50" : "bg-gray-100"
    }`,
    flushed: `border-b-2 ${stateColors}`,
    unstyled: "",
  };

  return (
    <div className={`flex flex-col ${widthStyle} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`mb-1 text-sm font-medium ${
            error
              ? "text-red-600"
              : success
              ? "text-green-600"
              : "text-gray-700"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`
          ${containerBase}
          ${containerVariantStyles[variant]}
          ${disabled ? disabledStyles : ""}
          ${variant !== "flushed" && variant !== "unstyled" ? "px-3" : ""}
          focus-within:ring-2 focus-within:ring-blue-500
          ${variant === "outline" ? "focus-within:border-transparent" : ""}
        `}
      >
        {Icon && (
          <Icon
            className={`${sizes[size].split(" ")[0]} ${
              error
                ? "text-red-500"
                : success
                ? "text-green-500"
                : "text-gray-400"
            }`}
          />
        )}

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`
            ${baseStyles}
            ${sizes[size]}
            ${variant === "filled" ? "bg-transparent" : ""}
            ${widthStyle}
            ${Icon ? "ml-2" : ""}
            ${variant === "unstyled" ? "px-0" : ""}
            ${disabled ? "cursor-not-allowed" : ""}
          `}
        />
      </div>

      {(error || success || helperText) && (
        <span
          className={`text-sm mt-1 ${
            error
              ? "text-red-500"
              : success
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {error || success || helperText}
        </span>
      )}
    </div>
  );
}
