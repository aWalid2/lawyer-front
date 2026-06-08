import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XIcon } from "lucide-react";
import { useUpdateConsultation } from "../../api/hooks/useUpdateConsultations";
import {
  CONSULTATION_STATUS_LABELS,
  CONSULTATION_STATUS_FALLBACK,
} from "@/shared/constants/consultationStatus";
import type { Consultation } from "../types";

interface UpdateStatusConsultationModalProps {
  consultation: Consultation;
  onClose: () => void;
}

function UpdateStatusConsultationModal({
  consultation,
  onClose,
}: UpdateStatusConsultationModalProps) {
  const { mutate: updateConsultation, isPending } = useUpdateConsultation();

  const currentStatus =
    CONSULTATION_STATUS_LABELS[consultation.status ?? ""] ??
    CONSULTATION_STATUS_FALLBACK;

  const isAlreadyCompleted = consultation.status === "completed";

  const handleMarkAsCompleted = () => {
    updateConsultation(
      { id: consultation.id, data: { status: "completed" } },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-[12px] border-none px-6 py-6 sm:max-w-[480px] sm:rounded-[24px] sm:px-14 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={onClose}>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-[12px] px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            تحديث حالة الاستشارة
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-white/5">
            <span className="text-sm font-medium text-gray-600">
              الحالة الحالية
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${currentStatus.className}`}
            >
              {currentStatus.text}
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">عنوان الاستشارة</p>
            <p className="mt-1 font-medium text-[#153A4D]">
              {consultation.consultation_title}
            </p>
          </div>

          {isAlreadyCompleted ? (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-green-50 p-6 dark:bg-green-900/20">
              <CheckCircle2 size={48} className="text-green-500" />
              <p className="text-lg font-medium text-green-700 dark:text-green-400">
                هذه الاستشارة مكتملة بالفعل
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-xl bg-yellow-50 p-6 dark:bg-yellow-900/20">
              <CheckCircle2 size={40} className="text-yellow-500" />
              <p className="text-center text-sm text-gray-600">
                هل أنت متأكد من أن هذه الاستشارة قد اكتملت؟
              </p>
              <button
                type="button"
                onClick={handleMarkAsCompleted}
                disabled={isPending}
                className="bg-primary-gradient mt-2 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "جاري التحديث..." : "تأكيد الإكمال"}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-[12px] border border-gray-300 px-8 py-2.5 font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/20 dark:text-gray-400 dark:hover:bg-white/5"
          >
            إلغاء
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateStatusConsultationModal;
