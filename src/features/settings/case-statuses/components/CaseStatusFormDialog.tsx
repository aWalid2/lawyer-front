import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { CaseStatusT } from "../types/caseStatuseTypes";
import { useAddCaseStatus } from "../api/hooks/useAddCaseStatus";
import { useUpdateCaseStatus } from "../api/hooks/useUpdateCaseStatus";
import { Error } from "@/shared/components/Error";
import Loading from "@/shared/Loading";

interface CaseStatusFormDialogProps {
  status?: CaseStatusT;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم الحالة مطلوب"),
});

export const CaseStatusFormDialog: React.FC<CaseStatusFormDialogProps> = ({
  status,
  trigger,
  open,
  onOpenChange,
  onSave,
}) => {
  const isEditMode = !!status;
  
  const initialValues = {
    name: status?.name || "",
  };
  
  const { mutate: addCaseStatus, isPending: isAdding, isError: isAddError } = useAddCaseStatus();
  const { mutate: updateCaseStatus, isPending: isUpdating, isError: isUpdateError } = useUpdateCaseStatus();
  
  const isPending = isEditMode ? isUpdating : isAdding;
  const isError = isEditMode ? isUpdateError : isAddError;

  const handleSubmit = (values: Partial<CaseStatusT>) => {
    if (isEditMode && status?.id) {
      updateCaseStatus(
        { id: status.id.toString(), data: values },
        {
          onSuccess: () => {
            if (onSave) onSave();
          },
        }
      );
    } else {
      addCaseStatus(values, {
        onSuccess: () => {
          if (onSave) onSave();
        },
      });
    }
  };

  if (isPending) return <Loading />;
  if (isError) return <Error message="فشل في حفظ الحالة يرجى المحاولة لاحقاً" />;

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل حالة" : "إضافة حالة جديدة"}
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
              label="اسم الحالة"
              name="name"
              type="text"
              placeholder="أدخل اسم الحالة"
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "جاري الحفظ..." : (isEditMode ? "تعديل حالة" : "إضافة حالة جديدة")}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};