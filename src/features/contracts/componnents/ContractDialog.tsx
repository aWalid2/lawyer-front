import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { XIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import type { Contract, ContractFormValues } from "../types";
import { EMPTY_CONTRACT_FORM_VALUES, toContractFormValues } from "../types";
import * as Yup from "yup";
import { fetchClients } from "@/shared/api/services/getClients";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePaginatedOptions } from "@/shared/hooks/usePaginatedOptions";

interface ContractDialogProps {
  onSave: (values: ContractFormValues) => Promise<void> | void;
  initialValues?: Contract;
  trigger: React.ReactNode;
  isPending?: boolean;
}

const validationSchema = Yup.object().shape({
  clientId: Yup.string().required("اسم الموكل مطلوب"),
  startDate: Yup.string().required("تاريخ بداية العقد مطلوب"),
  contractValue: Yup.string().required("قيمة العقد مطلوبة"),
  contractDuration: Yup.string().required("مدة العقد مطلوبة"),
  file: Yup.mixed().nullable(),
});

export const ContractDialog: React.FC<ContractDialogProps> = ({
  trigger,
  onSave,
  initialValues,
  isPending = false,
}) => {
  const [open, setOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState("");

  const debouncedClientSearch = useDebounce(clientSearch, 500);
  const fetchClientPage = useCallback(async (page: number, search?: string) => {
    const response = await fetchClients(page, 15, search || undefined);
    return {
      items: (response.data ?? []).map((client: any) => ({
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
    loadNextPage: loadMoreClients,
  } = usePaginatedOptions(fetchClientPage, debouncedClientSearch, 1, open);

  const defaultValues = initialValues
    ? toContractFormValues(initialValues)
    : EMPTY_CONTRACT_FORM_VALUES;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setClientSearch("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-193 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-400 transition-all outline-none sm:inset-e-15"
        >
          <XIcon size={23} />
        </button>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {initialValues ? "تعديل العقد" : "إضافة عقد جديد"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          key={initialValues?.id ?? "create-contract"}
          initialValues={defaultValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              console.log(values);
              await onSave(values);

              if (!initialValues) {
                resetForm({ values: EMPTY_CONTRACT_FORM_VALUES });
              }

              setClientSearch("");
              setOpen(false);
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <SelectForm
                name="clientId"
                label="اسم الموكل"
                options={clientOptions}
                showSearch={true}
                onSearchChange={setClientSearch}
                hasMoreOptions={clientHasMoreOptions}
                isFetchingMore={clientIsFetchingMore || clientsLoading}
                onReachEnd={loadMoreClients}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="startDate"
                  label="تاريخ بداية العقد"
                  type="date"
                />

                <InputForm
                  name="contractValue"
                  label="قيمة العقد"
                  type="number"
                  placeholder="أدخل قيمة العقد"
                  dir="ltr"
                />

                <InputForm
                  name="contractDuration"
                  label="مدة العقد"
                  type="number"
                  placeholder="أدخل مدة العقد"
                  dir="ltr"
                />
              </div>

              <FileUpload name="file" label="ملف العقد" className="w-full" />

              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="bg-primary-gradient rounded-main font-cairo mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting || isPending
                  ? "جارٍ الحفظ..."
                  : initialValues
                    ? "حفظ التغييرات"
                    : "إضافة العقد"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
