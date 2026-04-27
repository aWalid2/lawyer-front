import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { useUpdateCaseDocument } from "../api/hooks/useUpdateCaseDocument";
import type {
  CaseDocument,
  CaseDocumentFormValues,
} from "../types/CaseDocumentT";

const validationSchema = Yup.object({
  case_title: Yup.string().required("اسم المستند مطلوب"),
  phone: Yup.string().required("رقم الهاتف مطلوب"),
  document_details: Yup.string().required("تفاصيل المستند مطلوبة"),
});

interface EditCaseDocumentDialogProps {
  document: CaseDocument;
  caseId: string;
  trigger: React.ReactNode;
  onDocumentUpdated?: () => void;
}

export const EditCaseDocumentDialog: React.FC<EditCaseDocumentDialogProps> = ({
  document,
  caseId,
  trigger,
  onDocumentUpdated,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutate: updateDocument, isPending } = useUpdateCaseDocument();

  const initialValues: CaseDocumentFormValues = {
    case_title: document.document_name || "",
    phone: document.phone || "",
    document_details: document.document_details || "",
    file: null,
  };

  const handleSubmit = (values: CaseDocumentFormValues) => {
    const formData = new FormData();

    formData.append("document_type", "CASE_RELATED");
    formData.append("case_title", values.case_title);
    formData.append("phone", values.phone);
    formData.append("caseId", caseId);
    formData.append("document_details", values.document_details);

    if (values.file?.[0]) {
      formData.append("file", values.file[0]);
    }

    updateDocument(
      {
        id: document.id,
        data: formData,
      },
      {
        onSuccess: () => {
          setOpen(false);
          onDocumentUpdated?.();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 text-right sm:max-w-178.75 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            تعديل المستند
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
            <InputForm
              name="case_title"
              label="اسم المستند"
              type="text"
              placeholder="أدخل اسم المستند"
            />

            <InputForm
              name="phone"
              label="رقم الهاتف"
              type="text"
              placeholder="أدخل رقم الهاتف"
            />

            <InputForm
              name="document_details"
              label="تفاصيل المستند"
              type="text"
              placeholder="أدخل تفاصيل المستند"
            />

            <FileUpload name="file" label="رفع ملف جديد" />

            <button
              type="submit"
              disabled={isPending}
              className="bg-primary-gradient rounded-main mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? "جاري التعديل..." : "حفظ التعديلات"}
            </button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
