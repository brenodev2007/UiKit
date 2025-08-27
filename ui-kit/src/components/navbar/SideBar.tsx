import { useState } from "react";
import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiSettings,
  FiChevronLeft,
  FiMenu,
} from "react-icons/fi";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  icon,
  label,
  href,
  isActive = false,
  onClick,
}: SidebarItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}

export default function Sidebar({
  isOpen = true,
  onToggle,
  className = "",
}: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiHome />, href: "#" },
    { id: "analytics", label: "Analytics", icon: <FiPieChart />, href: "#" },
    { id: "users", label: "Users", icon: <FiUsers />, href: "#" },
    { id: "settings", label: "Settings", icon: <FiSettings />, href: "#" },
  ];

  return (
    <aside
      className={`
        bg-white shadow-lg border-r border-gray-200
        transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen && (
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isOpen ? "Recolher sidebar" : "Expandir sidebar"}
        >
          {isOpen ? <FiChevronLeft /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={isOpen ? item.label : ""}
            href={item.href}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </nav>

      {/* User profile (optional) */}
      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-sm text-gray-500 truncate">
                admin@example.com
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
