import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import type { Consultation } from "../types";
import { useAddConsultation } from "../../api/hooks/useAddConsultations";
import { useUpdateConsultation } from "../../api/hooks/useUpdateConsultations";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { useFetchClients } from "@/shared/api/hooks/useGetClients";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";

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
    status: initialValues?.status || "",
    request_date: initialValues?.request_date || new Date().toISOString().split('T')[0],
  };

  const { mutate: addConsultation, isPending: isAddPending, isError: isAddError, error: addError } = useAddConsultation();
  const { mutate: updateConsultation, isPending: isUpdatePending, isError: isUpdateError, error: updateError } = useUpdateConsultation();
  
  const [clientSearch, setClientSearch] = useState("");
  const debouncedClientSearch = useDebounce(clientSearch, 500);
  const { data: clients } = useFetchClients(undefined, undefined, debouncedClientSearch);
  const { data: lawyers } = useFetchLawyers();

const handleSubmit = async (values: Consultation) => {
  try {
    if (isEdit && initialValues?.id) {
      // تمرير الـ ID والبيانات معاً
      updateConsultation({
        id: values.id,
        data: values
      }, {
        onSuccess: () => {
          if (onUpdate) {
            onUpdate(values);
          }
        }
      });
    } else {
      // للإضافة
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

  const options = clients?.data?.map((client: any) => ({
    label: client.name,
    value: String(client.user_id)
  })) || [];

  const lawyerOptions = lawyers?.map((lawyer: any) => ({
    label: lawyer.user?.first_name || `محامي ${lawyer.user_id}`,
    value: lawyer.user_id,
  })) || [];

  const isPending = isAddPending || isUpdatePending;
  const isError = isAddError || isUpdateError;
  const error = addError || updateError;

  if (isPending) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[772px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-400 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all outline-none">
            <XIcon size={23} />
          </button>
        </DialogClose>
        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            {isEdit ? "تعديل الاستشارة" : "اضافة استشارة جديدة"}
          </DialogTitle>
        </DialogHeader>
        <Formik 
          key={isEdit ? initialValues?.id : 'add'}
          initialValues={defaultValues} 
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="md:col-span-2">
                  <InputForm
                    type="text"
                    name="consultation_title"
                    label="عنوان الاستشارة"
                    placeholder="دعوي طلاق"
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

                <SelectForm
                  name="consultation_type"
                  label="نوع الاستشارة"
                  options={[
                    { value: "أحوال شخصية", label: "أحوال شخصية" },
                    { value: "جنائي", label: "جنائي" },
                    { value: "عقاري", label: "عقاري" },
                  ]}
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
                    type="date"
                    name="request_date"
                    label="تاريخ طلب الاستشارة"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <SelectForm
                    name="status"
                    label="حالة الاستشارة"
                    options={[
                      { value: "pending", label: "قيد الانتظار" },
                      { value: "completed", label: "مكتملة" },
                    ]}
                  />
                </div>
              </div>

              <DialogClose asChild>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity font-cairo h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting 
                    ? "جاري الحفظ..." 
                    : isEdit 
                      ? "حفظ التغييرات" 
                      : "إضافة استشارة"
                  }
                </button>
              </DialogClose>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};