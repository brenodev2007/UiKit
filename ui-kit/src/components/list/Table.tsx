import { useState, useEffect, type ReactNode } from "react";

export interface BasicTableProps {
  headers: string[];
  data: any[][];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  striped?: boolean;
  hoverEffect?: boolean;
  border?: boolean;
  theme?: "default" | "minimal" | "elegant" | "bold" | "dark";
  rounded?: boolean;
  shadow?: boolean;
  animationType?: "fade" | "slide" | "scale" | "none";
  animationDelay?: number;
  animationDuration?: number;
  compact?: boolean;
  highlightRowOnHover?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: string;
  onRowClick?: (rowData: any[], rowIndex: number) => void;
  renderCell?: (cell: any, rowIndex: number, colIndex: number) => ReactNode;
}

export function BasicTable({
  headers,
  data,
  className = "",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
  striped = true,
  hoverEffect = true,
  border = true,
  theme = "default",
  rounded = true,
  shadow = true,
  animationType = "fade",
  animationDelay = 50,
  animationDuration = 300,
  compact = false,
  highlightRowOnHover = true,
  stickyHeader = false,
  emptyMessage = "Nenhum dado disponível",
  onRowClick,
  renderCell,
}: BasicTableProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => setIsVisible(true), []);

  // 🔹 tema
  const getThemeClasses = () => {
    switch (theme) {
      case "minimal":
        return {
          table: "border-none",
          header:
            "bg-transparent text-gray-700 font-semibold border-b border-gray-200",
          row: striped ? "even:bg-gray-50/50" : "",
          cell: "border-b border-gray-100",
          hover: "hover:bg-gray-50/70",
        };
      case "elegant":
        return {
          table: "border-none",
          header: "bg-gray-800 text-white font-medium",
          row: striped ? "even:bg-gray-100/30" : "",
          cell: "border-b border-gray-200",
          hover: "hover:bg-gray-100/50",
        };
      case "bold":
        return {
          table: "",
          header:
            "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold",
          row: striped ? "even:bg-blue-50" : "",
          cell: "border-b border-blue-100",
          hover: "hover:bg-blue-50/80",
        };
      case "dark":
        return {
          table: "bg-gray-800 text-white",
          header: "bg-gray-900 text-gray-200 font-semibold",
          row: striped ? "even:bg-gray-700" : "",
          cell: "border-b border-gray-700",
          hover: "hover:bg-gray-700/80",
        };
      default:
        return {
          table: "",
          header: "bg-gray-100 text-gray-700 font-semibold",
          row: striped ? "even:bg-gray-50" : "",
          cell: "border-b border-gray-200",
          hover: "hover:bg-gray-100",
        };
    }
  };

  const themeClasses = getThemeClasses();

  // 🔹 animação
  const getAnimationStyle = (index: number) => {
    if (animationType === "none") return {};
    const delay = index * animationDelay;
    const baseStyle = {
      transition: `all ${animationDuration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible) {
      if (animationType === "fade") return { ...baseStyle, opacity: 0 };
      if (animationType === "slide")
        return { ...baseStyle, opacity: 0, transform: "translateX(-20px)" };
      if (animationType === "scale")
        return { ...baseStyle, opacity: 0, transform: "scale(0.95)" };
    }

    return { ...baseStyle, opacity: 1, transform: "translateX(0) scale(1)" };
  };

  // 🔹 compact mode
  const compactStyles = compact
    ? { cell: "px-3 py-2 text-sm", header: "px-3 py-3 text-sm" }
    : { cell: "px-4 py-3", header: "px-4 py-3" };

  return (
    <div
      className={`overflow-hidden ${rounded ? "rounded-lg" : ""} ${
        shadow ? "shadow-md" : ""
      }`}
    >
      <div className="overflow-x-auto">
        <table
          className={`min-w-full ${themeClasses.table} ${
            border ? "border" : ""
          } ${className}`}
        >
          <thead>
            <tr>
              {headers.map((head, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`text-left ${compactStyles.header} ${
                    themeClasses.header
                  } ${
                    stickyHeader ? "sticky top-0 z-10" : ""
                  } ${headerClassName}`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={`
                    ${themeClasses.row} 
                    ${
                      hoverEffect && highlightRowOnHover
                        ? themeClasses.hover
                        : ""
                    }
                    ${
                      hoveredRow === rIdx && highlightRowOnHover
                        ? themeClasses.hover
                        : ""
                    }
                    ${onRowClick ? "cursor-pointer" : ""}
                    ${rowClassName}
                  `}
                  style={getAnimationStyle(rIdx)}
                  onMouseEnter={() => setHoveredRow(rIdx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => onRowClick && onRowClick(row, rIdx)}
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`${compactStyles.cell} ${themeClasses.cell} ${cellClassName}`}
                    >
                      {renderCell ? renderCell(cell, rIdx, cIdx) : cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-8 text-gray-500 bg-white"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
