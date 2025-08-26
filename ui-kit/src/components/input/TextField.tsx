import React from "react";

type TextFieldVariant = "outline" | "filled" | "flushed" | "unstyled";
type TextFieldSize = "sm" | "md" | "lg";
type Rounded = "none" | "sm" | "md" | "lg" | "full";
type IconPosition = "left" | "right";

interface TextFieldProps {
  // Props básicas
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  defaultValue?: string;

  // Ícones
  icon?: React.ElementType;
  iconPosition?: IconPosition;
  trailingIcon?: React.ElementType;

  // Estados e validação
  error?: string;
  success?: string;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;

  // Estilização
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  rounded?: Rounded;
  fullWidth?: boolean;
  className?: string;

  // Controle de caracteres
  maxLength?: number;
  showCount?: boolean;

  // Labels e identificadores
  label?: string;
  name?: string;
  id?: string;

  // Eventos
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  onTrailingIconClick?: () => void;
}

export default function TextField({
  // Props básicas
  type = "text",
  placeholder = "",
  value,
  defaultValue,

  // Ícones
  icon: Icon,
  iconPosition = "left",
  trailingIcon: TrailingIcon,

  // Estados e validação
  error = "",
  success = "",
  helperText = "",
  disabled = false,
  readOnly = false,
  required = false,

  // Estilização
  variant = "outline",
  size = "md",
  rounded = "md",
  fullWidth = true,
  className = "",

  // Controle de caracteres
  maxLength,
  showCount = false,

  // Labels e identificadores
  label,
  name,
  id,

  // Eventos
  onChange,
  onFocus,
  onBlur,
  onIconClick,
  onTrailingIconClick,
}: TextFieldProps) {
  // Estilos base
  const baseStyles =
    "outline-none transition-all duration-300 bg-transparent w-full";

  // Variantes
  const variants: Record<TextFieldVariant, string> = {
    outline: "border focus:ring-2 focus:border-transparent",
    filled: "bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:border",
    flushed:
      "border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus:ring-0",
    unstyled: "border-0 focus:ring-0",
  };

  // Tamanhos
  const sizes: Record<TextFieldSize, string> = {
    sm: "px-2 py-1.5 text-sm",
    md: "px-3 py-2.5 text-base",
    lg: "px-4 py-3 text-lg",
  };

  // Arredondamento
  const roundedStyles: Record<Rounded, string> = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Cores para estados
  const stateColors = error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : success
    ? "border-green-500 focus:ring-green-500 focus:border-green-500"
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

  const stateBgColors = error
    ? "bg-red-50"
    : success
    ? "bg-green-50"
    : variant === "filled"
    ? "bg-gray-100"
    : "bg-transparent";

  const stateTextColors = error
    ? "text-red-500"
    : success
    ? "text-green-500"
    : "text-gray-400";

  // Estado desabilitado
  const disabledStyles = "opacity-60 cursor-not-allowed";
  const widthStyle = fullWidth ? "w-full" : "";

  // Container styles
  const containerBase = "flex items-center transition-all duration-300";
  const containerVariantStyles = {
    outline: `${stateBgColors} border ${roundedStyles[rounded]} ${stateColors}`,
    filled: `${stateBgColors} ${roundedStyles[rounded]} ${
      error ? "bg-red-50" : success ? "bg-green-50" : "bg-gray-100"
    }`,
    flushed: `border-b-2 ${stateColors} ${stateBgColors}`,
    unstyled: "",
  };

  // Ícone clicável
  const iconButtonStyles =
    onIconClick || onTrailingIconClick
      ? "cursor-pointer hover:opacity-70 transition-opacity"
      : "";

  // Contador de caracteres
  const charCount = value
    ? value.length
    : defaultValue
    ? defaultValue.length
    : 0;
  const countColor =
    maxLength && charCount > maxLength ? "text-red-500" : "text-gray-500";

  return (
    <div className={`flex flex-col ${widthStyle} ${className}`}>
      {/* Label e contador */}
      {(label || (showCount && maxLength)) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
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
          )}

          {showCount && maxLength && (
            <span className={`text-xs ${countColor}`}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}

      {/* Container do input */}
      <div
        className={`
          ${containerBase}
          ${containerVariantStyles[variant]}
          ${disabled ? disabledStyles : ""}
          ${variant !== "flushed" && variant !== "unstyled" ? "px-3" : "px-0"}
          focus-within:ring-2 focus-within:ring-blue-500
          ${variant === "outline" ? "focus-within:border-transparent" : ""}
        `}
      >
        {/* Ícone à esquerda */}
        {Icon && iconPosition === "left" && (
          <span
            className={`${stateTextColors} ${
              sizes[size].split(" ")[0]
            } ${iconButtonStyles} mr-2`}
            onClick={onIconClick}
          >
            <Icon />
          </span>
        )}

        {/* Input principal */}
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
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          className={`
            ${baseStyles}
            ${sizes[size]}
            ${variant === "unstyled" ? "px-0" : ""}
            ${disabled ? "cursor-not-allowed" : ""}
            ${!Icon && iconPosition === "left" ? "pl-0" : ""}
            ${!TrailingIcon && iconPosition === "right" ? "pr-0" : ""}
          `}
        />

        {/* Ícone à direita (trailing) */}
        {TrailingIcon && (
          <span
            className={`${stateTextColors} ${
              sizes[size].split(" ")[0]
            } ${iconButtonStyles} ml-2`}
            onClick={onTrailingIconClick}
          >
            <TrailingIcon />
          </span>
        )}

        {/* Ícone à direita (normal) */}
        {Icon && iconPosition === "right" && !TrailingIcon && (
          <span
            className={`${stateTextColors} ${
              sizes[size].split(" ")[0]
            } ${iconButtonStyles} ml-2`}
            onClick={onIconClick}
          >
            <Icon />
          </span>
        )}
      </div>

      {/* Texto de ajuda, erro ou sucesso */}
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

      {/* Contador de caracteres sem maxLength */}
      {showCount && !maxLength && !label && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500">{charCount} caracteres</span>
        </div>
      )}
    </div>
  );
}
