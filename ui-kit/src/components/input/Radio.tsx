import React from "react";

export interface RadioProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export function Radio({
  value,
  disabled = false,
  children,
  name,
  checked,
  onChange,
  className = "",
}: RadioProps) {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <label
      className={`
        flex items-center cursor-pointer
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${className}
      `}
    >
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="
          h-4 w-4 
          text-blue-600 
          focus:ring-blue-500 
          border-gray-300 
          rounded
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          transition-colors
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      />
      <span
        className={`
          ml-2 
          text-sm
          font-medium
          ${disabled ? "text-gray-400" : "text-gray-700"}
        `}
      >
        {children}
      </span>
    </label>
  );
}
