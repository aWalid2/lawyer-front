import { CASE_SITUATION_OPTIONS } from "@/shared/constants/caseOptions";
import React from "react";
import { getOptionLabel } from "../../../../../shared/utils/getOptionLabel";
import { CaseDetailsCollapsibleSection } from "./components/CaseDetailsCollapsibleSection";
import { CaseDetailsSection } from "./components/CaseDetailsSection";
import type {
  DetailField,
  FormCaseDetailsProps,
} from "./components/typesCaseInfo";

export const CaseDetailsInfo: React.FC<FormCaseDetailsProps> = ({
  caseData,
}) => {
  const generalFields: DetailField[] = [
    { label: "اسم الموكل", text: caseData?.clientName },
    { label: "عنوان القضية", text: caseData?.caseTitle },
    { label: "حالة القضية", text: caseData?.status },
    { label: "نوع القضية", text: caseData?.caseType },
    {
      label: "صفة الموكل",
      text: "-",
    },
    {
      label: "وضع القضية عند الاستلام",
      text: getOptionLabel(caseData?.statusOnReceipt, CASE_SITUATION_OPTIONS),
    },
  ];

  const policeFields: DetailField[] = [
    { label: "المخفر", text: caseData?.policeStation },
    { label: "رقم القضية في المخفر", text: caseData?.policeStationCaseNumber },
    {
      label: "تاريخ ورود القضية في المخفر",
      text: caseData?.policeStationArrivalDate,
    },
  ];

  const prosecutionFields: DetailField[] = [
    { label: "النيابة", text: caseData?.prosecution },
    { label: "رقم القضية في النيابة", text: caseData?.prosecutionCaseNumber },
    {
      label: "تاريخ تسجيل القضية في النيابة",
      text: caseData?.prosecutionRegistrationDate,
    },
    { label: "وكيل النيابة", text: caseData?.prosecutorName },
    { label: "اسم المحقق", text: caseData?.detectiveName },
    { label: "اسم التحقيق", text: caseData?.investigationName },
  ];

  const courtFields: DetailField[] = [
    { label: "المحكمة", text: caseData?.court },
    { label: "درجة التقاضي الحالية", text: caseData?.litigationLevel },
    { label: "الرقم الآلي للقضية", text: caseData?.autoNumber },
    { label: "رقم الشكوى", text: caseData?.complaintNumber },
  ];

  const expertFields: DetailField[] = [
    { label: "رقم تقرير الخبير", text: caseData?.expertReportNumber },
    { label: "الجهة المكلفة", text: caseData?.assigningAuthority },
    { label: "مكتب الخبرة", text: caseData?.expertOfficeName },
    { label: "موضوع الخبرة", text: caseData?.subjectOfExpertise },
    {
      label: "الرأي النهائي للخبير",
      text: caseData?.finalOpinion,
      className: "md:col-span-2",
    },
  ];

  const administrativeFields: DetailField[] = [
    { label: "تاريخ إنشاء القضية", text: caseData?.creationDate },
    { label: "تاريخ ورود القضية في المكتب", text: caseData?.receiptDate },
    {
      label: "تاريخ ورود القضية إلى الجهة المختصة",
      text: caseData?.authorityArrivalDate,
    },
    {
      label: "ملاحظات",
      text: caseData?.notes,
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="space-y-6">
      <CaseDetailsSection
        title="معلومات عامة عن القضية"
        fields={generalFields}
      />
      <CaseDetailsCollapsibleSection
        title="معلومات القضية في المخفر"
        fields={policeFields}
      />
      <CaseDetailsCollapsibleSection
        title="معلومات القضية في النيابة"
        fields={prosecutionFields}
      />
      <CaseDetailsCollapsibleSection
        title="معلومات القضية في المحكمة"
        fields={courtFields}
      />
      <CaseDetailsCollapsibleSection
        title="معلومات عن الخبراء"
        fields={expertFields}
      />
      <CaseDetailsCollapsibleSection
        title="معلومات ادارية اخري"
        fields={administrativeFields}
      />
    </div>
  );
};
