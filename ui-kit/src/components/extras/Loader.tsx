import { motion } from "framer-motion";
import clsx from "clsx";

export interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

export default function Loader({
  size = "md",
  color = "#3b82f6", // Azul Tailwind padrão
  variant = "spinner",
  className,
}: LoaderProps) {
  if (variant === "spinner") {
    return (
      <motion.div
        className={clsx(
          "rounded-full border-4 border-t-transparent",
          sizeMap[size],
          className
        )}
        style={{ borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={clsx("flex items-center justify-center gap-1", className)}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={clsx("rounded-full", sizeMap[size], className)}
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />
    );
  }

  return null;
}
