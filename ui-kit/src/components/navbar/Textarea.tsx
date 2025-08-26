import React from "react";

type TextareaVariant = "outline" | "filled" | "flushed" | "unstyled";
type TextareaSize = "sm" | "md" | "lg";
type Rounded = "none" | "sm" | "md" | "lg" | "full";

interface TextareaProps {
  placeholder?: string;
  error?: string;
  success?: string;
  helperText?: string;
  variant?: TextareaVariant;
  size?: TextareaSize;
  rounded?: Rounded;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  label?: string;
  required?: boolean;
  rows?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
  maxLength?: number;
  showCount?: boolean;
}

export default function Textarea({
  placeholder = "",
  error = "",
  success = "",
  helperText = "",
  variant = "outline",
  size = "md",
  rounded = "md",
  disabled = false,
  readOnly = false,
  fullWidth = true,
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
  rows = 4,
  resize = "vertical",
  maxLength,
  showCount = false,
}: TextareaProps) {
  const baseStyles = "outline-none transition-all duration-300 bg-transparent";

  const variants: Record<TextareaVariant, string> = {
    outline: "border focus:ring-2 focus:border-transparent",
    filled: "bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:border",
    flushed:
      "border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:ring-0",
    unstyled: "border-0 focus:ring-0 p-0",
  };

  // Tamanhos
  const sizes: Record<TextareaSize, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const roundedStyles: Record<Rounded, string> = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-lg",
  };

  const resizeStyles: Record<typeof resize, string> = {
    none: "resize-none",
    both: "resize",
    horizontal: "resize-x",
    vertical: "resize-y",
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

  const containerBase = "transition-all duration-300";
  const containerVariantStyles = {
    outline: `${stateBgColors} border ${roundedStyles[rounded]} ${stateColors}`,
    filled: `${stateBgColors} ${roundedStyles[rounded]} ${
      error ? "bg-red-50" : success ? "bg-green-50" : "bg-gray-100"
    }`,
    flushed: `border-b-2 ${stateColors}`,
    unstyled: "",
  };

  const charCount = value
    ? value.length
    : defaultValue
    ? defaultValue.length
    : 0;

  return (
    <div className={`flex flex-col ${widthStyle} ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor={id}
            className={`text-sm font-medium ${
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

          {showCount && maxLength && (
            <span
              className={`text-xs ${
                charCount > maxLength ? "text-red-500" : "text-gray-500"
              }`}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}

      <div
        className={`
          ${containerBase}
          ${containerVariantStyles[variant]}
          ${disabled ? disabledStyles : ""}
          ${variant !== "flushed" && variant !== "unstyled" ? "p-1" : ""}
          focus-within:ring-2 focus-within:ring-blue-500
          ${variant === "outline" ? "focus-within:border-transparent" : ""}
        `}
      >
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className={`
            ${baseStyles}
            ${sizes[size]}
            ${resizeStyles[resize]}
            ${widthStyle}
            ${variant === "unstyled" ? "px-0" : ""}
            ${disabled ? "cursor-not-allowed" : ""}
            min-h-[80px]
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

      {showCount && !maxLength && !label && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500">{charCount} caracteres</span>
        </div>
      )}
    </div>
  );
}
