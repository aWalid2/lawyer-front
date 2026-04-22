import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useGetOtherSession } from "../api/hooks/useGetOtherSession";
import { OtherBox } from "./OtherBox";
import { DateIcon } from "@/shared/icons/Date";
import { Error } from "@/shared/components/Error";
import {
  formatDateToYYYYMMDD,
  formatDateToTime,
} from "@/shared/utils/convertDate";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { getOtherSessionLawyerName } from "./typesOther";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="custom-scrollbar max-h-[90vh] overflow-y-auto rounded-xl border-none px-6 py-6 sm:max-w-193 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-xl px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <div className="mb-6 flex items-center justify-between gap-4 pt-8">
          <div className="w-full" />
          <DialogHeader className="mb-0 text-center">
            <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
              تفاصيل الجلسة الإدارية
            </DialogTitle>
          </DialogHeader>
          <ButtonUpdateTable
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
          />
        </div>

        {isPending ? (
          <div className="flex min-h-48 items-center justify-center text-gray-500">
            جاري تحميل التفاصيل...
          </div>
        ) : isError || !session ? (
          <Error
            message="حدث خطأ أثناء جلب تفاصيل الجلسة الإدارية."
            error={error}
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <OtherBox label="نوع الإجراء" text={session.actionType || "-"} />
            <OtherBox
              label="تاريخ الإحالة"
              text={formatDateToYYYYMMDD(session.referral_date) || "-"}
              icon={<DateIcon />}
            />
            <OtherBox
              label="الجهة الإدارية"
              text={session.admin_authority || "-"}
            />
            <OtherBox
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
            <OtherBox
              label="المحامي المسؤول"
              text={getOtherSessionLawyerName(session)}
            />
            <OtherBox
              label="قرار الجلسة"
              text={session.session_decision || "-"}
            />
            <div className="col-span-1 md:col-span-2">
              <OtherBox label="ملاحظات" text={session.notes || "-"} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
