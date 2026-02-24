// src/components/clients/ClientsSearch.tsx
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import type { ClientsSearchProps } from "./types";
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
    <div className="flex items-center justify-between gap-4 w-full">
      {/* العنوان على اليمين */}
      <h1 className="text-xl tracking-tight whitespace-nowrap">الموكلين</h1>

      {/* السيرش في النص - HTML عادي */}
      <div className="relative flex-1 max-w-md">
        <div className="flex items-center justify-center w-full">
          <div className="relative w-[440px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="بحث ..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[50px] text-sm border rounded-xl px-4 pr-12 focus:outline-none "
            />

            {/* زر المسح - يظهر لما يكون في قيمة */}
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
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
        className="flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden"
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

export default ClientsSearch;
