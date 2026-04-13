import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import { useCreatePoliceSessions } from "../../../api/hooks/useCreatePoliceSessions";
import { useUpdatePoliceSessions } from "../../../api/hooks/useUpdatePoliceSessions";
import type { CreatePoliceSessionPayload, PoliceSession, SessionFormValues } from "../../../types/typsePolice";

interface PoliceStationSessionsModelProps {
  onClose: () => void;
  initialValues?: PoliceSession;
  mode?: "add" | "edit";
}

const validationSchema = Yup.object({
  session_date: Yup.string().required("تاريخ الجلسة مطلوب"),
  session_time: Yup.string().required("وقت الجلسة مطلوب"),
  lawyer_id: Yup.string().required("اسم المحامي مطلوب"),
  session_ruling: Yup.string().required("قرار الجلسة مطلوب"),
});

function PoliceStationSessionsModel({
  onClose,
  initialValues,
  mode = "add"
}: PoliceStationSessionsModelProps) {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutateAsync: createSessionAsync, isPending: isCreating } = useCreatePoliceSessions();
  const { mutateAsync: updateSessionAsync, isPending: isUpdating } = useUpdatePoliceSessions();

  const { data: lawyersResponse } = useFetchLawyers();
  const lawyers = Array.isArray(lawyersResponse) ? lawyersResponse : (lawyersResponse as any)?.data || [];


  const lawyerOptions = lawyers.map((lawyer: any) => ({
    value: String(lawyer?.user_id),
    label: lawyer?.user?.first_name,
  }));

  const defaultFormValues: SessionFormValues = {
    session_date: initialValues?.session_date
      ? initialValues.session_date.split("T")[0]
      : "",
    session_time: initialValues?.session_time || "",
    lawyer_id: initialValues?.lawyer_id
      ? String(initialValues.lawyer_id)
      : "",
    session_ruling: initialValues?.session_ruling || "",
  };
  const handleSubmit = async (values: SessionFormValues) => {
    try {
      if (!id) {
        toast.error("معرف القضية غير موجود في الرابط");
        return;
      }

      const payload: CreatePoliceSessionPayload = {
        case_id: Number(id),
        lawyer_id: Number(values.lawyer_id),
        session_date: values.session_date,
        session_time: values.session_time,
        session_ruling: values.session_ruling,
      };


      if (mode === "add") {
        await createSessionAsync(payload);

        toast.success("تم إضافة الجلسة بنجاح");
      } else {
        if (isNaN(Number(id))) {
          toast.error("case_id غير صالح");
          return;
        }
        if (!initialValues?.id) {
          toast.error("معرف الجلسة غير موجود");
          return;
        }
        await updateSessionAsync({
          id: initialValues.id,
          data: payload,

        });

      }

      queryClient.invalidateQueries({ queryKey: ["police-sessions"] });
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "حدث خطأ");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[715px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={onClose}>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            {mode === "add" ? "إضافة جلسة مخفر" : "تعديل جلسة المخفر"}
          </DialogTitle>
        </DialogHeader>

        <Formik<SessionFormValues>
          initialValues={defaultFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputForm
                  name="session_date"
                  label="تاريخ الجلسة"
                  type="date"
                />
                <InputForm
                  name="session_time"
                  label="وقت الجلسة"
                  type="text"
                  placeholder="مثال: 2:30"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <SelectForm
                  name="lawyer_id"
                  label="المحامي المتابع للجلسة"
                  options={lawyerOptions}
                />
                <SelectForm
                  name="session_ruling"
                  label="قرار الجلسة"
                  options={[
                    { value: "تم التأجيل", label: "تم التأجيل" },
                    { value: "تم الحضور", label: "تم الحضور" },
                    { value: "انتظار القرار", label: "انتظار القرار" },
                    { value: "تم الصلح", label: "تم الصلح" },
                    { value: "تم الحبس", label: "تم الحبس" },
                  ]}
                />
              </div>

              <SubmitButton isPending={isCreating || isUpdating}>
                {mode === "add" ? "إضافة" : "حفظ التعديلات"}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default PoliceStationSessionsModel;