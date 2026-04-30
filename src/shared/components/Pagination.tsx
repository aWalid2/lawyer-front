import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const getPageNumbers = (): (number | string)[] => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];
        let l: number | undefined;

        for (let i = totalPages; i >= 1; i--) {
            if (
                i === totalPages ||
                i === 1 ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        const uniqueRange = [...new Set(range)].sort((a, b) => b - a);

        uniqueRange.forEach((i) => {
            if (l) {
                if (l - i === 2) {
                    rangeWithDots.push(l - 1);
                } else if (l - i !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    return (
        <div className="flex items-center justify-end px-4 py-3">
            <div className="flex items-center gap-2 justify-end">
                <button
                    onClick={() => {
                        if (currentPage > 1) {
                            onPageChange(currentPage - 1);
                        }
                    }}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-xl border transition-colors ${currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100 dark:bg-muted dark:text-muted-foreground dark:border-transparent dark:opacity-50"
                            : "bg-gray-200 text-black hover:bg-gray-300 border-gray-200 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 dark:border-transparent"
                        }`}
                    title="السابق"
                >
                    <ChevronRight size={18} className="text-black dark:text-white" />
                </button>

                <div className="flex items-center gap-1" dir="ltr">
                    {getPageNumbers().map((page, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (typeof page === "number") {
                                    onPageChange(page);
                                }
                            }}
                            disabled={page === "..."}
                            className={`min-w-[36px] h-9 px-2 rounded-xl text-sm font-medium transition-colors ${page === currentPage
                                    ? "bg-primary text-white"
                                    : page === "..."
                                        ? "cursor-default bg-transparent dark:text-foreground"
                                        : "bg-gray-200 text-black hover:bg-gray-300 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => {
                        if (currentPage < totalPages) {
                            onPageChange(currentPage + 1);
                        }
                    }}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-xl border transition-colors ${currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100 dark:bg-muted dark:text-muted-foreground dark:border-transparent dark:opacity-50"
                            : "bg-gray-200 text-black hover:bg-gray-300 border-gray-200 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 dark:border-transparent"
                        }`}
                    title="التالي"
                >
                    <ChevronLeft size={18} className="text-black dark:text-white" />
                </button>
            </div>
        </div>
    );
};
