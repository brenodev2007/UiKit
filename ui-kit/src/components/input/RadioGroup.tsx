import React from "react";

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

interface RadioOptionProps {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export function RadioGroup({
  children,
  value,
  defaultValue,
  onChange,
  name,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  className = "",
  orientation = "vertical",
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const isControlled = value !== undefined;
  const actualValue = isControlled ? value : internalValue;
  const groupName = name || `radio-group-${React.useId()}`;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<RadioOptionProps>(child)) {
      return React.cloneElement(child, {
        name: groupName,
        checked: child.props.value === actualValue,
        onChange: (val: string) => handleChange(val),
        disabled: disabled || child.props.disabled,
      });
    }
    return child;
  });

  return (
    <div className={className}>
      {label && (
        <legend
          className={`
          block text-sm font-medium mb-2
          ${error ? "text-red-600" : "text-gray-700"}
          ${disabled ? "text-gray-400" : ""}
        `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}

      <div
        className={`
        ${orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-2"}
      `}
      >
        {childrenWithProps}
      </div>

      {(error || helperText) && (
        <p
          className={`
          text-sm mt-1
          ${error ? "text-red-500" : "text-gray-500"}
        `}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
