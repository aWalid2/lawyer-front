import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Eye, EyeOff } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  labelColor = "text-[#1A1A1A] dark:text-foreground",
  className,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  if (type === "date") {
    return (
      <div className={cn("flex w-full flex-col", className)}>
        <label className={`mb-4 block text-sm font-normal ${labelColor}`}>
          {label}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "hover:text-primary dark:hover:text-foreground hover:border-primary h-12.5 w-full items-center justify-between gap-2 rounded-[10px] border-[#E8E8E8] bg-[#FBFBFB] px-4 text-left font-normal transition-all hover:bg-white dark:border-white/40 dark:bg-transparent dark:hover:border-white/40 dark:hover:bg-white/10",
                !field.value && "text-muted-foreground",
                meta.touched && meta.error && "border-red-500",
                readonly && "bg-gray-100 dark:bg-white/5",
                disabled && "cursor-not-allowed opacity-70",
              )}
              disabled={disabled}
            >
              <CalendarIcon className="h-4 w-4 text-gray-500 opacity-50 dark:text-gray-400" />
              <span>
                {field.value ? (
                  format(new Date(field.value), "yyyy-MM-dd")
                ) : (
                  <span>{placeholder || "اختر تاريخ"}</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="dark:bg-card dark:border-border w-auto p-0"
            align="start"
          >
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
          <span className="mt-1 text-xs text-red-500">{meta.error}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <label className={`mb-4 block text-sm font-normal ${labelColor}`}>
        {label}
      </label>
      <div className="relative">
        <Input
          {...field}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          disabled={disabled}
          dir={dir}
          readOnly={readonly}
          className={cn(
            "dark:text-foreground h-12.5 w-full bg-[#FBFBFB] text-right dark:border-white/40 dark:bg-transparent",
            type === "password" && "pl-10",
            meta.touched && meta.error && "border-red-500",
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
        <span className="mt-1 text-xs text-red-500">{meta.error}</span>
      )}
    </div>
  );
};
