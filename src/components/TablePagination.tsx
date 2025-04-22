'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TablePaginationProps {
  rowsCount: number;
  currentPage: number;
  pageSize: number;
  pageSizeOptions?: number[];
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  rowsCount,
  currentPage,
  pageSize,
  pageSizeOptions = [5, 10, 25, 50],
  totalPages,
  onPageChange,
  onPageSizeChange,
}) => {
  const [inputPage, setInputPage] = useState<string>(String(currentPage));

  useEffect(() => {
    setInputPage(String(currentPage));
  }, [currentPage]);

  const handleJumpToPage = () => {
    const validPage = Math.max(1, Math.min(Number(inputPage) || 1, totalPages));
    onPageChange(validPage);
  };

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-sm mb-12 sm:mb-14 md:mb-0">
      {/* Desktop: Total Rows & Rows per page */}
      <div className="hidden sm:flex flex-col items-start gap-2 sm:ml-4">
        <span className="text-gray-600">Total Rows: {rowsCount}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Show</span>
          <select
            className="px-3 py-1 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-gray-600">rows per page</span>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-2">
        {/* Mobile: Compact rows/page selector */}
        <div className="flex items-center justify-between w-full sm:hidden">
          <select
            className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>

          <span className="text-gray-500">Rows: {rowsCount}</span>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
          <button
            className={`p-2 hover:bg-gray-100 rounded-md transition ${isPrevDisabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
            disabled={isPrevDisabled}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1">
            <input
              type="number"
              className="w-14 sm:w-16 text-center border rounded-md py-1 px-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleJumpToPage();
              }}
            />
            <span className="text-gray-600 text-xs sm:text-sm">/ {totalPages}</span>
          </div>

          <button
            className={`p-2 hover:bg-gray-100 rounded-md transition ${isNextDisabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
            disabled={isNextDisabled}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
