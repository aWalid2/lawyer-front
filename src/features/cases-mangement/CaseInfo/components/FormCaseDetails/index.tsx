import React, { useState } from "react";
import { Form, Formik } from "formik";
import { InputForm } from "./components/InputForm";
import type {
  FormCaseDetailsProps,
  CaseFormValues,
} from "./components/typesCaseInfo";

export const FormCaseDetails: React.FC<FormCaseDetailsProps> = ({
  caseData,
  isEditing,
  setIsEditing,
}) => {
  const initialValues: CaseFormValues = caseData || {
    autoNumber: "7363",
    complaintNumber: "543257",
    clientName: "خليل محمد",
    caseTitle: "خليل محمد",
    court: "محكمة1",
    litigationLevel: "اول درجة",
    status: "متداولة",
    caseType: "جنائي",
    clientRelation: "مدعي عليه",
    statusOnReceipt: "متداولة",
    creationDate: "2026-01-20",
    receiptDate: "2026-01-20",
    notes: "-",
  };

  return (
    <Formik<CaseFormValues>
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values) => {
        console.log("Form submitted:", values);
        setIsEditing(false);
      }}
    >
      <Form className="space-y-8">
        {/* Form Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          dir="rtl"
        >
          <InputForm
            name="autoNumber"
            label="الرقم الآلي للقضية"
            disabled={!isEditing}
            type="text"
          />
          <InputForm
            name="complaintNumber"
            label="رقم الشكوى"
            disabled={!isEditing}
            type="text"
          />

          <InputForm
            name="clientName"
            label="اسم الموكل"
            disabled={!isEditing}
            type="text"
          />
          <InputForm
            name="caseTitle"
            label="عنوان القضية"
            disabled={!isEditing}
            type="text"
          />

          <InputForm
            name="court"
            label="المحكمة"
            disabled={!isEditing}
            type="text"
          />
          <InputForm
            name="litigationLevel"
            label="درجة التقاضي الحالية"
            disabled={!isEditing}
            type="text"
          />

          <InputForm
            name="status"
            label="حالة القضية"
            disabled={!isEditing}
            type="text"
          />
          <InputForm
            name="caseType"
            label="نوع القضية"
            disabled={!isEditing}
            type="text"
          />

          <InputForm
            name="clientRelation"
            label="صفة الموكل"
            disabled={!isEditing}
            type="text"
          />
          <InputForm
            name="statusOnReceipt"
            label="وضع القضية عند الاستلام"
            disabled={!isEditing}
            type="text"
          />

          <InputForm
            name="creationDate"
            label="تاريخ إنشاء القضية"
            disabled={!isEditing}
            type="date"
          />
          <InputForm
            name="receiptDate"
            label="تاريخ ورود القضية في المكتب"
            disabled={!isEditing}
            type="date"
          />

          <div className="md:col-span-2 mt-2 flex flex-col w-full">
            <label className="block mb-2 text-sm font-medium text-secondary text-right pr-2">
              ملاحظات
            </label>
            <textarea
              name="notes"
              className="w-full border border-[#E8E8E8] rounded-xl p-4 bg-[#FBFBFB] min-h-[50px] text-secondary text-sm text-right pr-6 disabled:opacity-70"
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-primary-gradient text-white px-8 py-2.5 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
            >
              حفظ التغييرات
            </button>
          </div>
        )}
      </Form>
    </Formik>
  );
};
