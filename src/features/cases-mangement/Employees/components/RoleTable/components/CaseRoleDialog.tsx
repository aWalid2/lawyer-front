import { Button } from "@/components/ui/button";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import LoadingPage from "@/shared/components/LoadingPage";
import { SelectForm } from "@/shared/components/SelectForm";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import type { CaseRole, CaseRoleFormValues } from "../types";
import { EMPTY_CASE_ROLE_FORM_VALUES } from "../types";

interface CaseRoleDialogProps {
  onSave: (values: CaseRoleFormValues, id?: number) => Promise<void> | void;
  roleOptions: Array<{ label: React.ReactNode; value: string | number }>;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isPending?: boolean;
  isOptionsPending?: boolean;
  editRole?: CaseRole | null;
}

const validationSchema = Yup.object({
  role_id: Yup.number()
    .typeError("اسم الدور مطلوب")
    .required("اسم الدور مطلوب"),
});

export const CaseRoleDialog: React.FC<CaseRoleDialogProps> = ({
  trigger,
  onSave,
  roleOptions,
  open,
  onOpenChange,
  isPending = false,
  isOptionsPending = false,
  editRole = null,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = typeof open === "boolean";
  const dialogOpen = isControlled ? open : internalOpen;
  const isEditMode = !!editRole;

  const initialValues: CaseRoleFormValues = isEditMode
    ? { role_id: editRole.role_id }
    : EMPTY_CASE_ROLE_FORM_VALUES;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل الدور" : "تعيين دور"}
      trigger={trigger}
      open={dialogOpen}
      onOpenChange={handleOpenChange}
      size="sm"
      padding="sm"
    >
      {isOptionsPending && roleOptions.length === 0 ? (
        <LoadingPage />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            await onSave(values, isEditMode ? editRole.id : undefined);
            handleOpenChange(false);
          }}
        >
          {() => (
            <Form className="space-y-4">
              <SelectForm
                name="role_id"
                label="اسم الدور"
                options={roleOptions}
                placeholder="اختر الدور"
                showSearch
              />

              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary-gradient h-12.5 w-full rounded-[12px] text-base font-bold text-white hover:opacity-90"
              >
                {isPending ? "جارٍ الحفظ..." : isEditMode ? "تحديث" : "إضافة"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </LayoutDialog>
  );
};
