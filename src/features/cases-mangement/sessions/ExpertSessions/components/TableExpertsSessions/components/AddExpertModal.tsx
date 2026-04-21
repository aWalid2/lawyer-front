import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import * as Yup from "yup";

import type {
  ExpertSessionRequest,
  ExpertSessionStatus,
} from "../../../types/ExpertSessionApiTypes";

interface AddExpertModalProps {
  onClose: () => void;
  onSave: (values: ExpertSessionRequest) => void;
  initialValues?: Partial<ExpertSessionRequest>;
}

const AddExpertModal: React.FC<AddExpertModalProps> = ({
  onClose,
  onSave,
  initialValues,
}) => {
  const defaultValues: ExpertSessionRequest = {
    expert_report_number: initialValues?.expert_report_number || "",
    assigning_authority: initialValues?.assigning_authority || "",
    assignment_date: initialValues?.assignment_date || "",
    expert_office_name: initialValues?.expert_office_name || "",
    task_start_date: initialValues?.task_start_date || "",
    subject_of_expertise: initialValues?.subject_of_expertise || "",
    final_opinion: initialValues?.final_opinion || "",
    submission_date: initialValues?.submission_date || "",
    status: (initialValues?.status as ExpertSessionStatus) || "UNDER_REVIEW",
  };

  const validationSchema = Yup.object().shape({
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-[12px] border-none px-6 py-6 sm:max-w-[715px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={onClose}>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-[12px] px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {initialValues ? "تعديل بيانات الخبير" : "إضافة خبير جديد"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
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

              <div className="grid grid-cols-1 gap-4">
                <SelectForm
                  name="status"
                  label="الحالة"
                  options={[
                    { value: "UNDER_REVIEW", label: "قيد المراجعة" },
                    { value: "APPROVED", label: "مُعتمد" },
                    { value: "UNDER_OBJECTION", label: "مُعترض عليه" },
                  ]}
                />
              </div>

              <button
                type="submit"
                className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
              >
                {initialValues ? "حفظ التعديلات" : "إضافة خبير"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpertModal;
