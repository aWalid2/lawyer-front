import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useCreatePoliceSessions } from "../../../api/hooks/useCreatePoliceSessions";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { PoliceSession, SessionFormValues, CreatePoliceSessionPayload } from "../../../types/typsePolice";

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
  const queryClient = useQueryClient();
  const { mutate: createSession, isPending: isCreating } = useCreatePoliceSessions();

  const { data: lawyersResponse } = useFetchLawyers();
  const lawyers = Array.isArray(lawyersResponse) ? lawyersResponse : (lawyersResponse as any)?.data || [];

  const lawyerOptions = lawyers.map((lawyer: any) => ({
    value: String(lawyer.id),
    label: `${lawyer.first_name} ${lawyer.last_name || ""}`.trim(),
  }));

  const defaultFormValues: SessionFormValues = {
    session_date: initialValues?.session_date ? initialValues.session_date.split("T")[0] : "",
    session_time: initialValues?.session_time || "",
    lawyer_id: initialValues?.lawyer_id ? String(initialValues.lawyer_id) : "",
    session_ruling: initialValues?.session_ruling || "",
    case_id: initialValues?.case_id ? String(initialValues.case_id) : "5",
  };

  const handleSubmit = (values: SessionFormValues) => {
    const payload: CreatePoliceSessionPayload = {
      case_id: Number(values.case_id),
      lawyer_id: Number(values.lawyer_id),
      session_date: values.session_date,
      session_time: values.session_time,
      session_ruling: values.session_ruling,
    };

    if (mode === "add") {
      createSession(payload, {
        onSuccess: () => {
          toast.success("تم إضافة الجلسة بنجاح");
          queryClient.invalidateQueries({ queryKey: ["police-sessions"] });
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.message || "فشل إضافة الجلسة");
        },
      });
    } else {
      // Update logic not ready from API yet but prepared here
      console.log("Update session:", payload);
      toast.info("خدمة التعديل غير متوفرة حالياً");
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[715px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={onClose}>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
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
          {({ isSubmitting }) => (
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

              <button
                type="submit"
                disabled={isCreating || isSubmitting}
                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isCreating ? "جاري الحفظ..." : (mode === "add" ? "إضافة" : "حفظ التعديلات")}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default PoliceStationSessionsModel;