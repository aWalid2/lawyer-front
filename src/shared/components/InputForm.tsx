import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Eye, EyeOff } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

type InputFormProps = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  type: string;
  dir?: string;
  readonly?: boolean;
  labelColor?: string;
  className?: string;
};

export const InputForm: React.FC<InputFormProps> = ({
  name,
  placeholder,
  disabled,
  label,
  type,
  dir,
  readonly,
  labelColor = "text-[#1A1A1A]",
  className
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  if (type === "date") {
    return (
      <div className={cn("flex flex-col w-full ", className)}>
        <label className={`block mb-4 text-sm font-normal ${labelColor}`}>
          {label}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-between gap-2 items-center text-left font-normal h-[50px] border-[#E8E8E8] rounded-[10px] bg-[#FBFBFB] px-4 hover:bg-white hover:text-primary hover:border-primary transition-all",
                !field.value && "text-muted-foreground",
                meta.touched && meta.error && "border-red-500",
                readonly && "bg-gray-100",
                disabled && "opacity-70 cursor-not-allowed"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="h-4 w-4 opacity-50 text-gray-500" />
              <span>
                {field.value ? (
                  format(new Date(field.value), "yyyy-MM-dd")
                ) : (
                  <span>{placeholder || "اختر تاريخ"}</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar

              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => {
                if (date) {
                  setFieldValue(name, format(date, "yyyy-MM-dd"));
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {meta.touched && meta.error && (
          <span className="text-xs text-red-500 mt-1">{meta.error}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <label className={`block mb-4 text-sm font-normal ${labelColor}`}>
        {label}
      </label>
      <div className="relative">
        <Input
          {...field}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          disabled={disabled}
          dir={dir}
          readOnly={readonly}
          className={cn(
            "text-right h-[50px] bg-[#FBFBFB] w-full",
            type === "password" && "pl-10",
            meta.touched && meta.error && "border-red-500"
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <span className="text-xs text-red-500 mt-1">{meta.error}</span>
      )}
    </div>
  );
};
