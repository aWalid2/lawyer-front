import React from "react";
import { TrashIcon } from "../../icons/Trash";

export const TableDeleteButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      title="حذف"
      className="rounded-main flex h-9 w-9 items-center justify-center bg-[#C60000]/8 transition-colors outline-none hover:bg-red-100"
      {...props}
    >
      <TrashIcon className="size-[16px] text-[#C60000]" />
    </button>
  );
});

TableDeleteButton.displayName = "TableDeleteButton";
