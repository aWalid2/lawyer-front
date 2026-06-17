import { LayoutDialog } from "@/shared/components/dialogs/LayoutDialog";
import { ButtonUpdateInfo } from "@/shared/components/buttons/ButtonUpdateInfo";
import { InputBox } from "@/shared/components/inputs/InputBox";
import { DateIcon } from "@/shared/icons/Date";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import type { PaymentItem } from "@/features/cases-mangement/Payments/types";
import { PAYMENT_TYPE_OPTIONS } from "@/shared/constants/PaymentsOptions";
import { ImagePreviewCard } from "@/features/clients/clientDetails/components/ClientDetailsInfo/components/ImagePreviewCard";

interface PaymentDetailsDialogProps {
  payment: PaymentItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export const PaymentDetailsDialog: React.FC<PaymentDetailsDialogProps> = ({
  payment,
  open,
  onOpenChange,
  onEdit,
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      return;
    }
    onOpenChange(false);
  };

  return (
    <LayoutDialog
      title="تفاصيل الدفعة"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="wide"
    >
      <div className="mb-6 flex justify-end">
        <ButtonUpdateInfo onEdit={handleEdit} />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <InputBox
          label="نوع الدفعة"
          text={
            PAYMENT_TYPE_OPTIONS.find(
              (opt) => opt.value === payment?.payment_type,
            )?.label ||
            payment?.payment_type ||
            "-"
          }
        />
        <InputBox
          label="اسم الموظف المسئول"
          text={payment?.employee_name || "-"}
        />
        <InputBox
          label="تاريخ الدفعة"
          text={formatDateToYYYYMMDD(payment?.payment_date) || "-"}
          icon={<DateIcon />}
        />
        <InputBox
          label="وصف الدفعة"
          text={payment?.payment_description || "-"}
        />
        <InputBox
          label="المبلغ"
          text={payment ? `${payment.amount.toLocaleString("en-US")}` : "-"}
        />

        <div className="col-span-1 md:col-span-2">
          <ImagePreviewCard
            src={payment?.attachments?.[0]}
            alt="صورة التوكيل"
            label="صورة التوكيل"
            title="معاينة صورة التوكيل"
          />
        </div>

        <div className="col-span-1">
          <InputBox label="ملاحظات" text={payment?.notes || "-"} />
        </div>
      </div>
    </LayoutDialog>
  );
};

export default PaymentDetailsDialog;
