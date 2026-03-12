import React from "react";
import { Formik, Form, Field } from "formik";
import { X } from "lucide-react";
import type { ExpertSessionFormValues } from "./typesExpert";

interface AddExpertSessionModelProps {
  onClose: () => void;
  onSave: (values: ExpertSessionFormValues) => void;
  initialValues?: ExpertSessionFormValues;
}

export const AddExpertSessionModel: React.FC<AddExpertSessionModelProps> = ({
  onClose,
  onSave,
  initialValues,
}) => {
  const defaultValues: ExpertSessionFormValues = {
    sessionDate: "",
    sessionTime: "",
    lawyer: "",
    decision: "",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" dir="rtl">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute left-6 top-6 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-secondary mb-8 font-cairo">
          {initialValues ? "تعديل جلسة خبراء" : "إضافة جلسة خبراء"}
        </h2>

        <Formik initialValues={initialValues || defaultValues} onSubmit={onSave}>
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-cairo">تاريخ الجلسة</label>
                <Field name="sessionDate" type="date" className="w-full border rounded-lg p-2.5 bg-[#FBFBFB] h-[50px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-cairo">وقت الجلسة</label>
                <Field name="sessionTime" type="time" className="w-full border rounded-lg p-2.5 bg-[#FBFBFB] h-[50px]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-cairo">المحامي المسؤول</label>
              <Field
                name="lawyer"
                className="w-full border rounded-lg p-2.5 bg-[#FBFBFB] h-[50px]"
                placeholder="أدخل اسم المحامي"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-cairo">قرار الجلسة</label>
              <Field
                name="decision"
                className="w-full border rounded-lg p-2.5 bg-[#FBFBFB] h-[50px]"
                placeholder="أدخل قرار الجلسة"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-gradient text-white font-bold h-[50px] rounded-xl shadow-lg hover:opacity-90 transition-opacity font-cairo"
            >
              حفظ
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
