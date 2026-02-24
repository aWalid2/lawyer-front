// src/components/clients/ClientsSearch.tsx
import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import type { ClientsSearchProps } from './types';

export const ClientsSearch: React.FC<ClientsSearchProps> = ({ 
  onSearch, 
  onAddNew 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Debounce للبحث
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 2 || searchTerm.length === 0) {
        onSearch(searchTerm);
        setError('');
      } else if (searchTerm.length === 1) {
        setError('البحث يحتاج على الأقل حرفين');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {/* العنوان على اليمين */}
      <h1 className="text-2xl font-Cairo tracking-tight whitespace-nowrap">
        الموكلين
      </h1>

      {/* السيرش في النص - HTML عادي */}
      <div className="relative flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="بحث ..."
            value={searchTerm}
            onChange={handleSearchChange}
            className= "w-full pr-9 h-9 text-sm border rounded-xl px-3 py-1 focus:outline-none  "
          />
          
          {/* زر المسح - يظهر لما يكون في قيمة */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute left-2 top-1.5 text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <p className="text-red-500 text-xs mt-1 text-right">
            {error}
          </p>
        )}
      </div>

      <button
        onClick={onAddNew}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-cairo rounded-[12px] hover:bg-primary/90 transition-colors whitespace-nowrap w-[137px] h-[50px] justify-center"
      >
        <Plus className="h-4 w-4" />
        موكل جديد
      </button>
    </div>
  );
};

export default ClientsSearch;