import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Option = {
    label: string;
    value: string;
};

type SelectRHFProps = {
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    onChange?: (value: string) => void;
};

export const SelectRHF: React.FC<SelectRHFProps> = ({
    name,
    label,
    options,
    placeholder,
    disabled,
    className,
    onChange,
}) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name];

    return (
        <div className={cn("flex flex-col w-full", className)}>
            <label className="block mb-4 text-sm font-normal text-[#1A1A1A]">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        disabled={disabled}
                        onValueChange={(value) => {
                            field.onChange(value);
                            onChange?.(value);
                        }}
                        value={field.value}
                    >
                        <SelectTrigger
                            className={cn(
                                "w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] h-[50px] text-[#464646] text-base font-normal disabled:opacity-70",
                                error && "border-red-500"
                            )}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="w-(--radix-select-trigger-width)">
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {error && (
                <span className="text-xs text-red-500 mt-1">{error.message as string}</span>
            )}
        </div>
    );
};
