import { Button } from "@/components/ui/button";
import React from "react";
import { EditIcon } from "../icons/Edit";

interface ButtonUpdateInfoProps {
  onEdit?: () => void;
  icon?: React.ReactNode;
  text?: string;
  type?: "add" | "edit";
}

export const ButtonUpdateInfo: React.FC<ButtonUpdateInfoProps> = ({
  onEdit,
  icon,
  text,
  type = "edit",
}) => {
  return (
    <Button
      onClick={(event) => {
        event.stopPropagation();
        onEdit?.();
      }}
      className={`${type === "add" ? "bg-[#CBA46226] text-[#CBA462]" : "bg-[#f1f1f3] text-[#3D3C48]"} h-12.5 text-base font-semibold hover:text-white`}
    >
      {icon || <EditIcon />} {text || (type === "edit" ? "تعديل" : "إضافة")}
    </Button>
  );
};
