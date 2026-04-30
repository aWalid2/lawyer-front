import React from "react";
import { InputBox } from "@/shared/components/InputBox";
import type { FormCaseDetailsProps } from "./components/typesCaseInfo";

export const CaseDetailsInfo: React.FC<FormCaseDetailsProps> = ({
  caseData,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <InputBox label="الرقم الآلي للقضية" text={caseData?.autoNumber} />
        <InputBox label="رقم الشكوى" text={caseData?.complaintNumber} />

        <InputBox label="اسم الموكل" text={caseData?.clientName} />
        <InputBox label="عنوان القضية" text={caseData?.caseTitle} />

        <InputBox label="المحكمة" text={caseData?.court} />
        <InputBox
          label="درجة التقاضي الحالية"
          text={caseData?.litigationLevel}
        />

        <InputBox label="حالة القضية" text={caseData?.status} />
        <InputBox label="نوع القضية" text={caseData?.caseType} />

        <InputBox label="صفة الموكل" text={caseData?.clientRelation} />
        <InputBox
          label="وضع القضية عند الاستلام"
          text={caseData?.statusOnReceipt}
        />

        <InputBox label="تاريخ إنشاء القضية" text={caseData?.creationDate} />
        <InputBox
          label="تاريخ ورود القضية في المكتب"
          text={caseData?.receiptDate}
        />

        <div className="mt-2 flex w-full flex-col md:col-span-2">
          <label className="text-secondary mb-2 block pr-2 text-right text-sm font-medium">
            ملاحظات
          </label>
          <div className="text-secondary min-h-[50px] w-full rounded-xl border border-[#E8E8E8] bg-[#FBFBFB] p-4 pr-6 text-right text-sm disabled:opacity-70">
            {caseData?.notes}
          </div>
        </div>
      </div>
    </div>
  );
};
