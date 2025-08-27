import { FiHome, FiChevronRight } from "react-icons/fi";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  homeIcon?: boolean;
}

export default function Breadcrumbs({
  items,
  className = "",
  homeIcon = true,
}: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-2 ${className}`}>
      {homeIcon && (
        <>
          <a
            href="/"
            className="text-gray-500 hover:text-blue-600 transition-colors"
            aria-label="Home"
          >
            <FiHome className="w-4 h-4" />
          </a>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
        </>
      )}

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <FiChevronRight className="w-4 h-4 text-gray-400" />}
          <a
            href={item.href}
            className={`text-sm transition-colors ${
              index === items.length - 1
                ? "text-gray-900 font-medium"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {item.label}
          </a>
        </div>
      ))}
    </nav>
  );
}
