import React from "react";

export type CardVariant = "default" | "elevated" | "outlined" | "filled";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  hoverEffect?: "none" | "scale" | "shadow" | "lift";
  onClick?: () => void;
}

export default function Card({
  children,
  variant = "default",
  size = "md",
  rounded = "lg",
  className = "",
  hoverEffect = "none",
  onClick,
}: CardProps) {
  const variantStyles = {
    default:
      "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    elevated: "bg-white dark:bg-gray-800 shadow-md",
    outlined: "border-2 border-gray-200 dark:border-gray-600 bg-transparent",
    filled:
      "bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700",
  };

  const sizeStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const hoverStyles = {
    none: "",
    scale: "transition-transform duration-200 hover:scale-[1.02]",
    shadow: "transition-shadow duration-200 hover:shadow-lg",
    lift: "transition-transform duration-200 hover:-translate-y-1",
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${roundedStyles[rounded]}
        ${hoverStyles[hoverEffect]}
        ${onClick ? "cursor-pointer active:scale-[0.98]" : ""}
        ${className}
        transition-all duration-200
      `}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

// Header
export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

// Title
export function CardTitle({
  children,
  className = "",
  as: Tag = "h3",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  return (
    <Tag
      className={`font-semibold text-gray-900 dark:text-gray-100 ${className}`}
    >
      {children}
    </Tag>
  );
}

// Description
export function CardDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-gray-600 dark:text-gray-400 mt-1 ${className}`}>
      {children}
    </p>
  );
}

// Content
export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

// Footer
export function CardFooter({
  children,
  className = "",
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between";
}) {
  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };
  return (
    <div className={`mt-6 flex ${alignStyles[align]} ${className}`}>
      {children}
    </div>
  );
}

// Image
export function CardImage({
  src,
  alt,
  className = "",
  aspect = "16/9",
  rounded = "lg",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
}) {
  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };
  return (
    <div
      className={`overflow-hidden ${roundedMap[rounded]}`}
      style={{ aspectRatio: aspect }}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
}

// Avatar
export function CardAvatar({
  src,
  alt,
  size = "md",
  className = "",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeStyles = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          "https://via.placeholder.com/150";
      }}
      className={`${sizeStyles[size]} rounded-full object-cover ${className}`}
    />
  );
}
