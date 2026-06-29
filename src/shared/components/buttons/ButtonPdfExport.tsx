import React from "react";
import { FileDownloadIcon } from "../../icons/FileDownload";

type ButtonPdfExportProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPdfExport = ({
  className,
  type = "button",
  ...props
}: ButtonPdfExportProps) => {
  return (
    <button
      type={type}
      title="تصدير PDF"
      className={[
        "flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F6FF]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <FileDownloadIcon className="size-4 text-[#63A4F9]" />
    </button>
  );
};
