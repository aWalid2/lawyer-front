import React from "react";
import { SearchIcon } from "@/components/shared/icons/Search";

interface DocumentsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const DocumentsSearch: React.FC<DocumentsSearchProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex-1 w-full md:max-w-2xl px-0 md:px-4 relative">
      <input
        type="text"
        placeholder="بحث ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:max-w-[454px] h-12.5 pl-4 pr-12 rounded-[18px] border border-[#E2E8F0] focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 outline-none text-sm transition-all text-right bg-[#F8FAFC]/50 "
      />
      <SearchIcon className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 size-5 text-[#94A3B8] pointer-events-none" />
    </div>
  );
};
