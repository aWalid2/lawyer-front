import React from "react";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputBox } from "@/shared/components/InputBox";
import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { DateIcon } from "@/shared/icons/Date";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import { useGetPoliceSession } from "../../../api/hooks/useGetPoliceSession";

interface PoliceSessionDetailsDialogProps {
  sessionId: number | string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
}

export const PoliceSessionDetailsDialog: React.FC<
  PoliceSessionDetailsDialogProps
> = ({ sessionId, open, onOpenChange, onEdit }) => {
  const {
    data: session,
    isPending,
    isError,
    error,
  } = useGetPoliceSession(sessionId, open);

  const lawyerName = [session?.lawyer?.first_name, session?.lawyer?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <LayoutDialog
      title="تفاصيل جلسة المخفر"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="sm"
    >
      <div className="mb-6 flex justify-end">
        <ButtonUpdateInfo
          onEdit={() => {
            onOpenChange(false);
            onEdit();
          }}
        />
      </div>

      {isPending ? (
        <LoadingPage />
      ) : isError || !session ? (
        <Error message="حدث خطأ أثناء جلب تفاصيل جلسة المخفر." error={error} />
      ) : (
        <CustomLayoutBorder>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <InputBox
              label="تاريخ الجلسة"
              text={formatDateToYYYYMMDD(session.session_date) || "-"}
              icon={<DateIcon />}
            />
            <InputBox
              label="وقت الجلسة"
              text={
                session.session_time ||
                formatDateToTime(session.session_date) ||
                "-"
              }
            />
            <InputBox label="المحامي المتابع" text={lawyerName || "-"} />
            <InputBox
              label="قرار الجلسة"
              text={session.session_ruling || "-"}
            />
            <div className="col-span-1 md:col-span-2">
              <InputBox
                label="عنوان القضية"
                text={session.case?.case_title || "-"}
              />
            </div>
          </div>
        </CustomLayoutBorder>
      )}
    </LayoutDialog>
  );
};
