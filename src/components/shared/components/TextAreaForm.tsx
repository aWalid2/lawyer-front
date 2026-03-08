import React from "react";
import { useField } from "formik";
import { cn } from "@/lib/utils";

type TextAreaFormProps = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  dir?: string;
};

export const TextAreaForm: React.FC<TextAreaFormProps> = ({
  name,
  label,
  placeholder,
  disabled,
  className,
  dir = "rtl",
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={cn("flex flex-col w-full", className)} dir={dir}>
      <label className="block mb-4 text-sm font-normal text-[#1A1A1A] text-right">
        {label}
      </label>
      <textarea
        {...field}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] min-h-[82px] text-[#464646] text-base font-normal resize-none focus:outline-none focus:border-[#BF9A61]/50 transition-all text-right",
          meta.touched && meta.error && "border-red-500",
          disabled && "opacity-70 cursor-not-allowed"
        )}
      />
      {meta.touched && meta.error && (
        <span className="text-xs text-red-500 mt-1 text-right">{meta.error}</span>
      )}
    </div>
  );
};
