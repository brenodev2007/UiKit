import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showNumbers?: boolean;
  showPrevNext?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showNumbers = true,
  showPrevNext = true,
  size = "md",
}: PaginationProps) {
  const sizeStyles = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (start > 2) pages.push("ellipsis-start");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("ellipsis-end");

      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* Previous button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            flex items-center justify-center rounded-lg border border-gray-300
            transition-all duration-200
            ${sizeStyles[size]}
            ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:bg-gray-100 hover:border-gray-400 cursor-pointer"
            }
          `}
          aria-label="Página anterior"
        >
          <FiChevronLeft />
        </button>
      )}

      {/* Page numbers */}
      {showNumbers &&
        visiblePages.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span
                key={index}
                className={`flex items-center justify-center ${sizeStyles[size]} text-gray-400`}
              >
                <FiMoreHorizontal />
              </span>
            );
          }

          return (
            <button
              key={index}
              onClick={() => onPageChange(page as number)}
              className={`
              flex items-center justify-center rounded-lg border font-medium
              transition-all duration-200
              ${sizeStyles[size]}
              ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
              }
            `}
            >
              {page}
            </button>
          );
        })}

      {/* Next button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            flex items-center justify-center rounded-lg border border-gray-300
            transition-all duration-200
            ${sizeStyles[size]}
            ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:bg-gray-100 hover:border-gray-400 cursor-pointer"
            }
          `}
          aria-label="Próxima página"
        >
          <FiChevronRight />
        </button>
      )}
    </nav>
  );
}
