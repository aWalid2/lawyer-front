import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { ProsecutionT } from "../types/prosecutionsTypes";
import { useAddProsecution } from "../api/hooks/useAddProsecution";
import { useUpdateProsecution } from "../api/hooks/useUpdateProsecution";
import { Error } from "@/shared/components/Error";
import Loading from "@/shared/Loading";

interface ProsecutionFormDialogProps {
  prosecution?: ProsecutionT;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم النيابة مطلوب"),
  address: Yup.string().required("العنوان مطلوب"),
});

export const ProsecutionFormDialog: React.FC<ProsecutionFormDialogProps> = ({
  prosecution,
  trigger,
  open,
  onOpenChange,
  onSave,
}) => {
  const isEditMode = !!prosecution;
  
  const initialValues = {
    name: prosecution?.name || "",
    address: prosecution?.address || "",
  };
  
  const { mutate: addProsecution, isPending: isAdding, isError: isAddError } = useAddProsecution();
  const { mutate: updateProsecution, isPending: isUpdating, isError: isUpdateError } = useUpdateProsecution();
  
  const isPending = isEditMode ? isUpdating : isAdding;
  const isError = isEditMode ? isUpdateError : isAddError;

  const handleSubmit = (values: Partial<ProsecutionT>) => {
    if (isEditMode && prosecution?.id) {
      updateProsecution(
        { id: prosecution.id.toString(), data: values },
        {
          onSuccess: () => {
            if (onSave) onSave();
          },
        }
      );
    } else {
      addProsecution(values, {
        onSuccess: () => {
          if (onSave) onSave();
        },
      });
    }
  };

  if (isPending) return <Loading />;
  if (isError) return <Error message="فشل في حفظ النيابة يرجى المحاولة لاحقاً" />;

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل نيابة" : "إضافة نيابة جديدة"}
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
              label="اسم النيابة"
              name="name"
              type="text"
              placeholder="أدخل اسم النيابة"
            />
            <InputForm
              label="العنوان"
              name="address"
              type="text"
              placeholder="أدخل العنوان"
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "جاري الحفظ..." : (isEditMode ? "تعديل نيابة" : "إضافة نيابة جديدة")}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};