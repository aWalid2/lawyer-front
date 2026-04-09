// SelectForm.tsx
import React from "react";
import { useField, useFormikContext } from "formik";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
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
import { Check, ChevronDown } from "lucide-react";
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
    showSearch?: boolean; // New optional prop
    onChange?: (value: string | number) => void;
};

export const SelectForm: React.FC<SelectFormProps> = ({
    name,
    label,
    options,
    placeholder,
    disabled,
    className,
    showSearch = false,
    onChange,
}) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    const [open, setOpen] = React.useState(false);

    const handleValueChange = (value: string | number) => {
        const finalValue = typeof field.value === 'number'
            ? Number(value)
            : value;
        setFieldValue(name, finalValue);
        onChange?.(finalValue);
    };

    const selectedOption = options.find((opt) => String(opt.value) === String(field.value));

    return (
        <div className={cn("flex flex-col w-full", className)}>
            <label className="block mb-4 text-sm font-normal text-[#1A1A1A]">
                {label}
            </label>

            {showSearch ? (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild disabled={disabled}>
                        <button
                            type="button"
                            className={cn(
                                "flex h-[50px] w-full items-center justify-between rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] px-3 py-2 text-base font-normal text-[#464646] outline-none disabled:opacity-70",
                                meta.touched && meta.error && "border-red-500",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                {selectedOption ? selectedOption.label : (placeholder || "اختر...")}
                            </div>
                            <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <Command className="w-full" dir="rtl">
                            <CommandInput placeholder="بحث..." className="h-10" />
                            <CommandList>
                                <CommandEmpty>لا توجد نتائج</CommandEmpty>
                                <CommandGroup>
                                    {options.map((option) => (
                                        <CommandItem
                                            key={String(option.value)}
                                            value={String(option.value)}
                                            onSelect={() => {
                                                handleValueChange(option.value);
                                                setOpen(false);
                                            }}
                                            className="flex items-center justify-between cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                {option.label}
                                            </div>
                                            <Check
                                                className={cn(
                                                    "h-4 w-4",
                                                    String(field.value) === String(option.value)
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
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
                            "w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] h-[50px] text-[#464646] text-base font-normal disabled:opacity-70",
                            meta.touched && meta.error && "border-red-500"
                        )}
                    >
                        {/* Use custom content for the trigger to ensure flags are shown */}
                        <div className="flex items-center gap-2 overflow-hidden">
                            {selectedOption ? selectedOption.label : (placeholder || "اختر...")}
                        </div>
                    </SelectTrigger>
                    <SelectContent className="w-[var(--radix-select-trigger-width)]">
                        {options.map((option) => (
                            <SelectItem key={String(option.value)} value={String(option.value)}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {meta.touched && meta.error && (
                <span className="text-xs text-red-500 mt-1">{meta.error}</span>
            )}
        </div>
    );
};