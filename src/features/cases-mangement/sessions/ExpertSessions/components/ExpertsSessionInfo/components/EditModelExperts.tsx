import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import type { ExpertSessionType } from "../../../types/ExperstSessionType";
import * as Yup from "yup";

interface EditModelExpertsProps {
  document: ExpertSessionType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: any) => Promise<void> | void;
}

export const EditModelExperts: React.FC<EditModelExpertsProps> = ({
  document,
  open,
  onOpenChange,
  onSave,
}) => {
  const initialValues = {
    expertReportNumber: document.expertReportNumber || "",
    assignedAuthority: document.assignedAuthority || "",
    assignmentDate: document.assignmentDate || "",
    expertOfficeName: document.expertOfficeName || "",
    taskStartDate: document.taskStartDate || "",
    subjectOfExpertise: document.subjectOfExpertise || "",
    finalOpinion: document.finalOpinion || "",
    reportSubmissionDate: document.reportSubmissionDate || "",
    objections: document.objections || "",
    notes: document.notes || "",
  };

  const validationSchema = Yup.object().shape({
    expertReportNumber: Yup.string().required("رقم تقرير الخبير مطلوب"),
    assignedAuthority: Yup.string().required("الجهة المكلفة مطلوبة"),
    assignmentDate: Yup.string().required("تاريخ التكليف مطلوب"),
    expertOfficeName: Yup.string().required("اسم مكتب الخبراء مطلوب"),
    taskStartDate: Yup.string().required("تاريخ مباشرة المهمة مطلوب"),
    subjectOfExpertise: Yup.string().required("موضوع الخبرة مطلوب"),
    finalOpinion: Yup.string().required("الرأي النهائي للخبير مطلوب"),
    reportSubmissionDate: Yup.string().required("تاريخ إيداع التقرير مطلوب"),
    objections: Yup.string().nullable(),
    notes: Yup.string().nullable(),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-178.75 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={() => onOpenChange(false)}>
          <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            تعديل بيانات الخبراء
          </DialogTitle>
          <DialogDescription className="sr-only">
            نموذج تعديل بيانات تقرير الخبير الحالي.
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSave(values);
              onOpenChange(false);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="expertReportNumber"
                  label="رقم تقرير الخبير"
                  type="text"
                  placeholder="أدخل رقم تقرير الخبير"
                />
                <InputForm
                  name="assignedAuthority"
                  label="الجهة المكلفة"
                  type="text"
                  placeholder="محكمة / نيابة / هيئة تحكيم"
                />

                <InputForm
                  name="assignmentDate"
                  label="تاريخ التكليف"
                  type="date"
                />
                <InputForm
                  name="expertOfficeName"
                  label="مكتب الخبراء / الخبير"
                  type="text"
                  placeholder="أدخل اسم مكتب الخبراء"
                />

                <InputForm
                  name="taskStartDate"
                  label="تاريخ مباشرة المهمة"
                  type="date"
                />
                <InputForm
                  name="subjectOfExpertise"
                  label="موضوع الخبرة"
                  type="text"
                  placeholder="تقدير تعويض / فحص توقيع / فحص طبي ..."
                />

                <InputForm
                  name="finalOpinion"
                  label="الرأي النهائي للخبير"
                  type="text"
                  placeholder="ملخص ما انتهى إليه الخبير"
                />
                <InputForm
                  name="reportSubmissionDate"
                  label="تاريخ إيداع التقرير"
                  type="date"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <TextAreaForm
                  name="objections"
                  label="الاعتراضات"
                  placeholder="اعتراضات الخصوم على التقرير"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <TextAreaForm
                  name="notes"
                  label="ملاحظات إضافية"
                  placeholder="أدخل أي ملاحظات إضافية عن الخبرة"
                />
              </div>

              <button
                type="submit"
                className="bg-primary-gradient rounded-main mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
              >
                حفظ التغييرات
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
