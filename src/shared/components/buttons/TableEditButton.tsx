import React from "react";
import { EditIcon } from "../../icons/Edit";

export const TableEditButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      title="تعديل"
      className="rounded-main flex h-9 w-9 items-center justify-center bg-[#F1F1F3] transition-colors outline-none hover:bg-gray-200"
      {...props}
    >
      <EditIcon className="size-[14px] text-[#3D3C48]" />
    </button>
  );
});

TableEditButton.displayName = "TableEditButton";
