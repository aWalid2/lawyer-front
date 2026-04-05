import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
import { XIcon } from "lucide-react";
import React from "react";
import { Formik, Form } from "formik";
import type { Case } from "../types/casesTypes";
import { useUpdateCase } from "../api/hooks/useUpdateCase";
import { SubmitButton } from "@/shared/components/SubmitButton";

interface EditCaseDialogProps {
  caseItem: Case;
  onSave: (values: Case) => void;
  trigger: React.ReactNode;
  isPending?: boolean;
}

export const EditCaseDialog: React.FC<EditCaseDialogProps> = ({
  trigger,
  onSave,
  caseItem,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: updateCase, isPending } = useUpdateCase();
  const initialValues: Case = {
    ...caseItem,
    case_number: caseItem.case_number || "",
    case_number_at_prosecution: caseItem.case_number_at_prosecution || "",
    client_name: caseItem.client_name || "",
    case_type: caseItem.case_type || "",
    case_situation: caseItem.case_situation || "",
    court: caseItem.court || "",
    judge: caseItem.judge || "",
    registrationDate: caseItem.registrationDate || "",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[772px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none"
        dir="rtl"
        showCloseButton={false}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogClose asChild >
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all"
          >
            <XIcon size={23} className="text-gray-500 " />
          </button>
        </DialogClose>
        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            تعديل بيانات القضية
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateCase({ id: caseItem.id, data: values });
              onSave(values);
              setOpen(false);
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <InputForm
                  name="case_number_at_prosecution"
                  label="رقم القضية"
                  type="text"
                />
                <InputForm
                  name="case_number"
                  label="الرقم الآلي"
                  type="text"
                />
                <InputForm
                  name="client_name"
                  label="اسم العميل"
                  type="text"
                />
                <InputForm
                  name="case_type"
                  label="الموضوع"
                  type="text"
                />
                <InputForm
                  name="case_situation"
                  label="الحالة"
                  type="text"
                />
                <InputForm
                  name="court"
                  label="المحكمة"
                  type="text"
                />
                <InputForm
                  name="judge"
                  label="القاضي"
                  type="text"
                />
                <InputForm
                  name="registrationDate"
                  label="تاريخ التسجيل"
                  type="text"
                />
              </div>
              <SubmitButton
                isPending={isPending}
                loadingText="جاري التعديل..."
                className="mt-6"
              >
                حفظ التغييرات
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
