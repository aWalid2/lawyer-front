
import React from "react";
import { useField, useFormikContext } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  label: React.ReactNode;
  value: string | number;
};

type SelectFormProps = {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showSearch?: boolean;
  onSearchChange?: (value: string) => void;
  onChange?: (value: string | number) => void;
  hasMoreOptions?: boolean;
  isFetchingMore?: boolean;
  onReachEnd?: () => void;
};

export const SelectForm: React.FC<SelectFormProps> = ({
  name,
  label,
  options,
  placeholder,
  disabled,
  className,
  showSearch = false,
  onSearchChange,
  onChange,
  hasMoreOptions,
  isFetchingMore,
  onReachEnd,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [open, setOpen] = React.useState(false);

  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sentinelRef.current || !onReachEnd || isFetchingMore || !hasMoreOptions) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onReachEnd();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onReachEnd, isFetchingMore, hasMoreOptions]);

  const handleValueChange = (value: string | number) => {
    const finalValue = typeof field.value === "number" ? Number(value) : value;
    setFieldValue(name, finalValue);
    onChange?.(finalValue);
  };

  const selectedOption = options.find(
    (opt) => String(opt.value) === String(field.value),
  );

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label className="mb-4 block text-sm font-normal text-[#1A1A1A]">
        {label}
      </label>

      {showSearch ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            <button
              type="button"
              className={cn(
                "flex h-12.5 w-full items-center justify-between rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] px-3 py-2 text-base font-normal text-[#464646] outline-none disabled:opacity-70",
                meta.touched && meta.error && "border-red-500",
                !field.value && "text-muted-foreground",
              )}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {selectedOption
                  ? selectedOption.label
                  : placeholder || "اختر..."}
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0"
            align="start"
          >
            <Command className="w-full" dir="rtl">
              <CommandInput
                placeholder="بحث..."
                className="h-10"
                onValueChange={onSearchChange}
              />
              <CommandList>
                <CommandEmpty>لا توجد نتائج</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={String(option.value)}
                      value={`${typeof option.label === "string" ? option.label : String(option.value)}_${String(option.value)}`}
                      onSelect={() => {
                        handleValueChange(option.value);
                        setOpen(false);
                      }}
                      className={cn(
                        "data-[selected=true]:bg-primary/90 data-[selected=true]:text-primary-foreground flex cursor-pointer items-center justify-between",
                        String(field.value) === String(option.value) &&
                        "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground data-[selected=true]:bg-primary! data-[selected=true]:text-primary-foreground!",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {option.label}
                      </div>
                      <Check
                        className={cn(
                          "h-4 w-4",
                          String(field.value) === String(option.value)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                  
                  {hasMoreOptions && (
                    <div ref={sentinelRef} className="flex justify-center py-2">
                      {isFetchingMore ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : null}
                    </div>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <Select
          disabled={disabled}
          onValueChange={handleValueChange}
          value={String(field.value || "")}
        >
          <SelectTrigger
            className={cn(
              "h-12.5 w-full rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] p-3 text-base font-normal text-[#464646] disabled:opacity-70",
              meta.touched && meta.error && "border-red-500",
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {selectedOption ? selectedOption.label : placeholder || "اختر..."}
            </div>
          </SelectTrigger>
          <SelectContent className="w-(--radix-select-trigger-width)">
            {options.map((option) => (
              <SelectItem
                key={String(option.value)}
                value={String(option.value)}
                className="data-[state=checked]:bg-primary! data-[state=checked]:text-primary-foreground! data-highlighted:bg-primary/90! data-highlighted:text-primary-foreground!"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {meta.touched && meta.error && (
        <span className="mt-1 text-xs text-red-500">{meta.error}</span>
      )}
    </div>
  );
};
