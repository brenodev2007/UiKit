import { useState, useRef } from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

const positionStyles = {
  top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2",
  left: "right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2",
  right: "left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2",
};

const arrowStyles = {
  top: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1",
  bottom: "top-0 left-1/2 transform -translate-x-1/2 -translate-y-1",
  left: "right-0 top-1/2 transform -translate-y-1/2 translate-x-1",
  right: "left-0 top-1/2 transform -translate-y-1/2 -translate-x-1",
};

export default function Tooltip({
  content,
  children,
  position = "top",
  delay = 200,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {isVisible && (
        <div
          className={`
            absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg
            ${positionStyles[position]}
            animate-fadeIn
          `}
          role="tooltip"
        >
          {content}

          {/* Tooltip arrow */}
          <div
            className={`
              absolute w-2 h-2 bg-gray-900 transform rotate-45
              ${arrowStyles[position]}
            `}
          />
        </div>
      )}
    </div>
  );
}
