import React, { useState, useRef, useEffect } from "react";
import { CheveronDownIcon } from "@/shared/icons/CheveronDown";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";
import type { SelectOption } from "@/shared/hooks/useCachedPaginatedOptions";
import { decisionOptions } from "@/shared/constants/procedursOptions";

interface UserTaskFilter {
  onFilterChange: (status: string) => void;
  currentFilter?: string;
  filterOptions?: SelectOption[];
}

export const UserTaskFilter: React.FC<UserTaskFilter> = ({
  onFilterChange,
  currentFilter = "all",
  filterOptions = [{ value: "all", label: "جميع الحالات" }, ...decisionOptions],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getCurrentLabel = () => {
    const option = filterOptions.find((opt) => opt.value === currentFilter);
    return option ? option.label : "جميع الحالات";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <HeaderActionButton
        variant="outline"
        label={getCurrentLabel() as string}
        icon={
          <CheveronDownIcon
            className={`size-4 text-[#A0AEC0] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        }
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
        className="h-12.5 flex-1 rounded-[18px] md:w-full md:max-w-[140px]"
      />

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
          {filterOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(String(option.value))}
              className={`w-full px-4 py-2.5 text-right text-sm transition-colors duration-150 hover:bg-gray-50 ${currentFilter === option.value ? "bg-primary-50 text-primary-600 font-medium" : "text-gray-700"} ${index !== filterOptions.length - 1 ? "border-b border-gray-50" : ""} `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
