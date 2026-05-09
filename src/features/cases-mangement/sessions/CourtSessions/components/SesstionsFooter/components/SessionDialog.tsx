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
import * as Yup from "yup";
import { useGetCourts } from "@/shared/api/hooks/useGetCourts";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";

interface SessionPayload {
  id?: number;
  session_date: string;
  court_id: number;
  lawyer_id?: number | null;
  hall_floor: number;
  hall_number: number;
}

interface SessionFormValues {
  id?: number;
  session_date: string;
  court_id: number;
  lawyer_id?: number | null | string;
  hall_floor: number;
  hall_number: number;
}

interface CourtEntity {
  id: number;
  name: string;
}

interface LawyerEntity {
  user_id: number;
  user?: {
    first_name?: string;
    last_name?: string;
  };
}

interface DataResponse<T> {
  data?: T[];
}

interface SessionDialogProps {
  onSave: (values: SessionPayload) => void;
  initialValues?: SessionPayload;
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const validationSchema = Yup.object({
  session_date: Yup.string().required("تاريخ ووقت الجلسة مطلوب"),
  court_id: Yup.number().required("المحكمة مطلوبة"),
  lawyer_id: Yup.number().required("المحامي المسؤول مطلوب"),
  hall_floor: Yup.number().required("دور القاعة مطلوب"),
  hall_number: Yup.number().required("رقم القاعة مطلوب"),
});

export const SessionDialog: React.FC<SessionDialogProps> = ({
  trigger,
  onSave,
  initialValues,
  open,
  onOpenChange,
}) => {
  const { data: courts } = useGetCourts(undefined, undefined, undefined, open);
  const { data: lawyersResponse } = useFetchLawyers(open);

  const courtsOptions =
    (courts as DataResponse<CourtEntity> | undefined)?.data?.map((court) => ({
      value: court.id,
      label: court.name,
    })) || [];

  const lawyers = Array.isArray(lawyersResponse)
    ? lawyersResponse
    : (lawyersResponse as DataResponse<LawyerEntity> | undefined)?.data || [];

  const lawyersOptions =
    lawyers.map((lawyer: LawyerEntity) => ({
      value: String(lawyer?.user_id),
      label: lawyer?.user?.first_name + " " + (lawyer?.user?.last_name || ""),
    })) || [];

  const defaultValues: SessionFormValues = {
    id: initialValues?.id,
    session_date: initialValues?.session_date || "",
    court_id: initialValues?.court_id || 1,
    lawyer_id: initialValues?.lawyer_id ?? "",
    hall_floor: initialValues?.hall_floor || 1,
    hall_number: initialValues?.hall_number || 1,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-193 sm:rounded-[24px] sm:px-20 sm:py-10"
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
            {initialValues ? "تعديل الجلسة" : "إضافة جلسة"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          validationSchema={validationSchema}
          initialValues={defaultValues}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSave({
                ...values,
                lawyer_id: values.lawyer_id ? Number(values.lawyer_id) : null,
              });
              onOpenChange(false);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
                <InputForm
                  name="session_date"
                  label="تاريخ ووقت الجلسة"
                  type="datetime-local"
                />
                <SelectForm
                  name="court_id"
                  label="المحكمة"
                  options={courtsOptions}
                />
                <SelectForm
                  name="lawyer_id"
                  label="المحامي المسئول"
                  options={lawyersOptions}
                  placeholder="اختر المحامي المسئول"
                />
                <InputForm name="hall_floor" label="دور القاعة" type="number" />
                <InputForm
                  name="hall_number"
                  label="رقم القاعة"
                  type="number"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-gradient rounded-main font-cairo mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
              >
                {initialValues ? "حفظ التغييرات" : "إضافة الجلسة"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
