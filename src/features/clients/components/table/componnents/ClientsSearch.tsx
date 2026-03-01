// src/components/clients/ClientsSearch.tsx
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import type { ClientsSearchProps } from "../../clientDetails/components/typesClientDetails";
import { Link } from "react-router-dom";

export const ClientsSearch: React.FC<ClientsSearchProps> = ({
  onSearch,
  onAddNew,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Debounce للبحث
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 2 || searchTerm.length === 0) {
        onSearch(searchTerm);
        setError("");
      } else if (searchTerm.length === 1) {
        setError("البحث يحتاج على الأقل حرفين");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4 w-full">
      {/* العنوان على اليمين */}
      <h1 className="text-sm sm:text-lg md:text-xl tracking-tight whitespace-nowrap order-1">
        الموكلين
      </h1>

      {/* السيرش في النص - HTML عادي */}
      <div className="relative flex-1 min-w-0 max-w-none sm:max-w-xs md:max-w-md order-2 mx-auto">
        <div className="flex items-center justify-center w-full">
          <div className="relative w-full">
            <Search className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="بحث ..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-9 sm:h-10 md:h-[50px] text-xs sm:text-sm md:text-base border rounded-lg md:rounded-xl pr-8 sm:pr-10 md:pr-12 px-2 md:px-4 focus:outline-none bg-gray-50"
            />

            {/* زر المسح - يظهر لما يكون في قيمة */}
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm flex-shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <p className="text-red-500 text-xs mt-1 text-right">{error}</p>
        )}
      </div>

      <Link
        to="/dashboard/clients/add-client"
        onClick={onAddNew}
        className="flex items-center justify-center gap-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-white text-xs md:text-base font-cairo rounded-lg md:rounded-[12px] transition-all whitespace-nowrap h-9 sm:h-10 md:h-[50px] relative overflow-hidden flex-shrink-0 order-3 w-full sm:w-auto"
        style={{
          background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
        }}
      >
        <span className="relative z-10">+ موكل جديد</span>
        <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-black"></div>
      </Link>
    </div>
  );
};