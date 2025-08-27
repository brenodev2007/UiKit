import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  className?: string;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
}

export default function Tabs({
  tabs,
  defaultActiveTab,
  className = "",
  variant = "default",
  size = "md",
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const variantStyles = {
    default: {
      container: "border-b border-gray-200",
      tab: "border-b-2 border-transparent",
      active: "border-blue-600 text-blue-600",
      inactive: "text-gray-500 hover:text-gray-700 hover:border-gray-300",
    },
    pills: {
      container: "space-x-1",
      tab: "rounded-lg",
      active: "bg-blue-600 text-white",
      inactive: "text-gray-500 hover:bg-gray-100",
    },
    underline: {
      container: "space-x-6 border-b border-gray-200",
      tab: "border-b-2 border-transparent",
      active: "border-blue-600 text-blue-600",
      inactive: "text-gray-500 hover:text-gray-700",
    },
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const currentVariant = variantStyles[variant];

  return (
    <div className={className}>
      {/* Tab headers */}
      <div className={`flex ${currentVariant.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={`
              font-medium transition-all duration-200
              ${sizeStyles[size]}
              ${currentVariant.tab}
              ${
                activeTab === tab.id
                  ? currentVariant.active
                  : currentVariant.inactive
              }
              ${
                tab.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
              whitespace-nowrap
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
