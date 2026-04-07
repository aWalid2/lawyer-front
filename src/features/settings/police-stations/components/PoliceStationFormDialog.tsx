import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { PoliceStationT } from "../types/policeStationTypes";
import { useAddPoliceStation } from "../api/hooks/useAddPoliceStation";
import { useUpdatePoliceStation } from "../api/hooks/useUpdatePoliceStation";
import { Error } from "@/shared/components/Error";
import Loading from "@/shared/Loading";

interface PoliceStationFormDialogProps {
  station?: PoliceStationT;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم المخفر مطلوب"),
  address: Yup.string().required("العنوان مطلوب"),
});

export const PoliceStationFormDialog: React.FC<PoliceStationFormDialogProps> = ({
  station,
  trigger,
  open,
  onOpenChange,
  onSave,
}) => {
  const isEditMode = !!station;
  
  const initialValues = {
    name: station?.name || "",
    address: station?.address || "",
  };
  
  const { mutate: addPoliceStation, isPending: isAdding, isError: isAddError } = useAddPoliceStation();
  const { mutate: updatePoliceStation, isPending: isUpdating, isError: isUpdateError } = useUpdatePoliceStation();
  
  const isPending = isEditMode ? isUpdating : isAdding;
  const isError = isEditMode ? isUpdateError : isAddError;

  const handleSubmit = (values: Partial<PoliceStationT>) => {
    if (isEditMode && station?.id) {
      updatePoliceStation(
        { id: station.id.toString(), data: values },
        {
          onSuccess: () => {
            if (onSave) onSave();
          },
        }
      );
    } else {
      addPoliceStation(values, {
        onSuccess: () => {
          if (onSave) onSave();
        },
      });
    }
  };

  if (isPending) return <Loading />;
  if (isError) return <Error message="فشل في حفظ المخفر يرجى المحاولة لاحقاً" />;

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل مخفر" : "إضافة مخفر جديد"}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      className="sm:max-w-[650px]"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="space-y-4 py-4">
            <InputForm
              label="اسم المخفر"
              name="name"
              type="text"
              placeholder="مخفر الجيزة"
            />
            <InputForm
              label="العنوان"
              name="address"
              type="text"
              placeholder="الجيزة - شارع الوفاء"
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "جاري الحفظ..." : (isEditMode ? "تعديل مخفر" : "إضافة مخفر جديد")}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};