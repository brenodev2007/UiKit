import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";

export type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastProps {
  variant?: ToastVariant;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const variantStyles = {
  success: {
    bg: "bg-green-500",
    icon: <FiCheckCircle className="w-5 h-5" />,
  },
  error: {
    bg: "bg-red-500",
    icon: <FiAlertCircle className="w-5 h-5" />,
  },
  warning: {
    bg: "bg-yellow-500",
    icon: <FiAlertTriangle className="w-5 h-5" />,
  },
  info: {
    bg: "bg-blue-500",
    icon: <FiInfo className="w-5 h-5" />,
  },
};

const positionStyles = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};

export default function Toast({
  variant = "info",
  title,
  message,
  duration = 5000,
  onClose,
  position = "top-right",
}: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = variantStyles[variant];

  return (
    <div
      className={`
        fixed ${positionStyles[position]} z-50
        transform transition-all duration-300
        ${
          isLeaving ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }
      `}
    >
      <div
        className={`
          flex items-start gap-3 p-4 rounded-lg shadow-lg
          text-white min-w-80 max-w-sm
          ${styles.bg}
        `}
        role="alert"
      >
        <span className="flex-shrink-0 mt-0.5">{styles.icon}</span>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold mb-1">{title}</h4>
          {message && <p className="text-sm opacity-90">{message}</p>}
        </div>

        <button
          onClick={() => {
            setIsLeaving(true);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 p-1 rounded-md transition-colors hover:bg-white hover:bg-opacity-20"
          aria-label="Fechar notificação"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
