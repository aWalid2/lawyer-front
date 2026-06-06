import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
import { XIcon, AlertCircle, RefreshCw } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import type { Case } from "../types/casesTypes";
import { useUpdateCase } from "../api/hooks/useUpdateCase";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import {
  CASE_SITUATION_OPTIONS,
  LITIGATION_LEVEL_OPTIONS,
} from "@/shared/constants/caseOptions";
import { usePaginatedOptions } from "@/shared/hooks/usePaginatedOptions";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { fetchClients } from "@/shared/api/services/getClients";
import { getClientStatuses } from "@/features/settings/client-statuses/api/services/getClientStatuses";
import { getCaseTypes } from "@/features/settings/case-types/api/services/getCaseTypes";
import { fetchCaseStatuses } from "@/features/settings/case-statuses/api/service/getCaseStatuses";

interface EditCaseDialogProps {
  caseItem: Case;
  onSave: (values: Case) => void;
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

function RetryBanner({
  label,
  onRetry,
}: {
  label: string;
  onRetry: () => void;
}) {
  return (
    <div className="col-span-2 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      <AlertCircle size={16} />
      <span className="flex-1">فشل تحميل {label}</span>
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-1 rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200"
      >
        <RefreshCw size={14} />
        إعادة المحاولة
      </button>
    </div>
  );
}

/** Merges the currently selected value into the options list so it always displays. */
function useMergedOptions<
  T extends { label: React.ReactNode; value: string | number },
>(
  options: T[],
  selectedValue: string | number | null | undefined,
  selectedLabel: string | null | undefined,
): T[] {
  return useMemo(() => {
    if (!selectedValue || !selectedLabel) return options;
    const exists = options.some(
      (opt) => String(opt.value) === String(selectedValue),
    );
    if (exists) return options;
    // Prepend the selected item so it's always visible
    return [{ label: selectedLabel, value: selectedValue } as T, ...options];
  }, [options, selectedValue, selectedLabel]);
}

export const EditCaseDialog: React.FC<EditCaseDialogProps> = ({
  trigger,
  onSave,
  caseItem,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: updateCase, isPending } = useUpdateCase();
  const [hasOpened, setHasOpened] = useState(false);

  const [clientSearch, setClientSearch] = useState("");
  const [clientStatusSearch, setClientStatusSearch] = useState("");
  const [caseStatusSearch, setCaseStatusSearch] = useState("");
  const [caseTypeSearch, setCaseTypeSearch] = useState("");

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setHasOpened(true);
    } else {
      // Only reset search — keep data cached for next open
      setClientSearch("");
      setClientStatusSearch("");
      setCaseStatusSearch("");
      setCaseTypeSearch("");
    }
  };

  const debouncedClientSearch = useDebounce(clientSearch, 500);
  const debouncedClientStatusSearch = useDebounce(clientStatusSearch, 300);
  const debouncedCaseStatusSearch = useDebounce(caseStatusSearch, 300);
  const debouncedCaseTypeSearch = useDebounce(caseTypeSearch, 300);

  const fetchClientPage = useCallback(async (page: number, search?: string) => {
    const response = await fetchClients(page, 15, search || undefined);
    return {
      items: (response.data ?? []).map((client: ClientOptionEntity) => ({
        label: client.name,
        value: String(client.user_id),
      })),
      totalPages: response.meta?.total_pages ?? 1,
    };
  }, []);

  const {
    options: clientOptions,
    hasMoreOptions: clientHasMoreOptions,
    isFetchingMore: clientIsFetchingMore,
    isLoading: clientsLoading,
    hasError: clientsError,
    retry: retryClients,
    loadNextPage: loadMoreClients,
  } = usePaginatedOptions(fetchClientPage, debouncedClientSearch, 1, hasOpened);

  // Merge selected client into options so it always displays even if on a different page
  const clientName = caseItem.client
    ? `${caseItem.client.first_name || ""} ${caseItem.client_name || ""}`.trim() ||
      undefined
    : undefined;
  const mergedClientOptions = useMergedOptions(
    clientOptions,
    caseItem.client?.id,
    clientName,
  );

  const fetchClientStatusPage = useCallback(
    async (page: number, search?: string) => {
      const response = await getClientStatuses(page, 15, search || undefined);
      return {
        items: (response.data ?? []).map(
          (clientStatus: SelectOptionEntity) => ({
            label: clientStatus.name,
            value: String(clientStatus.id),
          }),
        ),
        totalPages: response.meta?.total_pages ?? 1,
      };
    },
    [],
  );

  const {
    options: clientStatusOptions,
    hasMoreOptions: clientStatusHasMoreOptions,
    isFetchingMore: clientStatusIsFetchingMore,
    isLoading: clientStatusLoading,
    hasError: clientStatusError,
    retry: retryClientStatuses,
    loadNextPage: loadMoreClientStatuses,
  } = usePaginatedOptions(
    fetchClientStatusPage,
    debouncedClientStatusSearch,
    1,
    hasOpened,
  );

  const fetchCaseStatusPage = useCallback(
    async (page: number, search?: string) => {
      const response = await fetchCaseStatuses(page, 15, search || undefined);
      return {
        items: (response.data ?? []).map((caseStatus: SelectOptionEntity) => ({
          label: caseStatus.name,
          value: String(caseStatus.id),
        })),
        totalPages: response.meta?.total_pages ?? 1,
      };
    },
    [],
  );

  const {
    options: caseStatusOptions,
    hasMoreOptions: caseStatusHasMoreOptions,
    isFetchingMore: caseStatusIsFetchingMore,
    isLoading: caseStatusLoading,
    hasError: caseStatusError,
    retry: retryCaseStatuses,
    loadNextPage: loadMoreCaseStatuses,
  } = usePaginatedOptions(
    fetchCaseStatusPage,
    debouncedCaseStatusSearch,
    1,
    hasOpened,
  );

  const fetchCaseTypePage = useCallback(
    async (page: number, search?: string) => {
      const response = await getCaseTypes(page, 15, search || undefined);
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
    isLoading: caseTypeLoading,
    hasError: caseTypeError,
    retry: retryCaseTypes,
    loadNextPage: loadMoreCaseTypes,
  } = usePaginatedOptions(
    fetchCaseTypePage,
    debouncedCaseTypeSearch,
    1,
    hasOpened,
  );

  // Merge selected case-type into options (critical fix for items on page 2+)
  const mergedCaseTypeOptions = useMergedOptions(
    caseTypeOptions,
    (caseItem.case_type as any)?.id,
    (caseItem.case_type as any)?.name,
  );

  // Merge selected case-status into options
  const mergedCaseStatusOptions = useMergedOptions(
    caseStatusOptions,
    caseItem.case_status_id,
    caseItem.caseStatus?.name,
  );

  const isLoadingAny =
    clientsLoading ||
    clientStatusLoading ||
    caseStatusLoading ||
    caseTypeLoading;

  const hasAnyError =
    clientsError || clientStatusError || caseStatusError || caseTypeError;

  const initialValues: Case = {
    ...caseItem,
    case_number: caseItem.case_number || "",
    case_number_at_prosecution: caseItem.case_number_at_prosecution || "",
    client_id: String(caseItem.client?.id) || "",
    ClientStatus_id:
      caseItem.ClientStatus_id != null ? String(caseItem.ClientStatus_id) : "",
    created_at: caseItem.created_at || "",
    case_entry_date: caseItem.case_entry_date || "",
    case_status_id: caseItem.case_status_id
      ? String(caseItem.case_status_id)
      : "",
    case_type_id: (caseItem.case_type as any)?.id
      ? String((caseItem.case_type as any).id)
      : "",
    case_situation: caseItem.case_situation || "",
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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

        {hasAnyError && !isLoadingAny && (
          <div className="mb-4 flex flex-col gap-3">
            {clientsError && (
              <RetryBanner label="العملاء" onRetry={retryClients} />
            )}
            {clientStatusError && (
              <RetryBanner label="صفات العملاء" onRetry={retryClientStatuses} />
            )}
            {caseTypeError && (
              <RetryBanner label="أنواع القضايا" onRetry={retryCaseTypes} />
            )}
            {caseStatusError && (
              <RetryBanner label="حالات القضايا" onRetry={retryCaseStatuses} />
            )}
          </div>
        )}

        <Formik
          key={caseItem.id}
          initialValues={initialValues}
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
              await updateCase({ id: caseItem.id, data: payload });
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
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
                <InputForm
                  name="case_sequence"
                  label="كود القضية"
                  type="text"
                  disabled
                />
                <InputForm
                  name="reference_number"
                  label="الرقم الآلي"
                  type="text"
                />
                <SelectForm
                  name="client_id"
                  label="اسم العميل"
                  options={mergedClientOptions}
                  showSearch={true}
                  onSearchChange={setClientSearch}
                  hasMoreOptions={clientHasMoreOptions}
                  isFetchingMore={clientIsFetchingMore || clientsLoading}
                  onReachEnd={loadMoreClients}
                />

                <SelectForm
                  name="ClientStatus_id"
                  label="صفة المدعي"
                  options={clientStatusOptions}
                  placeholder="اختر صفة الموكل"
                  showSearch={true}
                  onSearchChange={setClientStatusSearch}
                  hasMoreOptions={clientStatusHasMoreOptions}
                  isFetchingMore={
                    clientStatusIsFetchingMore || clientStatusLoading
                  }
                  onReachEnd={loadMoreClientStatuses}
                />

                <SelectForm
                  showSearch={true}
                  label="نوع القضية"
                  name="case_type_id"
                  options={mergedCaseTypeOptions}
                  placeholder="اختر نوع القضية"
                  onSearchChange={setCaseTypeSearch}
                  hasMoreOptions={caseTypeHasMoreOptions}
                  isFetchingMore={caseTypeIsFetchingMore || caseTypeLoading}
                  onReachEnd={loadMoreCaseTypes}
                />
                <SelectForm
                  showSearch={true}
                  label="حالة القضية"
                  name="case_status_id"
                  options={mergedCaseStatusOptions}
                  placeholder="اختر حالة القضية"
                  onSearchChange={setCaseStatusSearch}
                  hasMoreOptions={caseStatusHasMoreOptions}
                  isFetchingMore={caseStatusIsFetchingMore || caseStatusLoading}
                  onReachEnd={loadMoreCaseStatuses}
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
