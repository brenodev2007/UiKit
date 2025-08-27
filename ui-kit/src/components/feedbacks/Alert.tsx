import { useState } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";

export type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const variantStyles = {
  success: {
    bg: "bg-green-50 border-green-200",
    text: "text-green-800",
    icon: "text-green-400",
    iconComponent: <FiCheckCircle className="w-5 h-5" />,
  },
  error: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    icon: "text-red-400",
    iconComponent: <FiAlertCircle className="w-5 h-5" />,
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-200",
    text: "text-yellow-800",
    icon: "text-yellow-400",
    iconComponent: <FiAlertTriangle className="w-5 h-5" />,
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-800",
    icon: "text-blue-400",
    iconComponent: <FiInfo className="w-5 h-5" />,
  },
};

export default function Alert({
  variant = "info",
  title,
  message,
  dismissible = false,
  onDismiss,
  className = "",
  icon,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const styles = variantStyles[variant];

  return (
    <div
      className={`
        relative flex items-start gap-3 p-4 rounded-lg border
        ${styles.bg}
        ${className}
      `}
      role="alert"
    >
      <span className={`flex-shrink-0 mt-0.5 ${styles.icon}`}>
        {icon || styles.iconComponent}
      </span>

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`font-semibold mb-1 ${styles.text}`}>{title}</h4>
        )}
        <p className={`text-sm ${styles.text}`}>{message}</p>
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className={`
            flex-shrink-0 p-1 rounded-md transition-colors
            hover:bg-white hover:bg-opacity-20
            ${styles.text}
          `}
          aria-label="Fechar alerta"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
