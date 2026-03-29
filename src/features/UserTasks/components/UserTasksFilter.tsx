import React, { useState, useRef, useEffect } from "react";
import { CheveronDownIcon } from "@/shared/icons/CheveronDown";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";

interface UserTaskFilter {
  onFilterChange: (status: string) => void;
  currentFilter?: string;
}

export const UserTaskFilter: React.FC<UserTaskFilter> = ({
  onFilterChange,
  currentFilter = "all"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    { value: "all", label: "جميع الحالات" },
    { value: "مُنجزة", label: "مُنجزة" },
    { value: "متأخرة", label: "متأخرة" },
    { value: "قيد التنفيذ", label: "قيد التنفيذ" },
  ];

  const getCurrentLabel = () => {
    const option = statusOptions.find(opt => opt.value === currentFilter);
    return option ? option.label : "جميع الحالات";
  };

  // إغلاق القائمة عند النقر خارجها
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
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150
                ${currentFilter === option.value ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'}
                ${option.value !== 'all' ? 'border-b border-gray-50' : ''}
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