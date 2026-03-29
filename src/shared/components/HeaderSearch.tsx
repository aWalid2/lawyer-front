import React from "react";
import { SearchIcon } from "@/shared/icons/Search";
import { cn } from "@/lib/utils";

interface HeaderSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  value,
  onChange,
  placeholder = "بحث ...",
  className,
}) => {
  return (
    <div className={cn("flex-1 w-full md:max-w-2xl px-0 md:px-4 relative ms-0 lg:ms-48", className)}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:max-w-[454px] h-12.5 pl-4 pr-12 rounded-[18px] border border-[#E2E8F0] focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 outline-none text-sm transition-all text-right bg-white"
      />
      <SearchIcon className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 size-5 text-[#94A3B8] pointer-events-none" />
    </div>
  );
};
