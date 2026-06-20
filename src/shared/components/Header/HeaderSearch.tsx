import React from "react";
import { SearchIcon } from "@/shared/icons/Search";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface HeaderSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  minSearchLength?: number;
  invalidSearchMessage?: string;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "بحث ...",
  className,
  minSearchLength = 2,
  invalidSearchMessage = "الرجاء إدخال أكثر من حرف واحد للبحث",
}) => {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div
      className={cn(
        "relative ms-0 w-full min-w-50 flex-1 px-0 md:max-w-2xl md:px-4",
        className,
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => {
          const val = e.target.value;
          setLocalValue(val);
          if (val === "") {
            onChange?.("");
            onSearch?.("");
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            const trimmedValue = localValue.trim();
            if (
              trimmedValue.length > 0 &&
              trimmedValue.length < minSearchLength
            ) {
              toast.error(invalidSearchMessage);
              return;
            }
            onSearch?.(localValue);
            onChange?.(localValue);
          }
        }}
        className="h-12.5 w-full min-w-50 rounded-[18px] border border-[#E2E8F0] bg-white pr-12 pl-4 text-right text-sm transition-all outline-none focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 md:max-w-113.5 dark:border-white/40 dark:bg-transparent dark:text-white dark:focus:border-[#BF9A61] dark:focus:ring-[#BF9A61]/20"
      />
      <SearchIcon className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-[#94A3B8] md:right-8" />
    </div>
  );
};
