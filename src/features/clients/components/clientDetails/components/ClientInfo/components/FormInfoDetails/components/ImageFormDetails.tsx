import { useFormikContext } from "formik";
import React, { useRef, useState, useEffect } from "react";
import type { FormValues } from "./typesClientsInfo";

interface ImageFormDetailsProps {
  isEditing?: boolean;
}

export default function ImageFormDetails({ isEditing }: ImageFormDetailsProps) {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Sync preview with Formik value
  useEffect(() => {
    if (values.image) {
      if (typeof values.image === "string") {
        setPreview(values.image);
      } else if (values.image instanceof File) {
        setPreview(URL.createObjectURL(values.image));
      }
    } else {
      setPreview(null);
    }
  }, [values.image]);

  const handleDivClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue("image", file);
      // Local preview update
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pt-14">
      <div className="flex flex-col gap-7">
        <h1 className="text-xl font-bold">صورة التوكيل</h1>

        <div className="flex ">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={!isEditing}
          />
          <div
            onClick={handleDivClick}
            className={`${
              isEditing
                ? "cursor-pointer hover:bg-gray-100"
                : "cursor-not-allowed opacity-60"
            } w-[150px] h-[125px] border border-gray-300 border-dashed border-spacing-4 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center transition overflow-hidden relative`}
          >
            {preview ? (
              <img
                src={preview}
                alt="Proxy"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-sm text-gray-400 flex flex-col gap-2">
                انقر هنا لتحميل
                <span>الصوره او سحبها</span>
                <span> وإفلاتها</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
