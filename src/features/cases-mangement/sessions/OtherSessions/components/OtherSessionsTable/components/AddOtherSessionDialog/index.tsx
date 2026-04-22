import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { XIcon } from "lucide-react";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import {
  EMPTY_OTHER_SESSION_FORM_VALUES,
  type OtherSession,
  type OtherSessionFormValues,
  toOtherSessionFormValues,
} from "../../../../types/typesOther";
import { useGetOtherSession } from "../../../../api/hooks/useGetOtherSession";

interface AddOtherSessionDialogProps {
  onSave: (values: OtherSessionFormValues, id?: number) => Promise<void> | void;
  initialValues?: Partial<OtherSession> | null;
  sessionId?: number | string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isPending?: boolean;
}

const validationSchema = Yup.object({
  actionType: Yup.string().required("نوع الإجراء مطلوب"),
  referral_date: Yup.string().required("تاريخ الإحالة مطلوب"),
  admin_authority: Yup.string().required("الجهة الإدارية مطلوبة"),
  session_date: Yup.string().required("موعد الجلسة مطلوب"),
  lawyer_id: Yup.string().required("المحامي المسؤول مطلوب"),
  session_decision: Yup.string().required("قرار الجلسة مطلوب"),
  notes: Yup.string(),
});

export const AddOtherSessionDialog: React.FC<AddOtherSessionDialogProps> = ({
  trigger,
  onSave,
  initialValues,
  sessionId,
  open,
  onOpenChange,
  isPending = false,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = typeof open === "boolean";
  const dialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const shouldFetchDetails = dialogOpen && !!sessionId && !initialValues;
  const { data: sessionDetails, isPending: isLoadingDetails } =
    useGetOtherSession(sessionId, shouldFetchDetails);
  const showLoadingState = shouldFetchDetails && isLoadingDetails;
  const { data: lawyersResponse } = useFetchLawyers(dialogOpen);

  const lawyers = Array.isArray(lawyersResponse)
    ? lawyersResponse
    : (lawyersResponse as any)?.data || [];

  const lawyersOptions = lawyers.map((lawyer: any) => ({
    value: String(lawyer?.user_id),
    label: `${lawyer?.user?.first_name || ""} `,
  }));

  const resolvedSession = sessionDetails ?? initialValues ?? null;
  const defaultValues: OtherSessionFormValues = resolvedSession
    ? toOtherSessionFormValues(resolvedSession)
    : EMPTY_OTHER_SESSION_FORM_VALUES;

  const isEditMode = !!(sessionId || initialValues?.id);

  const decisionOptions = [
    { label: "تم التأجيل", value: "تم التأجيل" },
    { label: "تم الحضور", value: "تم الحضور" },
    { label: "انتظار القرار", value: "انتظار القرار" },
    { label: "تم الصلح", value: "تم الصلح" },
    { label: "مؤجلة", value: "Postponed" },
  ];

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className="custom-scrollbar max-h-[90vh] overflow-y-auto rounded-xl border-none px-6 py-6 sm:max-w-193 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-xl px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {isEditMode ? "تعديل الجلسة الإدارية" : "إضافة جلسة إدارية"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isEditMode
              ? "نموذج تعديل بيانات الجلسة الإدارية الحالية."
              : "نموذج إضافة جلسة إدارية جديدة."}
          </DialogDescription>
        </DialogHeader>

        {showLoadingState ? (
          <div className="flex min-h-48 items-center justify-center text-gray-500">
            جاري تحميل البيانات...
          </div>
        ) : (
          <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await onSave(values, resolvedSession?.id);
                handleOpenChange(false);
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
                    name="actionType"
                    label="نوع الإجراء"
                    type="text"
                  />
                  <InputForm
                    name="referral_date"
                    label="تاريخ الإحالة"
                    type="date"
                  />
                  <InputForm
                    name="admin_authority"
                    label="الجهة الإدارية"
                    type="text"
                  />
                  <InputForm
                    name="session_date"
                    label="تاريخ ووقت الجلسة"
                    type="datetime-local"
                  />
                  <SelectForm
                    name="lawyer_id"
                    label="المحامي المسؤول"
                    options={lawyersOptions}
                    showSearch={true}
                  />
                  <SelectForm
                    name="session_decision"
                    label="قرار الجلسة"
                    options={decisionOptions}
                  />
                  <TextAreaForm
                    name="notes"
                    label="ملاحظات"
                    placeholder="أضف ملاحظات الجلسة"
                    className="md:col-span-2"
                  />
                </div>
                <SubmitButton
                  isPending={isPending}
                  loadingText={
                    isEditMode
                      ? "جاري حفظ التعديلات..."
                      : "جاري إضافة الجلسة..."
                  }
                  className="mt-6"
                >
                  {isEditMode ? "حفظ التغييرات" : "إضافة الجلسة"}
                </SubmitButton>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};
