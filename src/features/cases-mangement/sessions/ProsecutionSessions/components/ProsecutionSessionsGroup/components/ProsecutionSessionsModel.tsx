import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SubmitButton } from "@/shared/components/buttons/SubmitButton";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useCreateProsecutionSessions } from "../../../api/hooks/useCreateProsecutionSessions";
import { useUpdateProsecutionSessions } from "../../../api/hooks/useUpdateProsecutionSessions";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { SelectForm } from "@/shared/components/SelectForm";
import { formatDateToTime, formatDateToYYYYMMDD } from "@/shared/utils";

interface ProsecutionSessionsModelProps {
  onClose: () => void;
  initialValues?: any;
  mode?: "add" | "edit";
}

const validationSchema = Yup.object({
  session_date: Yup.string().required("تاريخ الجلسة مطلوب"),
  session_time: Yup.string().required("وقت الجلسة مطلوب"),
  lawyer_id: Yup.string().required("اسم المحامي المسؤول مطلوب"),
  session_decision: Yup.string().required("قرار الجلسة مطلوب"),
});

function ProsecutionSessionsModel({
  onClose,
  initialValues,
  mode = "add",
}: ProsecutionSessionsModelProps) {
  const { id } = useParams<{ id: string }>();

  const { mutateAsync: createSessionAsync, isPending: isCreating } =
    useCreateProsecutionSessions();
  const { mutateAsync: updateSessionAsync, isPending: isUpdating } =
    useUpdateProsecutionSessions();

  const isPending = isCreating || isUpdating;

  const { data: lawyersResponse } = useFetchLawyers();
  const lawyers = Array.isArray(lawyersResponse)
    ? lawyersResponse
    : (lawyersResponse as any)?.data || [];

  const lawyersOptions =
    lawyers.map((lawyer: any) => ({
      value: String(lawyer?.user_id),
      label: lawyer?.user?.first_name,
    })) || [];

  const defaultFormValues = {
    session_date: formatDateToYYYYMMDD(initialValues?.session_date),
    session_time: formatDateToTime(initialValues?.session_date),
    lawyer_id: initialValues?.lawyer_id ? String(initialValues.lawyer_id) : "",
    session_decision: initialValues?.session_decision || "",
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      session_date: values.session_date + "T" + values.session_time,
      lawyer_id: Number(values.lawyer_id),
      session_decision: values.session_decision,
    };

    try {
      if (mode === "add") {
        await createSessionAsync({ caseId: Number(id), data: payload });
      } else {
        await updateSessionAsync({ id: initialValues?.id, data: payload });
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-[772px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogClose asChild>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15"
          >
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {mode === "edit" ? "تعديل جلسة نيابة" : "إضافة جلسة نيابة"}
          </DialogTitle>
        </DialogHeader>

        <Formik
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

                <SelectForm
                  name="lawyer_id"
                  label="المحامي المسؤول"
                  options={lawyersOptions}
                  placeholder="اختر المحامي المسؤول"
                />
                <TextAreaForm
                  className="col-span-1 md:col-span-2"
                  name="session_decision"
                  label="قرار الجلسة "
                  placeholder="أدخل قرار الجلسة"
                />
              </div>

              <SubmitButton
                isPending={isPending}
                loadingText={
                  mode === "add" ? "جاري الإضافة..." : "جاري حفظ التعديلات..."
                }
                className="mt-6 w-full"
              >
                {mode === "add" ? "إضافة الجلسة" : "حفظ التعديلات"}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default ProsecutionSessionsModel;
