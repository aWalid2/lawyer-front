import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { DateIcon } from "@/shared/icons/Date";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import React from "react";
import { useGetOtherSession } from "../../../api/hooks/useGetOtherSession";
import { getOtherSessionLawyerName } from "../../../types/typesOther";
import { InputBox } from "@/shared/components/InputBox";
import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";

interface OtherSessionDetailsDialogProps {
  sessionId: number | string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
}

export const OtherSessionDetailsDialog: React.FC<
  OtherSessionDetailsDialogProps
> = ({ sessionId, open, onOpenChange, onEdit }) => {
  const {
    data: session,
    isPending,
    isError,
    error,
  } = useGetOtherSession(sessionId, open);

  return (
    <LayoutDialog
      title="تفاصيل الجلسة الإدارية"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="sm"
    >
      <div className="mb-6 flex justify-end">
        <ButtonUpdateInfo onEdit={onEdit} />
      </div>

      {isPending ? (
        <LoadingPage />
      ) : isError || !session ? (
        <Error
          message="حدث خطأ أثناء جلب تفاصيل الجلسة الإدارية."
          error={error}
        />
      ) : (
        <CustomLayoutBorder>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <InputBox label="نوع الإجراء" text={session.actionType || "-"} />
            <InputBox
              label="تاريخ الإحالة"
              text={formatDateToYYYYMMDD(session.referral_date) || "-"}
              icon={<DateIcon />}
            />
            <InputBox
              label="الجهة الإدارية"
              text={session.admin_authority || "-"}
            />
            <InputBox
              label="موعد الجلسة"
              text={
                [
                  formatDateToYYYYMMDD(session.session_date),
                  formatDateToTime(session.session_date),
                ]
                  .filter(Boolean)
                  .join(" - ") || "-"
              }
            />
            <InputBox
              label="المحامي المسؤول"
              text={getOtherSessionLawyerName(session)}
            />
            <InputBox
              label="قرار الجلسة"
              text={session.session_decision || "-"}
            />
            <div className="col-span-1 md:col-span-2">
              <InputBox label="ملاحظات" text={session.notes || "-"} />
            </div>
          </div>
        </CustomLayoutBorder>
      )}
    </LayoutDialog>
  );
};
