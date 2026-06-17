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
import { InputForm } from "@/shared/components/inputs/InputForm";
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
    <Dialog onOpenChange={(open) => !open && formik.resetForm()}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[400px] rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-[#153B4D]">
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
          <DialogFooter className="mt-6 sm:justify-center">
            <Button
              type="submit"
              className="rounded-main h-12 w-full bg-[#CBA462] text-base font-bold text-white hover:bg-[#B69357]"
            >
              {district ? "تعديل دائرة" : "إضافة دائرة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
