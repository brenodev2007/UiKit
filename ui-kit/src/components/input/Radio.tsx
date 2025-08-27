import React, { useRef, useEffect } from "react";

export interface RadioProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  name?: string;
  checked?: boolean;
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
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
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const actualChecked = isControlled ? checked : inputRef.current?.checked;

  const variantStyles = {
    primary: {
      checked: "border-blue-600 bg-blue-600",
      hover: "hover:border-blue-400 focus:ring-blue-500",
    },
    success: {
      checked: "border-green-600 bg-green-600",
      hover: "hover:border-green-400 focus:ring-green-500",
    },
    danger: {
      checked: "border-red-600 bg-red-600",
      hover: "hover:border-red-400 focus:ring-red-500",
    },
    warning: {
      checked: "border-yellow-500 bg-yellow-500",
      hover: "hover:border-yellow-400 focus:ring-yellow-500",
    },
  };

  const sizeStyles = {
    sm: { radio: "h-3 w-3", dot: "w-1 h-1", text: "text-xs" },
    md: { radio: "h-4 w-4", dot: "w-1.5 h-1.5", text: "text-sm" },
    lg: { radio: "h-5 w-5", dot: "w-2 h-2", text: "text-base" },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (onChange) onChange(value, event);
  };

  return (
    <label
      className={`flex items-center ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${className}`}
    >
      {/* Input real */}
      <input
        ref={inputRef}
        type="radio"
        name={name}
        value={value}
        checked={actualChecked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        aria-checked={actualChecked}
        role="radio"
      />

      {/* Radio visual customizado */}
      <span
        className={`
          relative rounded-full border-2 flex items-center justify-center
          ${sizeStyles[size].radio}
          ${disabled ? "border-gray-300 bg-gray-100" : ""}
          ${
            actualChecked
              ? variantStyles[variant].checked
              : "border-gray-300 bg-white"
          }
          ${!disabled ? variantStyles[variant].hover : ""}
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
      >
        {actualChecked && (
          <span
            className={`rounded-full bg-white ${sizeStyles[size].dot} transition-all duration-200`}
          />
        )}
      </span>

      {/* Label do Radio */}
      <span
        className={`ml-2 font-medium ${
          disabled ? "text-gray-400" : "text-gray-700"
        } ${sizeStyles[size].text}`}
      >
        {children}
      </span>
    </label>
  );
}
