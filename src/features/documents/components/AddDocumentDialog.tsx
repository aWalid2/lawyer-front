import React, { useMemo } from "react";
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
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { SelectForm } from "@/shared/components/SelectForm";
import {
  extractCasesList,
  useFetchCasesInfinite,
} from "@/features/UserTasks/api/hooks/useGetCase";
import { useAddDocument } from "../api/hooks/useAddDocument";

interface AddDocumentDialogProps {
  filter: string;
  onDocumentAdded?: () => void;
}

interface DocumentCaseOption {
  id?: number | string;
  case_id?: number | string;
  case_title?: string;
}

interface AddDocumentFormValues {
  document_type: string;
  document_category: string;
  document_name: string;
  document_details: string;
  file: FileList | null;
  caseId: string;
}

const validationSchema = Yup.object({
  document_type: Yup.string().required("يرجى اختيار نوع المستند"),
  document_category: Yup.string().when("document_type", {
    is: "NOT_CASE_RELATED",
    then: (schema) => schema.required("نوع المستند مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  document_name: Yup.string(),
  document_details: Yup.string().required("تفاصيل المستند مطلوبة"),
  caseId: Yup.string().when("document_type", {
    is: "CASE_RELATED",
    then: (schema) => schema.required("يرجى اختيار القضية"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({
  onDocumentAdded,
}) => {
  const {
    data: cases,
    isPending: isCasesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchCasesInfinite();
  const { mutate: addDocument, isPending } = useAddDocument();
  const [open, setOpen] = React.useState(false);

  const clientId = localStorage.getItem("clientId") || "";

  const initialValues: AddDocumentFormValues = {
    document_type: "NOT_CASE_RELATED",
    document_category: "",
    document_name: "",
    document_details: "",
    file: null,
    caseId: "",
  };

  const caseOptions = useMemo(() => {
    const caseEntries = new Map<string, string>();

    cases?.pages.forEach((page) => {
      extractCasesList(page).forEach((caseItem: DocumentCaseOption) => {
        const caseId = String(caseItem.id || caseItem.case_id || "");
        if (!caseId || caseEntries.has(caseId)) {
          return;
        }

        caseEntries.set(caseId, caseItem.case_title || caseId);
      });
    });

    return Array.from(caseEntries, ([value, label]) => ({ value, label }));
  }, [cases]);

  const handleSubmit = (values: AddDocumentFormValues) => {
    const formData = new FormData();

    formData.append("document_type", values.document_type);
    formData.append("document_details", values.document_details);

    if (values.document_name) {
      formData.append("document_name", values.document_name);
    }

    if (values.document_type === "CASE_RELATED") {
      const caseIdNumber = Number(values.caseId);
      if (Number.isNaN(caseIdNumber)) {
        console.error("Invalid caseId:", values.caseId);
        return;
      }

      formData.append("caseId", String(caseIdNumber));
      formData.append("document_category", "");
    } else {
      formData.append("document_category", values.document_category);
    }

    if (values.file && values.file.length > 0) {
      formData.append("file", values.file[0]);
    }

    addDocument(
      {
        clientId,
        data: formData,
      },
      {
        onSuccess: () => {
          setOpen(false);
          onDocumentAdded?.();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <HeaderActionButton
          label="مستند جديد"
          variant="primary"
          icon={<span className="text-xl">+</span>}
          iconPosition="left"
          className="rounded-main h-12.5 px-8"
        />
      </DialogTrigger>
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
            إضافة مستند جديد
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <SelectForm
                name="document_type"
                label="اختار نوع المستند"
                options={[
                  { value: "CASE_RELATED", label: "المستند تابع للقضايا" },
                  {
                    value: "NOT_CASE_RELATED",
                    label: "المستند غير تابع للقضايا",
                  },
                ]}
              />

              {values.document_type === "CASE_RELATED" ? (
                <SelectForm
                  name="caseId"
                  label="اختر القضية"
                  options={caseOptions}
                  placeholder={
                    isCasesLoading && caseOptions.length === 0
                      ? "جاري تحميل القضايا..."
                      : "اختر القضية"
                  }
                  disabled={isCasesLoading && caseOptions.length === 0}
                  showSearch
                  hasMoreOptions={Boolean(hasNextPage)}
                  isFetchingMore={isFetchingNextPage}
                  onReachEnd={() => {
                    void fetchNextPage();
                  }}
                />
              ) : (
                <InputForm
                  name="document_category"
                  label="نوع المستند"
                  type="text"
                  placeholder="أدخل نوع المستند "
                />
              )}

              <InputForm
                name="document_name"
                label="اسم المستند "
                type="text"
                placeholder="أدخل اسم المستند"
              />

              <InputForm
                name="document_details"
                label="تفاصيل المستند"
                type="text"
                placeholder="أدخل تفاصيل المستند"
              />

              <FileUpload name="file" label="رفع الملفات" />

              <button
                type="submit"
                disabled={isPending}
                className="bg-primary-gradient rounded-main mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isPending ? "جاري الإضافة..." : "إضافة مستند"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
