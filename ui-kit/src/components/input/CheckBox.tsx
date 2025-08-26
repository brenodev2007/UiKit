import React from "react";

type CheckboxSize = "sm" | "md" | "lg";
type CheckboxVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";
type CheckboxRounded = "none" | "sm" | "md" | "full";
type AnimationType = "none" | "bounce" | "pulse";

interface CheckboxProps {
  // Props básicas
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  label?: React.ReactNode;

  // Estados
  disabled?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  readOnly?: boolean;

  // Validação e feedback
  error?: string | boolean;
  helperText?: string;
  success?: string | boolean;

  // Personalização visual
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  rounded?: CheckboxRounded;
  animation?: AnimationType;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;

  // Props HTML
  id?: string;
  name?: string;
  value?: string;
  "aria-label"?: string;
}

export default function Checkbox({
  // Props básicas
  checked,
  defaultChecked,
  onChange,
  label,

  // Estados
  disabled = false,
  indeterminate = false,
  required = false,
  readOnly = false,

  // Validação e feedback
  error,
  helperText,
  success,

  // Personalização visual
  variant = "primary",
  size = "md",
  rounded = "md",
  animation = "bounce",
  className = "",
  containerClassName = "",
  labelClassName = "",

  // Props HTML
  id,
  name,
  value,
  "aria-label": ariaLabel,
}: CheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = id || `checkbox-${generatedId}`;
  const isControlled = checked !== undefined;

  // Estado interno para uncontrolled
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked || false
  );
  const actualChecked = isControlled ? checked : internalChecked;

  // Configurações de tamanho
  const sizeConfig = {
    sm: {
      container: "w-4 h-4",
      icon: "w-2.5 h-2.5",
      label: "text-sm",
      helper: "text-xs",
    },
    md: {
      container: "w-5 h-5",
      icon: "w-3.5 h-3.5",
      label: "text-base",
      helper: "text-sm",
    },
    lg: {
      container: "w-6 h-6",
      icon: "w-4 h-4",
      label: "text-lg",
      helper: "text-base",
    },
  };

  // Configurações de variante
  const variantConfig = {
    primary: {
      checked: "bg-blue-600 border-blue-600",
      unchecked: "border-gray-300",
      focus: "ring-blue-500",
      text: "text-blue-600",
    },
    secondary: {
      checked: "bg-gray-600 border-gray-600",
      unchecked: "border-gray-300",
      focus: "ring-gray-500",
      text: "text-gray-600",
    },
    success: {
      checked: "bg-green-600 border-green-600",
      unchecked: "border-gray-300",
      focus: "ring-green-500",
      text: "text-green-600",
    },
    danger: {
      checked: "bg-red-600 border-red-600",
      unchecked: "border-gray-300",
      focus: "ring-red-500",
      text: "text-red-600",
    },
    warning: {
      checked: "bg-yellow-500 border-yellow-500",
      unchecked: "border-gray-300",
      focus: "ring-yellow-500",
      text: "text-yellow-600",
    },
  };

  // Configurações de arredondamento
  const roundedConfig = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    full: "rounded-full",
  };

  // Configurações de animação
  const animationConfig = {
    none: "",
    bounce: "transition-transform duration-200 active:scale-95",
    pulse: "transition-all duration-300 hover:scale-105",
  };

  // Referência para o input
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Efeito para estado indeterminado
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Manipulador de mudança
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }

    if (onChange) {
      onChange(event.target.checked, event);
    }
  };

  // Determinar estado visual
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success);
  const showFeedback = hasError || hasSuccess || helperText;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      <div className={`flex items-start gap-3 ${className}`}>
        {/* Container do checkbox */}
        <div className="flex items-center h-5">
          <input
            ref={inputRef}
            id={checkboxId}
            name={name}
            type="checkbox"
            checked={actualChecked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            value={value}
            aria-label={ariaLabel}
            className="sr-only"
          />

          <label
            htmlFor={checkboxId}
            className={`
              flex items-center justify-center
              border-2
              ${sizeConfig[size].container}
              ${roundedConfig[rounded]}
              ${animationConfig[animation]}
              ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
              ${readOnly ? "cursor-default" : ""}
              ${
                actualChecked || indeterminate
                  ? variantConfig[variant].checked
                  : variantConfig[variant].unchecked
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${variantConfig[variant].focus}
              transition-colors duration-200
              ${indeterminate ? "bg-current border-current" : ""}
            `}
          >
            {/* Ícone de check ou indeterminado */}
            {(actualChecked || indeterminate) && (
              <svg
                className={`${sizeConfig[size].icon} text-white stroke-current`}
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={indeterminate ? 0 : 3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {indeterminate ? (
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="2"
                    fill="currentColor"
                  />
                ) : (
                  <path d="M5 13l4 4L19 7" stroke="currentColor" />
                )}
              </svg>
            )}
          </label>
        </div>

        {/* Label e conteúdo */}
        {label && (
          <div className="flex flex-col">
            <label
              htmlFor={checkboxId}
              className={`
                ${sizeConfig[size].label}
                font-medium
                ${disabled ? "text-gray-400" : "text-gray-700"}
                ${hasError ? "text-red-600" : ""}
                ${hasSuccess ? "text-green-600" : ""}
                ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                ${labelClassName}
              `}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        )}
      </div>

      {/* Texto de feedback */}
      {showFeedback && (
        <p
          className={`
          ${sizeConfig[size].helper}
          ${hasError ? "text-red-500" : ""}
          ${hasSuccess ? "text-green-500" : ""}
          ${!hasError && !hasSuccess ? "text-gray-500" : ""}
          mt-1
        `}
        >
          {hasError && typeof error === "string" ? error : ""}
          {hasSuccess && typeof success === "string" ? success : ""}
          {!hasError && !hasSuccess ? helperText : ""}
        </p>
      )}
    </div>
  );
}
