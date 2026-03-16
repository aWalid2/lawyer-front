import React from "react";
import { useField, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
};

export const InputForm: React.FC<InputFormProps> = ({
  name,
  placeholder,
  disabled,
  label,
  type,
  dir,
  readonly
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  if (type === "date") {
    return (
      <div className="flex flex-col w-full col-span-2">
        <label className="block mb-4 text-sm font-normal text-[#1A1A1A]">
          {label}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-between gap-2 items-center text-left font-normal h-[50px] border-[#E8E8E8] rounded-[10px] bg-[#FBFBFB] px-4",
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
      <label className="block mb-4 text-sm font-normal text-[#1A1A1A]">
        {label}
      </label>
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        dir={dir}
        readOnly={readonly}
        className={cn(
          "text-right",
          meta.touched && meta.error && "border-red-500"
        )}
      />
      {meta.touched && meta.error && (
        <span className="text-xs text-red-500 mt-1">{meta.error}</span>
      )}
    </div>
  );
};
