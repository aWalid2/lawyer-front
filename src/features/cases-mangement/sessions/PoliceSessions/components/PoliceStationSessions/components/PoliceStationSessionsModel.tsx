import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SubmitButton } from "@/shared/components/buttons/SubmitButton";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreatePoliceSessions } from "../../../api/hooks/useCreatePoliceSessions";
import { useUpdatePoliceSessions } from "../../../api/hooks/useUpdatePoliceSessions";
import type {
  CreatePoliceSessionPayload,
  PoliceSession,
  SessionFormValues,
} from "../../../types/typsePolice";
import { validationSchema } from "./ValidationSchema";
import { formatDateToTime, formatDateToYYYYMMDD } from "@/shared/utils";
import { TextAreaForm } from "@/shared/components/TextAreaForm";

interface PoliceStationSessionsModelProps {
  onClose: () => void;
  initialValues?: PoliceSession;
  mode?: "add" | "edit";
}

function PoliceStationSessionsModel({
  onClose,
  initialValues,
  mode = "add",
}: PoliceStationSessionsModelProps) {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutateAsync: createSessionAsync, isPending: isCreating } =
    useCreatePoliceSessions();
  const { mutateAsync: updateSessionAsync, isPending: isUpdating } =
    useUpdatePoliceSessions();

  const { data: lawyersResponse } = useFetchLawyers();
  const lawyers = Array.isArray(lawyersResponse)
    ? lawyersResponse
    : (lawyersResponse as any)?.data || [];

  const lawyerOptions = lawyers.map((lawyer: any) => ({
    value: String(lawyer?.user_id),
    label: lawyer?.user?.first_name,
  }));

  const defaultFormValues: SessionFormValues = {
    session_date: formatDateToYYYYMMDD(initialValues?.session_date),
    session_time: formatDateToTime(initialValues?.session_date),
    lawyer_id: initialValues?.lawyer_id ? String(initialValues.lawyer_id) : "",
    session_decision: initialValues?.session_decision || "",
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
        session_date: values.session_date + "T" + values.session_time,
        session_decision: values.session_decision,
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
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-[715px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={onClose}>
          <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
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
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="session_date"
                  label="تاريخ الجلسة"
                  type="date"
                />
                <InputForm name="session_time" label="وقت الجلسة" type="time" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <SelectForm
                  name="lawyer_id"
                  label="المحامي المتابع للجلسة"
                  options={lawyerOptions}
                />
                <TextAreaForm name="session_decision" label="قرار الجلسة" />
              </div>

              <SubmitButton type="submit" isPending={isCreating || isUpdating}>
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
