import React from "react";
import { Formik, Form } from "formik";
import { InputForm } from "@/shared/components/InputForm";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import * as Yup from "yup";

interface AddLegislationModalProps {
  onClose: () => void;
  onSave: (values: any) => void;
  initialValues?: any;
}

const AddLegislationModal: React.FC<AddLegislationModalProps> = ({
  onClose,
  onSave,
  initialValues,
}) => {
  const defaultValues = {
    legislationNumber: initialValues?.legislationNumber || "",
    legislationType: initialValues?.legislationType || "قانون",
    legislationTitle: initialValues?.legislationTitle || "",
    issuingBody: initialValues?.issuingBody || "",
    issueDate: initialValues?.issueDate || "",
    effectiveDate: initialValues?.effectiveDate || "",
    courtLevel: initialValues?.courtLevel || "",
    status: initialValues?.status || "ساري",
    summary: initialValues?.summary || "",
  };

  const validationSchema = Yup.object().shape({
    legislationNumber: Yup.string().required("رقم التشريع/الحكم مطلوب"),
    legislationType: Yup.string().required("النوع مطلوب"),
    legislationTitle: Yup.string().required("عنوان التشريع مطلوب"),
    issuingBody: Yup.string().required("جهة الإصدار مطلوبة"),
    issueDate: Yup.string().required("تاريخ الإصدار مطلوب"),
    status: Yup.string().required("الحالة مطلوبة"),
  });

  return (
    <LayoutDialog
      title={initialValues ? "تعديل التشريع/الحكم" : "إضافة تشريع / حكم جديد"}
      open={true}
      onOpenChange={onClose}
    >
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave(values);
        }}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputForm
                name="legislationNumber"
                label="رقم التشريع/الحكم"
                type="text"
                placeholder="مثال: قانون 1 لسنة 2024"
              />
              <SelectForm
                name="legislationType"
                label="النوع"
                options={[
                  { value: "قانون", label: "قانون" },
                  { value: "لائحة", label: "لائحة" },
                  { value: "قرار وزاري", label: "قرار وزاري" },
                  { value: "حكم محكمة", label: "حكم محكمة" },
                  { value: "مبدأ قضائي", label: "مبدأ قضائي" },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <InputForm
                name="legislationTitle"
                label="عنوان التشريع"
                type="text"
                placeholder="أدخل العنوان الكامل للتشريع/الحكم"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputForm
                name="issuingBody"
                label="جهة الإصدار"
                type="text"
                placeholder="مجلس النواب / وزارة العدل / محكمة النقض ..."
              />
              <InputForm name="issueDate" label="تاريخ الإصدار" type="date" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputForm
                name="effectiveDate"
                label="تاريخ النفاذ (اختياري)"
                type="date"
              />
              {values.legislationType === "حكم محكمة" && (
                <SelectForm
                  name="courtLevel"
                  label="درجة المحكمة"
                  options={[
                    { value: "محكمة النقض", label: "محكمة النقض" },
                    { value: "محكمة استئناف", label: "محكمة استئناف" },
                    { value: "محكمة ابتدائية", label: "محكمة ابتدائية" },
                    { value: "محكمة إدارية", label: "محكمة إدارية" },
                    { value: "محكمة دستورية", label: "محكمة دستورية" },
                  ]}
                />
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectForm
                name="status"
                label="الحالة"
                options={[
                  { value: "ساري", label: "ساري" },
                  { value: "ملغي", label: "ملغي" },
                  { value: "معدل", label: "معدل" },
                  { value: "مبدأ قضائي", label: "مبدأ قضائي" },
                ]}
              />
            </div>

            <TextAreaForm
              name="summary"
              label="ملخص (اختياري)"
              placeholder="أدخل ملخصاً للتشريع أو الحكم"
            />

            <button
              type="submit"
              className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              {initialValues ? "حفظ التعديلات" : "إضافة تشريع / حكم"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};

export default AddLegislationModal;
