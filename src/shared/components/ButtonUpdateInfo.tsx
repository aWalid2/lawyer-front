import { Button } from "@/components/ui/button";
import React from "react";
import { EditIcon } from "../icons/Edit";

interface ButtonUpdateInfoProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  onEdit?: () => void;
  icon?: React.ReactNode;
  text?: string;
  type?: "add" | "edit";
}

export const ButtonUpdateInfo = React.forwardRef<
  HTMLButtonElement,
  ButtonUpdateInfoProps
>(
  (
    { onEdit, icon, text, type = "edit", className, onClick, ...props },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
          onEdit?.();
        }}
        className={`${type === "add" ? "bg-[#CBA46226] text-[#CBA462]" : "bg-[#f1f1f3] text-[#3D3C48]"} h-12.5 text-base font-semibold hover:text-white ${className || ""}`}
        {...props}
      >
        {type === "edit" ? icon || <EditIcon /> : icon}{" "}
        {text || (type === "edit" ? "تعديل" : "إضافة")}
      </Button>
    );
  },
);

ButtonUpdateInfo.displayName = "ButtonUpdateInfo";
