import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";
import { LayoutDialog } from "@/shared/components/dialogs/LayoutDialog";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { SelectForm } from "@/shared/components/SelectForm";
import { useCreateCaseDocument } from "../api/hooks/useCreateCaseDocument";
import type { CaseDocumentFormValues } from "../types/CaseDocumentT";
import { DOCUMENT_CLASSIFICATION_OPTIONS } from "@/shared/constants/documentOptions";

const validationSchema = Yup.object({
  document_name: Yup.string().required("اسم المستند مطلوب"),
  document_details: Yup.string().required("تفاصيل المستند مطلوبة"),
  file: Yup.mixed<File>().required("الملف مطلوب"),
});

interface CreateCaseDocumentDialogProps {
  caseId: string;
  onDocumentAdded?: () => void;
}

export const CreateCaseDocumentDialog: React.FC<
  CreateCaseDocumentDialogProps
> = ({ caseId, onDocumentAdded }) => {
  const [open, setOpen] = React.useState(false);
  const { mutate: createDocument, isPending } = useCreateCaseDocument();

  const initialValues: CaseDocumentFormValues = {
    document_name: "",
    phone: "",
    document_details: "",
    document_classification: "",
    file: null,
  };

  const handleSubmit = (values: CaseDocumentFormValues) => {
    const formData = new FormData();

    formData.append("document_type", "CASE_RELATED");
    formData.append("document_name", values.document_name);
    formData.append("phone", values.phone);
    formData.append("caseId", caseId);
    formData.append("document_details", values.document_details);

    if (values.document_classification) {
      formData.append(
        "document_classification",
        values.document_classification,
      );
    }

    if (values.file) {
      formData.append("file", values.file);
    }

    createDocument(formData, {
      onSuccess: () => {
        setOpen(false);
        onDocumentAdded?.();
      },
    });
  };

  return (
    <LayoutDialog
      title="إضافة مستند جديد"
      trigger={
        <HeaderActionButton
          label="إضافة مستند"
          variant="primary"
          icon={<span className="text-xl">+</span>}
          iconPosition="left"
          className="rounded-main h-12.5 px-8"
        />
      }
      open={open}
      onOpenChange={setOpen}
      size="lg"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <InputForm
            name="document_name"
            label="اسم المستند"
            type="text"
            placeholder="أدخل اسم المستند"
          />

          <SelectForm
            name="document_classification"
            label="تصنيف المستند"
            options={DOCUMENT_CLASSIFICATION_OPTIONS}
            placeholder="اختر تصنيف المستند"
          />

          <InputForm
            name="document_details"
            label="تفاصيل المستند"
            type="text"
            placeholder="أدخل تفاصيل المستند"
          />

          <FileUpload name="file" label="رفع الملف" className="w-full" />

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary-gradient rounded-main mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "جاري الإضافة..." : "إضافة مستند"}
          </button>
        </Form>
      </Formik>
    </LayoutDialog>
  );
};
