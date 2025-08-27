import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck, FiSearch, FiX } from "react-icons/fi";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: SelectOption) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  name?: string;
  id?: string;
}

export default function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Selecione uma opção",
  disabled = false,
  searchable = false,
  clearable = false,
  size = "md",
  variant = "outline",
  rounded = "md",
  className = "",
  dropdownClassName = "",
  optionClassName = "",
  error,
  success,
  helperText,
  label,
  required = false,
  name,
  id,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Encontrar a opção selecionada
  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayValue = selectedOption?.label || placeholder;

  // Filtar opções baseado na busca
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Configurações de tamanho
  const sizeStyles = {
    sm: {
      select: "py-1.5 px-3 text-sm",
      option: "py-1.5 px-3 text-sm",
      icon: "text-base",
    },
    md: {
      select: "py-2.5 px-4 text-base",
      option: "py-2 px-4 text-base",
      icon: "text-lg",
    },
    lg: {
      select: "py-3 px-5 text-lg",
      option: "py-2.5 px-5 text-lg",
      icon: "text-xl",
    },
  };

  // Configurações de variante
  const variantStyles = {
    outline: {
      select:
        "border border-gray-300 bg-white focus:ring-2 focus:border-transparent",
      focused: "border-blue-500 ring-blue-500",
    },
    filled: {
      select: "bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:border",
      focused: "bg-white border-gray-300 ring-blue-500",
    },
    flushed: {
      select:
        "border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent px-0",
      focused: "border-blue-500 ring-0",
    },
    unstyled: {
      select: "border-0 bg-transparent px-0",
      focused: "ring-0",
    },
  };

  // Configurações de arredondamento
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Estado visual
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success);
  const showFeedback = hasError || hasSuccess || helperText;

  const stateColors = hasError
    ? "border-red-500 focus:ring-red-500"
    : hasSuccess
    ? "border-green-500 focus:ring-green-500"
    : "border-gray-300 focus:ring-blue-500";

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;

    setSelectedValue(option.value);
    onChange?.(option.value, option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue("");
    onChange?.("", { value: "", label: "" });
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focar no input de busca quando abrir e for searchable
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  return (
    <div className={`relative w-full ${className}`} ref={selectRef}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${
            hasError
              ? "text-red-600"
              : hasSuccess
              ? "text-green-600"
              : "text-gray-700"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select trigger */}
      <div
        className={`
          relative
          w-full
          flex items-center justify-between
          cursor-pointer
          transition-all duration-200
          ${sizeStyles[size].select}
          ${variantStyles[variant].select}
          ${roundedStyles[rounded]}
          ${stateColors}
          ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100"
              : "cursor-pointer"
          }
          ${isOpen ? variantStyles[variant].focused : ""}
          ${variant !== "unstyled" && variant !== "flushed" ? "shadow-sm" : ""}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span
          className={`truncate ${
            !selectedValue ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {displayValue}
        </span>

        <div className="flex items-center gap-1">
          {clearable && selectedValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="hover:text-gray-700 transition-colors"
              aria-label="Limpar seleção"
            >
              <FiX className="text-gray-400" />
            </button>
          )}
          <FiChevronDown
            className={`
              ${sizeStyles[size].icon}
              text-gray-400
              transition-transform duration-200
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`
            absolute z-50 w-full mt-1
            bg-white border border-gray-200
            rounded-md shadow-lg
            overflow-hidden
            ${dropdownClassName}
          `}
        >
          {/* Search input */}
          {searchable && (
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-gray-500 text-center">
                Nenhuma opção encontrada
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`
                    flex items-center justify-between
                    cursor-pointer
                    transition-colors duration-150
                    hover:bg-gray-50
                    ${optionClassName}
                    ${sizeStyles[size].option}
                    ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
                    ${
                      option.value === selectedValue
                        ? "bg-blue-50 hover:bg-blue-100"
                        : ""
                    }
                  `}
                  onClick={() => handleSelect(option)}
                >
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <span className="flex-shrink-0">{option.icon}</span>
                    )}
                    <span
                      className={
                        option.disabled ? "text-gray-400" : "text-gray-800"
                      }
                    >
                      {option.label}
                    </span>
                  </div>

                  {option.value === selectedValue && (
                    <FiCheck className="text-blue-600 flex-shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Feedback messages */}
      {showFeedback && (
        <p
          className={`
            text-sm mt-1
            ${hasError ? "text-red-500" : ""}
            ${hasSuccess ? "text-green-500" : ""}
            ${!hasError && !hasSuccess ? "text-gray-500" : ""}
          `}
        >
          {error || success || helperText}
        </p>
      )}
    </div>
  );
}
