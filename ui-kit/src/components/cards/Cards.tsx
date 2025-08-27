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
    default: "bg-white border border-gray-200",
    elevated: "bg-white shadow-md",
    outlined: "border-2 border-gray-200 bg-transparent",
    filled: "bg-gray-50 border border-gray-100",
  };

  // Configurações de tamanho
  const sizeStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  // Configurações de arredondamento
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  // Efeitos hover
  const hoverStyles = {
    none: "",
    scale: "transition-transform duration-200 hover:scale-[1.02]",
    shadow: "transition-shadow duration-200 hover:shadow-lg",
    lift: "transition-transform duration-200 hover:-translate-y-1",
  };

  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${roundedStyles[rounded]}
        ${hoverStyles[hoverEffect]}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
        transition-all duration-200
      `}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

// Componente CardHeader
export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

// Componente CardTitle
export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function CardTitle({
  children,
  className = "",
  as: Tag = "h3",
}: CardTitleProps) {
  return (
    <Tag className={`font-semibold text-gray-900 ${className}`}>{children}</Tag>
  );
}

// Componente CardDescription
export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({
  children,
  className = "",
}: CardDescriptionProps) {
  return <p className={`text-gray-600 mt-1 ${className}`}>{children}</p>;
}

// Componente CardContent
export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

// Componente CardFooter
export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between";
}

export function CardFooter({
  children,
  className = "",
  align = "left",
}: CardFooterProps) {
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

// Componente CardImage
export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  height?: string;
  width?: string;
}

export function CardImage({
  src,
  alt,
  className = "",
  height = "auto",
  width = "100%",
}: CardImageProps) {
  return (
    <div className="overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover ${className}`}
        style={{ height, width }}
      />
    </div>
  );
}

// Componente CardAvatar
export interface CardAvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CardAvatar({
  src,
  alt,
  size = "md",
  className = "",
}: CardAvatarProps) {
  const sizeStyles = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeStyles[size]} rounded-full object-cover ${className}`}
    />
  );
}
