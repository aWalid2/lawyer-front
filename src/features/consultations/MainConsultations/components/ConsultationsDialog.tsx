import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePaginatedOptions } from "@/shared/hooks/usePaginatedOptions";
import { fetchClients } from "@/shared/api/services/getClients";
import { Form, Formik } from "formik";
import { User, UserRound, XIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useAddConsultation } from "../../api/hooks/useAddConsultations";
import { useUpdateConsultation } from "../../api/hooks/useUpdateConsultations";
import type { Consultation } from "../types";

interface ConsultationsDialogProps {
  onSave?: (values: Consultation) => void;
  onUpdate?: (values: Consultation) => void;
  initialValues?: Consultation;
  trigger: React.ReactNode;
  isEdit?: boolean;
}

export const ConsultationsDialog: React.FC<ConsultationsDialogProps> = ({
  trigger,
  onSave,
  onUpdate,
  initialValues,
  isEdit = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(
    isEdit
      ? Boolean(initialValues?.client_id && initialValues?.client_id > 0)
      : true,
  );
  const [showDate, setShowDate] = useState(
    isEdit
      ? initialValues?.consultation_date != null &&
          initialValues.consultation_date !== ""
      : false,
  );

  const defaultValues: Consultation & { non_client: string } = {
    id: initialValues?.id || "",
    consultation_title: initialValues?.consultation_title || "",
    client_id: initialValues?.client_id || 0,
    non_client: initialValues?.non_client || "",
    lawyer_id: initialValues?.lawyer_id || 0,
    consultation_type: initialValues?.consultation_type || "",
    contact_method: initialValues?.contact_method || "",
    consultation_details: initialValues?.consultation_details || "",
    consultation_date: initialValues?.consultation_date
      ? initialValues.consultation_date.slice(0, 16)
      : new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16),
    request_date:
      initialValues?.request_date || new Date().toISOString().split("T")[0],
  };

  const { mutate: addConsultation } = useAddConsultation();
  const { mutate: updateConsultation } = useUpdateConsultation();

  const [clientSearch, setClientSearch] = useState("");
  const debouncedClientSearch = useDebounce(clientSearch, 500);
  const { data: lawyers } = useFetchLawyers(isDialogOpen);

  const fetchClientPage = useCallback(async (page: number, search?: string) => {
    const response = await fetchClients(page, 15, search);
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
    loadNextPage: loadMoreClients,
  } = usePaginatedOptions(
    fetchClientPage,
    debouncedClientSearch,
    1,
    isDialogOpen,
  );

  const handleSubmit = async (values: Consultation) => {
    try {
      if (isEdit && initialValues?.id) {
        updateConsultation(
          {
            id: values.id,
            data: values,
          },
          {
            onSuccess: () => {
              setIsDialogOpen(false);
              if (onUpdate) {
                onUpdate(values);
              }
            },
          },
        );
      } else {
        addConsultation(values, {
          onSuccess: () => {
            setIsDialogOpen(false);
            if (onSave) {
              onSave(values);
            }
          },
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const lawyerOptions =
    lawyers?.map((lawyer: any) => ({
      label: lawyer.user?.first_name || `محامي ${lawyer.user_id}`,
      value: lawyer.user_id,
    })) || [];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-[772px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-400 transition-all outline-none sm:inset-e-15">
            <XIcon size={23} />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {isEdit ? "تعديل الاستشارة" : "اضافة استشارة جديدة"}
          </DialogTitle>
        </DialogHeader>
        <Formik
          key={isEdit ? initialValues?.id : "add"}
          initialValues={defaultValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (isClient) {
              if (!values.client_id || Number(values.client_id) <= 0) {
                errors.client_id = "يجب اختيار موكل";
              }
            } else {
              if (!values.non_client?.trim()) {
                errors.non_client = "يجب إدخال اسم طالب الاستشارة";
              }
            }
            return errors;
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <InputForm
                    type="text"
                    name="consultation_title"
                    label="عنوان الاستشارة"
                    placeholder="اكتب عنوان الاستشارة"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-center gap-4 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
                    <Label
                      htmlFor="client-toggle"
                      className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${
                        isClient ? "text-[#153A4D]" : "text-gray-400"
                      }`}
                    >
                      <UserRound size={18} />
                      موكل
                    </Label>
                    <Switch
                      id="client-toggle"
                      checked={!isClient}
                      onCheckedChange={(checked) => {
                        setIsClient(!checked);
                        if (checked) {
                          setFieldValue("client_id", 0);
                        } else {
                          setFieldValue("non_client", "");
                        }
                      }}
                    />
                    <Label
                      htmlFor="client-toggle"
                      className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${
                        !isClient ? "text-[#153A4D]" : "text-gray-400"
                      }`}
                    >
                      <User size={18} />
                      غير موكل
                    </Label>
                  </div>
                </div>

                {isClient ? (
                  <SelectForm
                    label="اسم الموكل"
                    name="client_id"
                    options={clientOptions}
                    placeholder="اختر الموكل"
                    showSearch={true}
                    onSearchChange={setClientSearch}
                    hasMoreOptions={clientHasMoreOptions}
                    isFetchingMore={clientIsFetchingMore}
                    onReachEnd={loadMoreClients}
                  />
                ) : (
                  <InputForm
                    label="اسم طالب الاستشارة"
                    name="non_client"
                    type="string"
                    placeholder="ادخل اسم طالب الاستشارة"
                  />
                )}

                <SelectForm
                  label="اسم المحامي"
                  name="lawyer_id"
                  options={lawyerOptions}
                  placeholder="اختر المحامي"
                  showSearch={true}
                />

                <InputForm
                  name="consultation_type"
                  label="نوع الاستشارة"
                  type={"string"}
                  placeholder="اكتب نوع الاستشارة"
                />

                <SelectForm
                  name="contact_method"
                  label="طريقة التواصل"
                  options={[
                    { value: "حضوري", label: "حضوري" },
                    { value: "أونلاين", label: "أونلاين" },
                    { value: "هاتف", label: "هاتف" },
                  ]}
                />

                <div className="md:col-span-2">
                  <TextAreaForm
                    name="consultation_details"
                    label="تفاصيل الاستشارة"
                    placeholder="..."
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-center gap-4 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
                    <Label
                      htmlFor="date-toggle"
                      className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${
                        showDate ? "text-[#153A4D]" : "text-gray-400"
                      }`}
                    >
                      تحديد موعد الاستشارة
                    </Label>
                    <Switch
                      id="date-toggle"
                      checked={showDate}
                      onCheckedChange={setShowDate}
                    />
                    <Label
                      htmlFor="date-toggle"
                      className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${
                        !showDate ? "text-[#153A4D]" : "text-gray-400"
                      }`}
                    >
                      بدون تحديد موعد الاستشارة
                    </Label>
                  </div>
                </div>

                {showDate && (
                  <InputForm
                    name="consultation_date"
                    label="تاريخ وموعد الاستشارة"
                    type="datetime-local"
                  />
                )}

                <InputForm
                  type="date"
                  name="request_date"
                  label="تاريخ طلب الاستشارة"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-gradient rounded-main font-cairo mt-4 h-12.5 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "جاري الحفظ..."
                  : isEdit
                    ? "حفظ التغييرات"
                    : "إضافة استشارة"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
