import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputForm } from "@/shared/components/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { useUpdateCaseDocument } from "../api/hooks/useUpdateCaseDocument";
import type {
  CaseDocument,
  CaseDocumentFormValues,
} from "../types/CaseDocumentT";

const validationSchema = Yup.object({
  document_name: Yup.string().required("اسم المستند مطلوب"),
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
    document_name: document.document_name || "",
    phone: document.phone || "",
    document_details: document.document_details || "",
    file: null,
  };

  const handleSubmit = (values: CaseDocumentFormValues) => {
    const formData = new FormData();

    formData.append("document_type", "CASE_RELATED");
    formData.append("document_name", values.document_name);
    formData.append("phone", values.phone);
    formData.append("case", caseId);
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
    <LayoutDialog
      title="تعديل المستند"
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      size="lg"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className="space-y-4">
          <InputForm
            name="document_name"
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
    </LayoutDialog>
  );
};
