import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface HeaderMultiFilterOption {
  value: string;
  label: string;
}

interface HeaderMultiFilterProps {
  options: HeaderMultiFilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const HeaderMultiFilter: React.FC<HeaderMultiFilterProps> = ({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "اختر",
  className,
}) => {
  const [open, setOpen] = useState(false);

  const allValues = options.map((opt) => opt.value);
  const isAllSelected = allValues.every((v) => selectedValues.includes(v));

  const displayText =
    selectedValues.length === 0
      ? placeholder
      : isAllSelected
        ? "الكل"
        : `تم اختيار ${selectedValues.length}`;

  const handleToggle = (value: string) => {
    const isSelected = selectedValues.includes(value);
    const newValues = isSelected
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onSelectionChange(newValues);
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(allValues);
    }
  };

  return (
    <div className={cn("w-full md:min-w-35", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "text-primary-text flex h-12.5 w-full items-center justify-between rounded-[18px] border border-[#E2E8F0] bg-white px-3 transition-all outline-none",
              open && "border-[#BF9A61] ring-2 ring-[#BF9A61]/10",
            )}
          >
            <span className="truncate text-sm">{displayText}</span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-gray-400 transition-transform",
                open && "rotate-180",
              )}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) rounded-[18px] p-2"
          align="start"
        >
          <div className="mb-1 border-b border-[#E2E8F0] pb-1">
            <label className="flex cursor-pointer items-center gap-2 rounded-[10px] px-2 py-1.5 text-sm hover:bg-[#F8FAFC]">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
              />
              <span>الكل</span>
            </label>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-[10px] px-2 py-1.5 text-sm hover:bg-[#F8FAFC]"
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleToggle(option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
