import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { InputBox } from "@/shared/components/InputBox";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { useGetCasePaymentsSummary } from "@/features/cases-mangement/Payments/api/hooks/useGetCasePaymentsSummary";

interface Props {
  caseId: string;
}

export const PaymentsSummary = ({ caseId }: Props) => {
  const { data: summary } = useGetCasePaymentsSummary(caseId);
  if (!summary) return null;
  return (
    <CustomLayoutBorder>
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold">
          موجز المدفوعات
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputBox
          label="إجمالي المدفوعات"
          text={`${summary.totalAmount.toLocaleString("en-US")} د.ك`}
        />
        <InputBox
          label="تاريخ آخر دفعة"
          text={formatDateToYYYYMMDD(summary.latestPaymentDate) || "-"}
        />
      </div>
    </CustomLayoutBorder>
  );
};

export default PaymentsSummary;
