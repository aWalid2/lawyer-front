import { Button } from "@/components/ui/button";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import LoadingPage from "@/shared/components/LoadingPage";
import { SelectForm } from "@/shared/components/SelectForm";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import type { CaseEmployee, CaseEmployeeFormValues } from "../types";
import {
  EMPTY_CASE_EMPLOYEE_FORM_VALUES,
  toCaseEmployeeFormValues,
} from "../types";

interface CaseEmployeeDialogProps {
  onSave: (values: CaseEmployeeFormValues, id?: number) => Promise<void> | void;
  employee?: CaseEmployee | null;
  employeeOptions: Array<{ label: React.ReactNode; value: string | number }>;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isPending?: boolean;
  isOptionsPending?: boolean;
}

const validationSchema = Yup.object({
  Employee_id: Yup.number()
    .typeError("اسم الدور مطلوب")
    .required("اسم الدور مطلوب"),
});

export const CaseRoleDialog: React.FC<CaseEmployeeDialogProps> = ({
  trigger,
  onSave,
  employee,
  employeeOptions,
  open,
  onOpenChange,
  isPending = false,
  isOptionsPending = false,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = typeof open === "boolean";
  const dialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const defaultValues = employee
    ? toCaseEmployeeFormValues(employee)
    : EMPTY_CASE_EMPLOYEE_FORM_VALUES;
  const isEditMode = !!employee?.id;

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل الدور" : "تعيين دور"}
      trigger={trigger}
      open={dialogOpen}
      onOpenChange={handleOpenChange}
      size="sm"
      padding="sm"
    >
      {isOptionsPending && employeeOptions.length === 0 ? (
        <LoadingPage />
      ) : (
        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            await onSave(values, employee?.id);
            handleOpenChange(false);
          }}
        >
          {() => (
            <Form className="space-y-4">
              <SelectForm
                name="Employee_id"
                label="اسم الدور"
                options={employeeOptions}
                placeholder="اختر الدور"
                showSearch
              />

              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary-gradient h-12.5 w-full rounded-[12px] text-base font-bold text-white hover:opacity-90"
              >
                {isPending
                  ? "جارٍ الحفظ..."
                  : isEditMode
                    ? "حفظ التغييرات"
                    : "إضافة"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </LayoutDialog>
  );
};
