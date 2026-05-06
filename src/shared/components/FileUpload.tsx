import React, { useEffect, useMemo, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";

type FileUploadProps = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
};

type FileUploadValue = string | File | FileList | null | undefined;

type PreviewItem = {
  id: string;
  name: string;
  sizeLabel?: string;
  isImage: boolean;
  previewUrl?: string;
  source: "local" | "remote";
};

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileExtension = (fileName: string) => {
  const segments = fileName.split(".");
  return segments.length > 1
    ? (segments.at(-1)?.toUpperCase() ?? "FILE")
    : "FILE";
};

const isImagePath = (value: string) =>
  /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(value.split("?")[0]);

const normalizeFiles = (value: FileUploadValue) => {
  if (!value) return [] as File[];
  if (value instanceof File) return [value];
  if (value instanceof FileList) return Array.from(value);
  return [] as File[];
};

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  placeholder = "انقر هنا لتحميل الملفات أو سحبها وإفلاتها",
  className,
  multiple = false,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const localFiles = useMemo(
    () => normalizeFiles(field.value as FileUploadValue),
    [field.value],
  );

  const objectUrls = useMemo(
    () =>
      localFiles.map((file) => ({
        file,
        url: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      })),
    [localFiles],
  );

  useEffect(() => {
    return () => {
      objectUrls.forEach(({ url }) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [objectUrls]);

  const previewItems = useMemo<PreviewItem[]>(() => {
    if (typeof field.value === "string" && field.value.trim()) {
      return [
        {
          id: field.value,
          name: field.value.split("/").at(-1) || "file",
          isImage: isImagePath(field.value),
          previewUrl: isImagePath(field.value) ? field.value : undefined,
          source: "remote",
        },
      ];
    }

    return objectUrls.map(({ file, url }) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      isImage: file.type.startsWith("image/"),
      previewUrl: url,
      source: "local",
    }));
  }, [field.value, objectUrls]);

  const hasFiles = previewItems.length > 0;
  const emptyStateText = placeholder || "انقر هنا للتحميل";

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const applyFiles = (files: FileList | null) => {
    if (files) {
      setFieldValue(name, multiple ? files : (files[0] ?? null));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyFiles(event.currentTarget.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    applyFiles(event.dataTransfer.files);
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setFieldValue(name, null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex w-full flex-col">
      <label className="mb-4 block text-sm font-normal text-[#1A1A1A]">
        {label}
      </label>
      <div
        onClick={handleBoxClick}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex h-24.75 w-30.25 max-w-full items-center justify-center rounded-[18px] border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC]/50 transition-all hover:border-[#BF9A61]/50",
          hasFiles && "border-[#BF9A61] bg-[#FFF9F1]",
          previewItems[0]?.isImage ? "overflow-hidden p-0" : "p-4",
          isDragging && "border-[#BF9A61] bg-[#FFF3E2]",
          meta.touched && meta.error && "border-red-500",
          "cursor-pointer",
          className,
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple={multiple}
        />

        {hasFiles ? (
          previewItems[0].isImage && previewItems[0].previewUrl ? (
            <div className="relative h-full w-full overflow-hidden">
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#9A3412] shadow-sm transition-colors hover:bg-white"
                aria-label="إزالة الملفات المختارة"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <img
                src={previewItems[0].previewUrl}
                alt={previewItems[0].name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex w-full items-center gap-3 overflow-hidden">
              <div className="min-w-0 flex-1 text-right">
                <p className="truncate text-sm font-medium text-[#6B4E16]">
                  {previewItems.length === 1
                    ? "الملف المختار"
                    : `تم اختيار ${previewItems.length} ملفات`}
                </p>
                <p className="mt-1 truncate text-xs text-[#8B7355]">
                  {previewItems[0].name}
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">
                  ملف
                  {previewItems[0].sizeLabel
                    ? ` • ${previewItems[0].sizeLabel}`
                    : ""}
                  {previewItems.length > 1
                    ? ` • +${previewItems.length - 1}`
                    : ""}
                </p>
              </div>

              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[12px] bg-[#F4E7CF] text-[#8B5E1A]">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#9A3412] shadow-sm transition-colors hover:bg-white"
                  aria-label="إزالة الملفات المختارة"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <UploadCloud className="h-6 w-6" />
                <span className="absolute right-1.5 bottom-1 rounded bg-white/80 px-1 text-[9px] leading-4 font-semibold">
                  {getFileExtension(previewItems[0].name)}
                </span>
              </div>
            </div>
          )
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] text-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#BF9A61] shadow-sm">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p className="line-clamp-3 max-w-full text-xs leading-4 text-[#A0AEC0]">
                {emptyStateText}
              </p>
              <p className="text-[10px] leading-4 text-[#CBD5E1]">
                {multiple
                  ? "يمكنك اختيار أكثر من ملف"
                  : "يمكنك اختيار ملف واحد"}
              </p>
            </div>
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <span className="mt-1 text-xs text-red-500">{meta.error}</span>
      )}
    </div>
  );
};
