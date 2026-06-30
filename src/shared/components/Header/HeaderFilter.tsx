import React, { useState, useMemo, useRef, useEffect } from "react";
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
  showSearch?: boolean;
  onSearchChange?: (value: string) => void;
  onChange?: (value: string) => void;
  onScrollEnd?: () => void;
}

export const HeaderFilter: React.FC<HeaderFilterProps> = ({
  options,
  onFilterChange,
  defaultValue,
  placeholder,
  className,
  value,
  showSearch = false,
  onSearchChange,
  onChange,
  onScrollEnd,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && showSearch) {
      setTimeout(() => searchRef.current?.focus(), 0);
    } else {
      setSearch("");
    }
  }, [open, showSearch]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    onSearchChange?.(val);
  };

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(lower) ||
        opt.value.toLowerCase().includes(lower),
    );
  }, [search, options]);

  return (
    <div className={cn("w-full md:min-w-35", className)}>
      <Select
        open={open}
        onOpenChange={setOpen}
        onValueChange={(val) => {
          onFilterChange(val);
          onChange?.(val);
        }}
        defaultValue={defaultValue}
        value={value}
      >
        <SelectTrigger className="text-primary-text h-12.5 w-full rounded-[18px] border-[#E2E8F0] bg-white transition-all outline-none focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className="w-(--radix-select-trigger-width) rounded-[18px] p-2"
          onCloseAutoFocus={(e) => e.preventDefault()}
          onScroll={(e) => {
            const el = e.currentTarget;
            const isAtBottom =
              el.scrollHeight - el.scrollTop - el.clientHeight < 40;
            if (isAtBottom) onScrollEnd?.();
          }}
        >
          {showSearch && (
            <input
              ref={searchRef}
              type="text"
              placeholder="بحث..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="mb-2 w-full rounded-[10px] border border-[#E2E8F0] px-2 py-1 text-sm focus:outline-none"
            />
          )}
          {filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
