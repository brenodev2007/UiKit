import { useState } from "react";
import { BasicTable, type BasicTableProps } from "./Table";

interface PaginatedTableProps extends BasicTableProps {
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  paginationClassName?: string;
  showPageInfo?: boolean;
  showRowsPerPage?: boolean;
  paginationVariant?: "default" | "minimal" | "detailed";
  paginationPosition?: "left" | "center" | "right";
  onPageChange?: (page: number, rowsPerPage: number) => void;
  labels?: {
    pageInfo?: (start: number, end: number, total: number) => string;
    rowsPerPage?: string;
    firstPage?: string;
    prevPage?: string;
    nextPage?: string;
    lastPage?: string;
  };
  icons?: {
    first?: React.ReactNode;
    prev?: React.ReactNode;
    next?: React.ReactNode;
    last?: React.ReactNode;
  };
}

export function PaginatedTable({
  rowsPerPage: initialRowsPerPage = 5,
  rowsPerPageOptions = [5, 10, 25, 50],
  paginationClassName = "",
  showPageInfo = true,
  showRowsPerPage = true,
  paginationVariant = "default",
  paginationPosition = "right",
  onPageChange,
  labels = {
    pageInfo: (start, end, total) =>
      `Mostrando ${start}–${end} de ${total} resultados`,
    rowsPerPage: "Linhas por página:",
    firstPage: "Primeira página",
    prevPage: "Página anterior",
    nextPage: "Próxima página",
    lastPage: "Última página",
  },
  icons = {},
  ...props
}: PaginatedTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const totalPages = Math.ceil(props.data.length / rowsPerPage);
  const start = page * rowsPerPage;
  const end = Math.min(start + rowsPerPage, props.data.length);
  const pageData = props.data.slice(start, end);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    const newTotalPages = Math.ceil(props.data.length / newRowsPerPage);
    const newPage = Math.min(page, newTotalPages - 1);
    setRowsPerPage(newRowsPerPage);
    setPage(newPage);
    onPageChange?.(newPage, newRowsPerPage);
  };

  const goToFirstPage = () => handlePageChange(0);
  const goToPreviousPage = () => handlePageChange(page - 1);
  const goToNextPage = () => handlePageChange(page + 1);
  const goToLastPage = () => handlePageChange(totalPages - 1);

  // 🔹 Estilos baseados na variante
  const getPaginationStyles = () => {
    const baseButton =
      "px-3 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

    switch (paginationVariant) {
      case "minimal":
        return {
          container: "flex items-center gap-2",
          button: `${baseButton} text-gray-700 hover:bg-gray-100 focus:ring-blue-500`,
          activeButton: `${baseButton} bg-blue-100 text-blue-700 font-semibold`,
          disabledButton: "opacity-50 cursor-not-allowed",
          select: "px-2 py-1 border border-gray-300 rounded-md text-sm",
        };
      case "detailed":
        return {
          container: "flex items-center gap-2",
          button: `${baseButton} border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500`,
          activeButton: `${baseButton} bg-blue-500 text-white font-semibold border-blue-500`,
          disabledButton: "opacity-50 cursor-not-allowed",
          select:
            "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
        };
      default:
        return {
          container: "flex items-center gap-2",
          button: `${baseButton} bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-blue-500`,
          activeButton: `${baseButton} bg-blue-500 text-white font-semibold`,
          disabledButton: "opacity-50 cursor-not-allowed",
          select:
            "px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500",
        };
    }
  };

  const styles = getPaginationStyles();
  const positionClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[paginationPosition];

  const renderPageNumbers = () => {
    if (paginationVariant === "minimal") return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages);

    if (endPage - startPage < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages);
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === page ? styles.activeButton : styles.button}
          aria-current={i === page ? "page" : undefined}
        >
          {i + 1}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
      <BasicTable {...props} data={pageData} />

      {props.data.length > 0 && (
        <div className={`mt-4 ${paginationClassName}`}>
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 ${positionClass}`}
          >
            {/* Informações da página */}
            {showPageInfo && (
              <div className="text-sm text-gray-700">
                {labels.pageInfo?.(start + 1, end, props.data.length)}
              </div>
            )}

            {/* Seletor de linhas por página */}
            {showRowsPerPage &&
              props.data.length > Math.min(...rowsPerPageOptions) && (
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="rowsPerPage"
                    className="text-sm text-gray-700"
                  >
                    {labels.rowsPerPage}
                  </label>
                  <select
                    id="rowsPerPage"
                    aria-label={labels.rowsPerPage}
                    value={rowsPerPage}
                    onChange={(e) =>
                      handleRowsPerPageChange(Number(e.target.value))
                    }
                    className={styles.select}
                  >
                    {rowsPerPageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            {/* Controles de paginação */}
            <div className={styles.container}>
              <button
                onClick={goToFirstPage}
                disabled={page === 0}
                aria-disabled={page === 0}
                aria-label={labels.firstPage}
                className={`${styles.button} ${
                  page === 0 ? styles.disabledButton : ""
                }`}
              >
                {icons.first ?? "⏮"}
              </button>

              <button
                onClick={goToPreviousPage}
                disabled={page === 0}
                aria-disabled={page === 0}
                aria-label={labels.prevPage}
                className={`${styles.button} ${
                  page === 0 ? styles.disabledButton : ""
                }`}
              >
                {icons.prev ?? "◀"}
              </button>

              {renderPageNumbers()}

              <button
                onClick={goToNextPage}
                disabled={page >= totalPages - 1}
                aria-disabled={page >= totalPages - 1}
                aria-label={labels.nextPage}
                className={`${styles.button} ${
                  page >= totalPages - 1 ? styles.disabledButton : ""
                }`}
              >
                {icons.next ?? "▶"}
              </button>

              <button
                onClick={goToLastPage}
                disabled={page >= totalPages - 1}
                aria-disabled={page >= totalPages - 1}
                aria-label={labels.lastPage}
                className={`${styles.button} ${
                  page >= totalPages - 1 ? styles.disabledButton : ""
                }`}
              >
                {icons.last ?? "⏭"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
