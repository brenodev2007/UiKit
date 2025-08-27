import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Text from "./Text";

// Variantes do Badge
const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors duration-300",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-blue-100 text-blue-800",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
      rounded: {
        sm: "rounded-md",
        md: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "full",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Badge({
  variant,
  size,
  rounded,
  className,
  children,
  loading = false,
  icon,
  iconPosition = "left",
  ...props
}: BadgeProps) {
  const content = (
    <span className="flex items-center gap-1">
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </span>
  );

  if (loading) {
    return (
      <div
        className={clsx(
          "animate-pulse bg-gray-200 h-6 w-16 flex items-center justify-center",
          badgeVariants({ variant, size, rounded }),
          className
        )}
        {...props}
      >
        <span className="invisible">{children}</span>
      </div>
    );
  }

  return (
    <div
      className={clsx(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    >
      <Text variant={size === "sm" ? "default" : "error"}>{content}</Text>
    </div>
  );
}

export default Badge;
