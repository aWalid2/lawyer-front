import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { useFetchClients } from "@/shared/api/hooks/useGetClients";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
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
  const defaultValues: Consultation = {
    id: initialValues?.id || "",
    consultation_title: initialValues?.consultation_title || "",
    client_id: initialValues?.client_id || 0,
    lawyer_id: initialValues?.lawyer_id || 0,
    consultation_type: initialValues?.consultation_type || "",
    contact_method: initialValues?.contact_method || "",
    consultation_details: initialValues?.consultation_details || "",
    consultation_date: initialValues?.consultation_date || "",
    request_date:
      initialValues?.request_date || new Date().toISOString().split("T")[0],
  };

  const { mutate: addConsultation } = useAddConsultation();
  const { mutate: updateConsultation } = useUpdateConsultation();

  const [clientSearch, setClientSearch] = useState("");
  const debouncedClientSearch = useDebounce(clientSearch, 500);
  const { data: clients } = useFetchClients(
    undefined,
    undefined,
    debouncedClientSearch,
  );
  const { data: lawyers } = useFetchLawyers();

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
              if (onUpdate) {
                onUpdate(values);
              }
            },
          },
        );
      } else {
        addConsultation(values, {
          onSuccess: () => {
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

  const options =
    clients?.data?.map((client: any) => ({
      label: client.name,
      value: String(client.user_id),
    })) || [];

  const lawyerOptions =
    lawyers?.map((lawyer: any) => ({
      label: lawyer.user?.first_name || `محامي ${lawyer.user_id}`,
      value: lawyer.user_id,
    })) || [];

  return (
    <Dialog>
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
        >
          {({ isSubmitting }) => (
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

                <SelectForm
                  label="اسم الموكل"
                  name="client_id"
                  options={options}
                  placeholder="اختر الموكل"
                  showSearch={true}
                  onSearchChange={setClientSearch}
                />

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
                  <InputForm
                    name="consultation_date"
                    label="تاريخ وموعد الاستشارة"
                    type="datetime-local"
                  />
                </div>
                <div className="md:col-span-2">
                  <InputForm
                    type="date"
                    name="request_date"
                    label="تاريخ طلب الاستشارة"
                  />
                </div>
              </div>

              <DialogClose asChild>
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
              </DialogClose>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
