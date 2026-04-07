import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/shared/components/InputForm";
import type { court_circle } from "../types/courtTypes";

interface DistrictFormDialogProps {
  district?: court_circle;
  onSave: (values: { name: string }) => void;
  trigger: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم الدائرة مطلوب"),
});

export const DistrictFormDialog: React.FC<DistrictFormDialogProps> = ({
  district,
  onSave,
  trigger,
}) => {
  const formik = useFormik({
    initialValues: {
      name: district?.name || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <Dialog onOpenChange={(open) => !open && formik.resetForm()} >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-[24px] max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[#153B4D] text-lg font-bold">
            {district ? "تعديل دائرة" : "أضافة دائرة جديدة"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
          <InputForm
            label="اسم الدائرة"
            name="name"
            type="text"
            placeholder="اسم الدائرة"
          />
          <DialogFooter className="sm:justify-center mt-6">
            <Button
              type="submit"
              className="w-full h-12 rounded-main bg-[#CBA462] hover:bg-[#B69357] text-white text-base font-bold"
            >
              {district ? "تعديل دائرة" : "إضافة دائرة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
