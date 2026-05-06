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
import { useUpdateCase } from "../../../api/hooks/useUpdateCase";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { useFetchClients } from "@/shared/api/hooks/useGetClients";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { useGetCaseType } from "../../../api/hooks/useGetCaseType";
import { useGetCaseStatus } from "../../../api/hooks/useGetCaseStatus";
import {
  CASE_SITUATION_OPTIONS,
  CASE_TITLE_OPTIONS,
  LITIGATION_LEVEL_OPTIONS,
} from "@/shared/constants/caseOptions";

interface EditCaseDialogProps {
  caseItem: any;
  onSave?: (values: any) => void;
  trigger: React.ReactNode;
  isPending?: boolean;
}

export const EditClientCaseDialog: React.FC<EditCaseDialogProps> = ({
  caseItem,
  trigger,
  onSave,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: updateCase, isPending } = useUpdateCase();
  const { data: clients } = useFetchClients();
  const { data: caseType } = useGetCaseType();
  const { data: caseStatus } = useGetCaseStatus();
  const initialValues = {
    ...caseItem,
    case_number: caseItem.case_number || "",
    case_number_at_prosecution: caseItem.case_number_at_prosecution || "",
    client_id: caseItem.client_id
      ? String(caseItem.client_id)
      : caseItem.client?.id
        ? String(caseItem.client.id)
        : "",
    client_type: caseItem.client_type || "",
    created_at: caseItem.created_at || "",
    case_entry_date: caseItem.case_entry_date || "",
    case_status_id: caseItem.case_status_id
      ? String(caseItem.case_status_id)
      : caseItem.caseStatus?.id
        ? String(caseItem.caseStatus.id)
        : "",
    case_type_id: caseItem.case_type_id
      ? String(caseItem.case_type_id)
      : caseItem.case_type?.id
        ? String(caseItem.case_type.id)
        : "",
    case_situation: caseItem.case_situation || "",
  };

  const options =
    clients?.data?.map((client: any) => ({
      label: client.name,
      value: String(client.user_id),
    })) || [];
  const caseTypeOptions =
    caseType?.data?.map((caseType: any) => ({
      label: caseType.name,
      value: String(caseType.id),
    })) || [];
  const caseStatusOptions =
    caseStatus?.data?.map((caseStatus: any) => ({
      label: caseStatus.name,
      value: String(caseStatus.id),
    })) || [];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-[772px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogClose asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15"
          >
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            تعديل بيانات القضية
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                ...values,
                client_id: values.client_id
                  ? Number(values.client_id)
                  : undefined,
                case_type_id: values.case_type_id
                  ? Number(values.case_type_id)
                  : undefined,
                case_status_id: values.case_status_id
                  ? Number(values.case_status_id)
                  : undefined,
              };
              await updateCase({ id: caseItem.id, data: payload as any });
              onSave?.(values);
              setOpen(false);
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
                <InputForm
                  name="case_sequence"
                  label="كود القضية"
                  type="text"
                  disabled
                />
                <InputForm name="case_number" label="الرقم الآلي" type="text" />
                <SelectForm
                  name="client_id"
                  label="اسم العميل"
                  options={options}
                />

                <SelectForm
                  name="client_type"
                  label="صفة المدعي"
                  options={CASE_TITLE_OPTIONS}
                />

                <SelectForm
                  name="case_type_id"
                  label="نوع القضية"
                  options={caseTypeOptions}
                />
                <SelectForm
                  name="case_status_id"
                  label="الحالة"
                  options={caseStatusOptions}
                />
                <SelectForm
                  name="case_situation"
                  label="وضع القضية عند الاستلام"
                  options={CASE_SITUATION_OPTIONS}
                  disabled
                />
                <SelectForm
                  name="case_status_at_receipt"
                  label="درجة التقاضي"
                  options={LITIGATION_LEVEL_OPTIONS}
                />

                <InputForm
                  name="created_at"
                  label="تاريخ انشاء القضية"
                  type="date"
                />
                <InputForm
                  name="case_entry_date"
                  label="تاريخ ورود القضية"
                  type="date"
                />
                <TextAreaForm
                  name="notes"
                  label="ملاحظات"
                  placeholder="أضف ملاحظات..."
                  className="col-span-2"
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
