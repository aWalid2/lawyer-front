import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { Error } from "@/shared/components/Error";
import { InputBox } from "@/shared/components/InputBox";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import LoadingPage from "@/shared/components/LoadingPage";
import React from "react";
import { useGetEmployee } from "../api/hooks/useGetOneEmployee";
import type { CaseEmployee } from "../types";
import { getCaseEmployeeName } from "../types";

interface CaseEmployeeDetailsDialogProps {
  employee: CaseEmployee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export const CaseEmployeeDetailsDialog: React.FC<
  CaseEmployeeDetailsDialogProps
> = ({ employee, open, onOpenChange, onEdit }) => {
  const { data: apiEmployee, isPending } = useGetEmployee(
    open && employee ? String(employee.Employee_id) : "",
  );

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      return;
    }

    onOpenChange(false);
  };

  return (
    <LayoutDialog
      title="تفاصيل الموظف"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="wide"
    >
      <div className="mb-6 flex justify-end">
        <ButtonUpdateInfo onEdit={handleEdit} />
      </div>

      {!employee ? (
        <Error message="تعذر تحميل تفاصيل الموظف." />
      ) : isPending ? (
        <LoadingPage />
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <InputBox
            label="اسم الموظف"
            text={
              apiEmployee?.user?.first_name || getCaseEmployeeName(employee)
            }
          />
          <InputBox label="رقم الهاتف" text={employee.phone || "-"} />
          <InputBox label="الوظيفة" text={employee.job || "-"} />

          <InputBox
            label="البريد الإلكتروني"
            text={
              apiEmployee?.user?.email || employee.Employee?.user?.email || "-"
            }
          />
        </div>
      )}
    </LayoutDialog>
  );
};
