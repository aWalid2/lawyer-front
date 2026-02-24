// src/components/clients/table/Pagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationProps } from '../../types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  // حساب نطاق الأرقام المعروضة (عكس الترتيب)
  const getPageNumbers = (): (number | string)[] => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = totalPages; i >= 1; i--) {
      if (i === totalPages || i === 1 || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    const uniqueRange = [...new Set(range)].sort((a, b) => b - a);

    uniqueRange.forEach((i) => {
      if (l) {
        if (l - i === 2) {
          rangeWithDots.push(l - 1);
        } else if (l - i !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-end px-4 py-3">
      <div className="flex items-center gap-2 justify-end">
        {/* السهم لليسار */}
        <button
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className={`p-2 rounded-xl border ${
            currentPage === 1
              ? 'bg-gray-200 text-black cursor-not-allowed'
              : 'bg-gray-200 text-black'
          }`}
          title="السابق"
        >
          <ChevronRight size={18} className="text-black" />
        </button>

        {/* أرقام الصفحات */}
        <div className="flex items-center gap-1" dir="ltr">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => {
                if (typeof page === 'number') {
                  onPageChange(page);
                }
              }}
              disabled={page === '...'}
              className={`min-w-[36px] h-9 px-2 rounded-xl text-sm font-medium ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : page === '...'
                  ? 'cursor-default bg-transparent'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* السهم لليمين */}
        <button
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-xl border ${
            currentPage === totalPages
              ? 'bg-gray-200 text-black cursor-not-allowed'
              : 'bg-gray-200 text-black'
          }`}
          title="التالي"
        >
          <ChevronLeft size={18} className="text-black" />
        </button>
      </div>
    </div>
  );
};

