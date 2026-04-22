import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface AddOtherSessionDialogHeaderProps {
  isEditMode: boolean;
}

export const AddOtherSessionDialogHeader: React.FC<
  AddOtherSessionDialogHeaderProps
> = ({ isEditMode }) => {
  return (
    <DialogHeader className="mt-15 mb-2">
      <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
        {isEditMode ? "تعديل الجلسة الإدارية" : "إضافة جلسة إدارية"}
      </DialogTitle>
      <DialogDescription className="sr-only">
        {isEditMode
          ? "نموذج تعديل بيانات الجلسة الإدارية الحالية."
          : "نموذج إضافة جلسة إدارية جديدة."}
      </DialogDescription>
    </DialogHeader>
  );
};
