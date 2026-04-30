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
import { useGetCassationSession } from "../api/hooks/useGetCassationSession";

interface CassationSessionDetailsDialogProps {
  sessionId: number | string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
}

export const CassationSessionDetailsDialog: React.FC<
  CassationSessionDetailsDialogProps
> = ({ sessionId, open, onOpenChange, onEdit }) => {
  const {
    data: session,
    isPending,
    isError,
    error,
  } = useGetCassationSession(sessionId, open);

  return (
    <LayoutDialog
      title="تفاصيل جلسة التمييز"
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
        <Error message="حدث خطأ أثناء جلب تفاصيل جلسة التمييز." error={error} />
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
              text={formatDateToTime(session.session_date) || "-"}
            />
            <InputBox label="المحكمة" text={session.court?.name || "-"} />
            <InputBox label="دور القاعة" text={session.hall_floor || "-"} />
            <InputBox label="رقم القاعة" text={session.hall_number || "-"} />
          </div>
        </CustomLayoutBorder>
      )}
    </LayoutDialog>
  );
};
