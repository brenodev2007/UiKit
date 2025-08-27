import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

// Variantes do texto
const textVariants = cva("transition-colors duration-300", {
  variants: {
    variant: {
      default: "text-gray-900",
      muted: "text-gray-500",
      error: "text-red-600",
      success: "text-green-600",
      warning: "text-yellow-600",
      info: "text-blue-600",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

export default function Text({
  as: Component = "span",
  variant,
  size,
  weight,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={clsx(textVariants({ variant, size, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
