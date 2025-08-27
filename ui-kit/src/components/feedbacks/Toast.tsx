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
  showProgress?: boolean;
  className?: string;
}

const variantStyles = {
  success: { bg: "bg-green-500", icon: <FiCheckCircle className="w-5 h-5" /> },
  error: { bg: "bg-red-500", icon: <FiAlertCircle className="w-5 h-5" /> },
  warning: {
    bg: "bg-yellow-500",
    icon: <FiAlertTriangle className="w-5 h-5" />,
  },
  info: { bg: "bg-blue-500", icon: <FiInfo className="w-5 h-5" /> },
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
  showProgress = true,
  className = "",
}: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 100 / (duration / 100) : 0));
    }, 100);

    const timer = setTimeout(() => handleClose(), duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 300);
  };

  const styles = variantStyles[variant];

  // Decide animação baseada na posição
  const exitTranslate = position.includes("left")
    ? "-translate-x-full"
    : "translate-x-full";

  return (
    <div
      className={`
        fixed ${positionStyles[position]} z-50
        transform transition-all duration-300
        ${
          isLeaving ? `${exitTranslate} opacity-0` : "translate-x-0 opacity-100"
        }
      `}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`
          flex flex-col gap-2 p-4 rounded-lg shadow-lg
          text-white w-full max-w-sm sm:min-w-[20rem]
          ${styles.bg} ${className}
        `}
      >
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 mt-0.5">{styles.icon}</span>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold mb-1">{title}</h4>
            {message && <p className="text-sm opacity-90">{message}</p>}
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-md transition-colors hover:bg-white hover:bg-opacity-20"
            aria-label="Fechar notificação"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {showProgress && (
          <div className="w-full h-1 bg-white/30 rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
