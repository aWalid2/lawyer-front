import React, { useRef } from "react";
import { useField, useFormikContext } from "formik";
import { cn } from "@/lib/utils";

type FileUploadProps = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  placeholder = "انقر هنا لتحميل الملفات أو سحبها وإفلاتها",
  className,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      // In a real scenario you might want to store the File objects
      // For now we'll just set the first file or the file list
      setFieldValue(name, files);
    }
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <label className="block mb-4 text-sm font-normal text-[#1A1A1A]">
        {label}
      </label>
      <div
        onClick={handleBoxClick}
        className={cn(
          "w-full h-[99px] border-2 border-dashed border-[#E2E8F0] rounded-[18px] flex items-center justify-center cursor-pointer transition-all hover:border-[#BF9A61]/50 bg-[#F8FAFC]/50",
          meta.touched && meta.error && "border-red-500",
          field.value && "border-[#BF9A61]"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <div className="text-center">
          <p className="text-[#A0AEC0] text-sm">
            {field.value && field.value.length > 0
              ? `تم اختيار ${field.value.length} ملفات`
              : placeholder}
          </p>
        </div>
      </div>
      {meta.touched && meta.error && (
        <span className="text-xs text-red-500 mt-1">{meta.error}</span>
      )}
    </div>
  );
};
