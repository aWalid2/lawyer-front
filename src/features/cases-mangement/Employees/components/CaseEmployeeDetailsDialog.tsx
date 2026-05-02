import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { Error } from "@/shared/components/Error";
import { InputBox } from "@/shared/components/InputBox";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import type { CaseEmployee } from "../types";
import {
  getCaseEmployeeName,
  getCaseEmployeeNotes,
  getCaseEmployeePosition,
} from "../types";

interface CaseEmployeeDetailsDialogProps {
  employee: CaseEmployee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export const CaseEmployeeDetailsDialog: React.FC<
  CaseEmployeeDetailsDialogProps
> = ({ employee, open, onOpenChange, onEdit }) => {
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
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <InputBox label="اسم الموظف" text={getCaseEmployeeName(employee)} />
          <InputBox label="رقم الهاتف" text={employee.phone || "-"} />
          <InputBox label="الوظيفة" text={employee.job || "-"} />
          <InputBox
            label="المسمى الوظيفي"
            text={getCaseEmployeePosition(employee)}
          />
          <InputBox
            label="البريد الإلكتروني"
            text={employee.Employee?.user?.email || "-"}
          />
          <InputBox
            label="رقم هاتف الموظف"
            text={employee.Employee?.user?.phone || "-"}
          />
          <div className="col-span-1 md:col-span-2">
            <InputBox label="ملاحظات" text={getCaseEmployeeNotes(employee)} />
          </div>
        </div>
      )}
    </LayoutDialog>
  );
};
