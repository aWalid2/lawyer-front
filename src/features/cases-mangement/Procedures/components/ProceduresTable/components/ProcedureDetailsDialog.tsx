import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { Error } from "@/shared/components/Error";
import { InputBox } from "@/shared/components/InputBox";
import LoadingPage from "@/shared/components/LoadingPage";
import { DateIcon } from "@/shared/icons/Date";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import React from "react";
import { useGetProcedure } from "../../../api/hooks/useGetProcedure";
import { getProcedureLawyerName } from "../../../types";

interface ProcedureDetailsDialogProps {
  procedureId: string | number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export const ProcedureDetailsDialog: React.FC<ProcedureDetailsDialogProps> = ({
  procedureId,
  open,
  onOpenChange,
  onEdit,
}) => {
  const {
    data: procedure,
    isPending,
    isError,
    error,
  } = useGetProcedure(procedureId, open);

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      return;
    }

    onOpenChange(false);
  };

  return (
    <LayoutDialog
      title="تفاصيل الإجراء"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="wide"
    >
      <div className="mb-6 flex justify-end">
        <ButtonUpdateInfo onEdit={handleEdit} />
      </div>

      {isPending ? (
        <LoadingPage />
      ) : isError || !procedure ? (
        <Error message="حدث خطأ أثناء جلب تفاصيل الإجراء." error={error} />
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <InputBox label="نوع الإجراء" text={procedure.actionType || "-"} />
          <InputBox
            label="تاريخ الإحالة"
            text={formatDateToYYYYMMDD(procedure.referral_date) || "-"}
            icon={<DateIcon />}
          />
          <InputBox
            label="الجهة الإدارية"
            text={procedure.admin_authority || "-"}
          />
          <InputBox
            label="موعد الإجراء"
            text={
              [
                formatDateToYYYYMMDD(procedure.session_date),
                formatDateToTime(procedure.session_date),
              ]
                .filter(Boolean)
                .join(" - ") || "-"
            }
          />
          <InputBox
            label="المحامي المسؤول"
            text={getProcedureLawyerName(procedure)}
          />
          <InputBox
            label="قرار الإجراء"
            text={procedure.session_decision || "-"}
          />
          <div className="col-span-1 md:col-span-2">
            <InputBox label="ملاحظات" text={procedure.notes || "-"} />
          </div>
        </div>
      )}
    </LayoutDialog>
  );
};
