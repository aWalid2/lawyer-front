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

import { useGetCaseStatus } from "../../../api/hooks/useGetCaseStatus";
import { useGetClientStatuses } from "@/features/settings/client-statuses/api/hooks/useGetClientStatuses";
import type { EditableClientCase } from "../../../types/typesClientDetails";
import {
  CASE_SITUATION_OPTIONS,
  LITIGATION_LEVEL_OPTIONS,
} from "@/shared/constants/caseOptions";
import { usePaginatedOptions } from "@/shared/hooks/usePaginatedOptions";
import { getCaseTypes } from "@/features/settings/case-types/api/services/getCaseTypes";
import { useDebounce } from "@/shared/hooks/useDebounce";

interface EditCaseDialogProps {
  caseItem: EditableClientCase;
  onSave?: (values: EditableClientCase) => void;
  trigger: React.ReactNode;
  isPending?: boolean;
}

type SelectOptionEntity = {
  id: number | string;
  name: string;
};

type ClientOptionEntity = {
  user_id: number | string;
  name: string;
};

export const EditClientCaseDialog: React.FC<EditCaseDialogProps> = ({
  caseItem,
  trigger,
  onSave,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: updateCase, isPending } = useUpdateCase();
  const { data: clients } = useFetchClients(
    undefined,
    undefined,
    undefined,
    open,
  );

  const { data: caseStatus } = useGetCaseStatus();
  const { data: clientStatuses } = useGetClientStatuses(
    open ? 1 : undefined,
    100,
  );

  const [caseTypeSearch, setCaseTypeSearch] = React.useState("");
  const debouncedCaseTypeSearch = useDebounce(caseTypeSearch, 300);

  const fetchCaseTypePage = React.useCallback(
    async (page: number, search?: string) => {
      const response = await getCaseTypes(page, 15, search);
      return {
        items: (response.data ?? []).map((caseType) => ({
          label: caseType.name,
          value: String(caseType.id),
        })),
        totalPages: response.meta?.total_pages ?? 1,
      };
    },
    [],
  );

  const {
    options: caseTypeOptions,
    hasMoreOptions: caseTypeHasMoreOptions,
    isFetchingMore: caseTypeIsFetchingMore,
    loadNextPage: loadMoreCaseTypes,
  } = usePaginatedOptions(fetchCaseTypePage, debouncedCaseTypeSearch);

  const initialValues = {
    ...caseItem,
    case_number: caseItem.case_number || "",
    case_number_at_prosecution: caseItem.case_number_at_prosecution || "",
    client_id: caseItem.client_id
      ? String(caseItem.client_id)
      : caseItem.client?.id
        ? String(caseItem.client.id)
        : "",
    ClientStatus_id:
      caseItem.ClientStatus_id != null
        ? String(caseItem.ClientStatus_id)
        : caseItem.client_type || "",
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
    clients?.data?.map((client: ClientOptionEntity) => ({
      label: client.name,
      value: String(client.user_id),
    })) || [];

  const caseStatusOptions =
    caseStatus?.data?.map((caseStatus: SelectOptionEntity) => ({
      label: caseStatus.name,
      value: String(caseStatus.id),
    })) || [];
  const clientStatusOptions =
    clientStatuses?.data?.map((clientStatus: SelectOptionEntity) => ({
      label: clientStatus.name,
      value: String(clientStatus.id),
    })) || [];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-193 sm:rounded-[24px] sm:px-20 sm:py-10"
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
              const { ClientStatus_id, ...restValues } = values;
              const payload = {
                ...restValues,
                client_id: values.client_id
                  ? Number(values.client_id)
                  : undefined,
                case_type_id: values.case_type_id
                  ? Number(values.case_type_id)
                  : undefined,
                case_status_id: values.case_status_id
                  ? Number(values.case_status_id)
                  : undefined,
                ...(ClientStatus_id != null && ClientStatus_id !== ""
                  ? { ClientStatus_id: Number(ClientStatus_id) }
                  : {}),
              };
              await updateCase({ id: String(caseItem.id), data: payload });
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
                  name="ClientStatus_id"
                  label="صفة المدعي"
                  options={clientStatusOptions}
                  placeholder="اختر صفة الموكل"
                />

                <SelectForm
                  name="case_type_id"
                  label="نوع القضية"
                  options={caseTypeOptions}
                  placeholder="اختر نوع القضية"
                  showSearch={true}
                  onSearchChange={setCaseTypeSearch}
                  hasMoreOptions={caseTypeHasMoreOptions}
                  isFetchingMore={caseTypeIsFetchingMore}
                  onReachEnd={loadMoreCaseTypes}
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
