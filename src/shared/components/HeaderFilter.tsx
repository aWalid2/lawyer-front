import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface HeaderFilterOption {
  value: string;
  label: string;
}

interface HeaderFilterProps {
  options: HeaderFilterOption[];
  onFilterChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  value?: string;
}

export const HeaderFilter: React.FC<HeaderFilterProps> = ({
  options,
  onFilterChange,
  defaultValue,
  placeholder,
  className,
  value,
}) => {
  return (
    <div className={cn("w-full md:w-[140px]", className)}>
      <Select onValueChange={onFilterChange} defaultValue={defaultValue} value={value}>
        <SelectTrigger className="w-full h-12.5 rounded-[18px] border-[#E2E8F0] bg-white text-primary-text focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 outline-none transition-all">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="w-(--radix-select-trigger-width) rounded-[18px]">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
