import { Button } from "@/components/ui/button";
import React from "react";
import { EditIcon } from "../icons/Edit";

interface ButtonUpdateInfoProps {
  onEdit: () => void;
  icon?: React.ReactNode;
  text?: string;
}

export const ButtonUpdateInfo: React.FC<ButtonUpdateInfoProps> = ({
  onEdit,
  icon,
  text,
}) => {
  return (
    <Button
      onClick={(event) => {
        event.stopPropagation();
        onEdit();
      }}
      className="h-12.5 bg-[#f1f1f3] text-base font-semibold text-[#3D3C48] hover:text-white"
    >
      {icon || <EditIcon />} {text || "تعديل"}
    </Button>
  );
};
