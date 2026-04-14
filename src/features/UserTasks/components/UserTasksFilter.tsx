import React, { useState, useRef, useEffect } from "react";
import { CheveronDownIcon } from "@/shared/icons/CheveronDown";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";

interface UserTaskFilter {
  onFilterChange: (status: string) => void;
  currentFilter?: string;
  filterOptions?: Array<{ value: string; label: string }>; // أضف هذا السطر
}

export const UserTaskFilter: React.FC<UserTaskFilter> = ({
  onFilterChange,
  currentFilter = "all",
  filterOptions = [
    { value: "all", label: "جميع الحالات" },
    { value: "done", label: "مُنجزة" },
    { value: "late", label: "متأخرة" },
    { value: "in_progress", label: "قيد التنفيذ" },
    { value: "pending", label: "قيد الانتظار" },
  ]
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getCurrentLabel = () => {
    const option = filterOptions.find(opt => opt.value === currentFilter);
    return option ? option.label : "جميع الحالات";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        label={getCurrentLabel()}
        icon={<CheveronDownIcon className={`size-4 text-[#A0AEC0] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
        className="flex-1 md:w-full md:max-w-[140px] rounded-[18px] h-12.5"
      />

      {/* القائمة المنسدلة */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden">
          {filterOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150
                ${currentFilter === option.value ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'}
                ${index !== filterOptions.length - 1 ? 'border-b border-gray-50' : ''}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};