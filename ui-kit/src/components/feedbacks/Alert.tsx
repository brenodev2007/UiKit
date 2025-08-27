import { useState } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode; // ex: botões extras
}

const variantStyles = {
  success: {
    bg: "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700",
    text: "text-green-800 dark:text-green-100",
    icon: "text-green-500",
    iconComponent: <FiCheckCircle className="w-5 h-5" />,
  },
  error: {
    bg: "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700",
    text: "text-red-800 dark:text-red-100",
    icon: "text-red-500",
    iconComponent: <FiAlertCircle className="w-5 h-5" />,
  },
  warning: {
    bg: "bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700",
    text: "text-yellow-800 dark:text-yellow-100",
    icon: "text-yellow-500",
    iconComponent: <FiAlertTriangle className="w-5 h-5" />,
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700",
    text: "text-blue-800 dark:text-blue-100",
    icon: "text-blue-500",
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
  actions,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const styles = variantStyles[variant];

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
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

          <div className="flex-1 min-w-0 break-words">
            {title && (
              <h4 className={`font-semibold mb-1 ${styles.text}`}>{title}</h4>
            )}
            <p className={`text-sm ${styles.text}`}>{message}</p>
            {actions && <div className="mt-2 flex gap-2">{actions}</div>}
          </div>

          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`
                flex-shrink-0 p-1 rounded-md transition-colors
                hover:bg-black/5 dark:hover:bg-white/10
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${variant}
                ${styles.text}
              `}
              aria-label="Fechar alerta"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
