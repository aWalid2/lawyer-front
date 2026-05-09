import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { InputBox } from "@/shared/components/InputBox";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { useGetCaseExpensesSummary } from "../api/hooks/useGetCaseExpensesSummary";

interface ExpensesSummaryProps {
  caseId: string;
}

export const ExpensesSummary = ({ caseId }: ExpensesSummaryProps) => {
  const { data: summary } = useGetCaseExpensesSummary(caseId);

  if (!summary) {
    return null;
  }

  return (
    <CustomLayoutBorder>
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold">
          موجز المصروفات
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputBox
          label="إجمالي المصروفات"
          text={`${summary.totalAmount.toLocaleString("en-US")} ج.م`}
        />
        <InputBox
          label="تاريخ آخر مصروف"
          text={formatDateToYYYYMMDD(summary.latestExpenseDate) || "-"}
        />
      </div>
    </CustomLayoutBorder>
  );
};
