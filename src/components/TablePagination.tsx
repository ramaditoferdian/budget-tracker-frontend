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
  const [inputPage, setInputPage] = useState<string>(currentPage ? String(currentPage) : '');

  useEffect(() => {
    setInputPage(String(currentPage));
  }, [currentPage]);

  const handleJumpToPage = () => {
    // Jika input kosong, set ke halaman 1
    if (!inputPage.trim()) {
      onPageChange(1);
      return;
    }

    // Validasi input: pastikan antara 1 dan totalPages
    const validPage = Math.max(1, Math.min(Number(inputPage), totalPages));
    onPageChange(validPage);
  };

  const isPrevDisabled = currentPage <= 1 || !inputPage.trim();
  const isNextDisabled = currentPage >= totalPages || !inputPage.trim();

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-end justify-between mt-6 gap-4 text-sm mb-16">
      {/* Desktop: Show total rows */}
      <div className="flex flex-col items-start gap-2 sm:ml-4">
        <span className="hidden sm:flex text-gray-600">Total Rows: {rowsCount}</span>
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
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        

        {/* Page Navigation */}
        <div className="flex items-center gap-4">
          <button
            className={`p-2 hover:bg-gray-200 rounded-md transition ${isPrevDisabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
            disabled={isPrevDisabled}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Input */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Page</span>
            <input
              type="number"
              className="w-16 text-center border rounded-md py-1 px-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleJumpToPage();
              }}
              placeholder="Enter page"
            />
            <span className="text-gray-600">of {totalPages}</span>
          </div>

          <button
            className={`p-2 hover:bg-gray-200 rounded-md transition ${isNextDisabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
            disabled={isNextDisabled}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Mobile: Show total rows at the bottom */}
      <div className="sm:hidden flex items-center gap-2">
        <span className="text-gray-600">Total Rows: {rowsCount}</span>
      </div>
    </div>
  );
};

export default TablePagination;
