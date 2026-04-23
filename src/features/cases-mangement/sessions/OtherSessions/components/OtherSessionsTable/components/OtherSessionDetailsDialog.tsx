import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { DateIcon } from "@/shared/icons/Date";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import { XIcon } from "lucide-react";
import React from "react";
import { useGetOtherSession } from "../../../api/hooks/useGetOtherSession";
import { getOtherSessionLawyerName } from "../../../types/typesOther";
import { OtherBox } from "../../OtherSessionsDataSection/components/OtherBox";
import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";

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
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-xl border-none px-6 py-6 sm:max-w-193 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-xl px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <div className="mb-6 flex items-center justify-between gap-4 pt-8">
          <DialogHeader className="mb-0 text-center">
            <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
              تفاصيل الجلسة الإدارية
            </DialogTitle>
            <DialogDescription className="sr-only">
              عرض تفاصيل الجلسة الإدارية الحالية بما يشمل الإجراء والموعد
              والمحامي المسؤول.
            </DialogDescription>
          </DialogHeader>

          <ButtonUpdateInfo onEdit={onEdit} />
        </div>

        {isPending ? (
          <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pb-2 pl-2">
            <LoadingPage />
          </div>
        ) : isError || !session ? (
          <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pb-2 pl-2">
            <Error
              message="حدث خطأ أثناء جلب تفاصيل الجلسة الإدارية."
              error={error}
            />
          </div>
        ) : (
          <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pb-2 pl-2">
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
