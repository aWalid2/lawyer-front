import React from "react";
import { InputBox } from "./components/InputBox";
import type { FormCaseDetailsProps } from "./components/typesCaseInfo";

export const CaseDetails: React.FC<FormCaseDetailsProps> = ({ caseData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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

        <div className="md:col-span-2 mt-2 flex flex-col w-full">
          <label className="block mb-2 text-sm font-medium text-secondary text-right pr-2">
            ملاحظات
          </label>
          <div className="w-full border border-[#E8E8E8] rounded-xl p-4 bg-[#FBFBFB] min-h-[50px] text-secondary text-sm text-right pr-6 disabled:opacity-70">
            {caseData?.notes}
          </div>
        </div>
      </div>
    </div>
  );
};
