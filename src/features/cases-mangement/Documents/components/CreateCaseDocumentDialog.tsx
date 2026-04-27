import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { useCreateCaseDocument } from "../api/hooks/useCreateCaseDocument";
import type { CaseDocumentFormValues } from "../types/CaseDocumentT";

const validationSchema = Yup.object({
  document_name: Yup.string().required("اسم المستند مطلوب"),
  phone: Yup.string().required("رقم الهاتف مطلوب"),
  document_details: Yup.string().required("تفاصيل المستند مطلوبة"),
  file: Yup.mixed<FileList>()
    .required("الملف مطلوب")
    .test("file-required", "الملف مطلوب", (value) =>
      Boolean(value && value.length > 0),
    ),
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
    file: null,
  };

  const handleSubmit = (values: CaseDocumentFormValues) => {
    const formData = new FormData();

    formData.append("document_type", "CASE_RELATED");
    formData.append("document_name", values.document_name);
    formData.append("phone", values.phone);
    formData.append("caseId", caseId);
    formData.append("document_details", values.document_details);

    if (values.file?.[0]) {
      formData.append("file", values.file[0]);
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

          <FileUpload name="file" label="رفع الملف" />

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
