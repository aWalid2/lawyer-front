import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import type {
  ExpertSessionRequest,
  ExpertSessionStatus,
} from "../../../../types/ExpertSessionApiTypes";

interface AddExpertModalFormProps {
  defaultValues: ExpertSessionRequest;
  isEditMode: boolean;
  isPending: boolean;
  onSubmit: (values: ExpertSessionRequest) => Promise<void>;
}

const validationSchema = Yup.object({
  expert_report_number: Yup.string().required("رقم تقرير الخبير مطلوب"),
  assigning_authority: Yup.string().required("الجهة المكلفة مطلوبة"),
  assignment_date: Yup.string().required("تاريخ التكليف مطلوب"),
  expert_office_name: Yup.string().required("اسم مكتب الخبراء مطلوب"),
  task_start_date: Yup.string().required("تاريخ مباشرة المهمة مطلوب"),
  subject_of_expertise: Yup.string().required("موضوع الخبرة مطلوب"),
  final_opinion: Yup.string().required("الرأي النهائي للخبير مطلوب"),
  submission_date: Yup.string().required("تاريخ إيداع التقرير مطلوب"),
  status: Yup.string().required("الحالة مطلوبة"),
});

const statusOptions: Array<{ value: ExpertSessionStatus; label: string }> = [
  { value: "UNDER_REVIEW", label: "قيد المراجعة" },
  { value: "APPROVED", label: "مُعتمد" },
  { value: "UNDER_OBJECTION", label: "مُعترض عليه" },
];

export const AddExpertModalForm: React.FC<AddExpertModalFormProps> = ({
  defaultValues,
  isEditMode,
  isPending,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {() => (
        <Form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputForm
              name="expert_report_number"
              label="رقم تقرير الخبير"
              type="text"
              placeholder="أدخل رقم تقرير الخبير"
            />
            <InputForm
              name="assigning_authority"
              label="الجهة المكلفة"
              type="text"
              placeholder="محكمة / نيابة / هيئة تحكيم"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputForm
              name="assignment_date"
              label="تاريخ التكليف"
              type="date"
            />
            <InputForm
              name="expert_office_name"
              label="مكتب الخبراء / الخبير"
              type="text"
              placeholder="أدخل اسم مكتب الخبراء"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputForm
              name="task_start_date"
              label="تاريخ مباشرة المهمة"
              type="date"
            />
            <InputForm
              name="subject_of_expertise"
              label="موضوع الخبرة"
              type="text"
              placeholder="تقدير تعويض / فحص توقيع / فحص طبي ..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputForm
              name="final_opinion"
              label="الرأي النهائي للخبير"
              type="text"
              placeholder="ملخص ما انتهى إليه الخبير"
            />
            <InputForm
              name="submission_date"
              label="تاريخ إيداع التقرير"
              type="date"
            />
          </div>

          <SelectForm name="status" label="الحالة" options={statusOptions} />

          <SubmitButton
            isPending={isPending}
            loadingText={
              isEditMode ? "جاري حفظ التعديلات..." : "جاري إضافة الخبير..."
            }
            className="mt-4"
          >
            {isEditMode ? "حفظ التعديلات" : "إضافة خبير"}
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
