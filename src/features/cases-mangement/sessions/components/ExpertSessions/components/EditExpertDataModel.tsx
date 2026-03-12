import React from "react";
import { Formik, Form, Field } from "formik";
import { X } from "lucide-react";
import type { ExpertData } from "./typesExpert";

interface EditExpertDataModelProps {
  onClose: () => void;
  onSave: (values: ExpertData) => void;
  initialValues: ExpertData;
}

export const EditExpertDataModel: React.FC<EditExpertDataModelProps> = ({
  onClose,
  onSave,
  initialValues,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" dir="rtl">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute left-6 top-6 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-secondary mb-8 font-cairo">تعديل بيانات الخبراء</h2>

        <Formik initialValues={initialValues} onSubmit={onSave}>
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-cairo">اسم الخبير</label>
                <Field name="expertName" className="w-full border rounded-lg p-2.5 bg-[#FBFBFB] h-[50px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-cairo">تاريخ الإحالة</label>
                <Field name="referralDate" type="date" className="w-full border rounded-lg p-2.5 bg-[#FBFBFB] h-[50px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-cairo">ماكن المكتب / الدائرة</label>
                <Field name="officeLocation" className="w-full border rounded-lg p-2.5 bg-[#FBFBFB] h-[50px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-cairo">تخصص الخبير</label>
                <Field name="expertType" className="w-full border rounded-lg p-2.5 bg-[#FBFBFB] h-[50px]" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-gradient text-white font-bold h-[50px] rounded-xl shadow-lg hover:opacity-90 transition-opacity font-cairo"
            >
              حفظ التغييرات
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
