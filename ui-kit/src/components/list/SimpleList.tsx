import { useState, useEffect } from "react";

// Interface base para ambos os componentes
export interface BaseListProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  spacing?: string;
  animationType?: "fade" | "slide" | "bounce" | "none";
  animationDelay?: number;
  animationDuration?: number;
}

// Interface específica para SimpleList
export interface SimpleListProps extends BaseListProps {
  bullet?: "disc" | "circle" | "square" | "none" | "decimal" | "custom";
  bulletColor?: string;
  customBullet?: string; // Para bullets personalizados (emoji, ícone, etc)
}

// Interface para IconList
export interface IconListProps extends BaseListProps {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  iconColor?: string;
  iconBackground?: string;
}

// Componente SimpleList modernizado
export function SimpleList({
  items,
  className = "",
  itemClassName = "",
  bullet = "disc",
  bulletColor = "text-blue-500",
  customBullet = "•",
  spacing = "gap-3",
  animationType = "fade",
  animationDelay = 100,
  animationDuration = 300,
}: SimpleListProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  // Estilos de animação
  const getAnimationStyle = (index: number) => {
    if (animationType === "none") return {};

    const delay = index * animationDelay;
    const baseStyle = {
      transition: `all ${animationDuration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible) {
      if (animationType === "fade") {
        return { ...baseStyle, opacity: 0 };
      } else if (animationType === "slide") {
        return { ...baseStyle, opacity: 0, transform: "translateY(20px)" };
      } else if (animationType === "bounce") {
        return { ...baseStyle, opacity: 0, transform: "scale(0.8)" };
      }
    }

    return { ...baseStyle, opacity: 1, transform: "translateY(0) scale(1)" };
  };

  // Renderizar bullet personalizado se necessário
  const renderBullet = () => {
    if (bullet === "custom") {
      return <span className={`${bulletColor} mr-2`}>{customBullet}</span>;
    }
    return null;
  };

  return (
    <ul
      className={`flex flex-col ${spacing} ${
        bullet !== "custom" ? `list-${bullet} ${bulletColor}` : "list-none"
      } ${className}`}
    >
      {items.map((item, idx) => (
        <li
          key={idx}
          className={`${itemClassName} ${
            bullet === "custom" ? "flex items-start" : ""
          }`}
          style={getAnimationStyle(idx)}
        >
          {bullet === "custom" && renderBullet()}
          {item}
        </li>
      ))}
    </ul>
  );
}

// Novo componente IconList
export function IconList({
  items,
  icon,
  className = "",
  itemClassName = "",
  iconPosition = "left",
  iconColor = "text-white",
  iconBackground = "bg-blue-500",
  spacing = "gap-4",
  animationType = "fade",
  animationDelay = 100,
  animationDuration = 300,
}: IconListProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  // Estilos de animação
  const getAnimationStyle = (index: number) => {
    if (animationType === "none") return {};

    const delay = index * animationDelay;
    const baseStyle = {
      transition: `all ${animationDuration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible) {
      if (animationType === "fade") {
        return { ...baseStyle, opacity: 0 };
      } else if (animationType === "slide") {
        return { ...baseStyle, opacity: 0, transform: "translateX(20px)" };
      } else if (animationType === "bounce") {
        return { ...baseStyle, opacity: 0, transform: "scale(0.8)" };
      }
    }

    return { ...baseStyle, opacity: 1, transform: "translateX(0) scale(1)" };
  };

  return (
    <ul className={`flex flex-col ${spacing} ${className}`}>
      {items.map((item, idx) => (
        <li
          key={idx}
          className={`flex items-start ${
            iconPosition === "right" ? "flex-row-reverse" : ""
          } ${itemClassName}`}
          style={getAnimationStyle(idx)}
        >
          <div
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${iconBackground} ${iconColor} ${
              iconPosition === "right" ? "ml-3" : "mr-3"
            }`}
          >
            {icon}
          </div>
          <span className="mt-0.5">{item}</span>
        </li>
      ))}
    </ul>
  );
}
