import React from "react";
import { useField, useFormikContext } from "formik";
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

type SelectFormProps = {
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};

export const SelectForm: React.FC<SelectFormProps> = ({
    name,
    label,
    options,
    placeholder,
    disabled,
    className,
}) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    return (
        <div className={cn("flex flex-col w-full", className)}>
            <label className="block mb-4 text-sm font-normal text-[#1A1A1A]">
                {label}
            </label>
            <Select
                disabled={disabled}
                onValueChange={(value) => setFieldValue(name, value)}
                value={field.value}
            >
                <SelectTrigger
                    className={cn(
                        "w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] h-[50px] text-[#464646] text-base font-normal disabled:opacity-70",
                        meta.touched && meta.error && "border-red-500"
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
            {meta.touched && meta.error && (
                <span className="text-xs text-red-500 mt-1">{meta.error}</span>
            )}
        </div>
    );
};
