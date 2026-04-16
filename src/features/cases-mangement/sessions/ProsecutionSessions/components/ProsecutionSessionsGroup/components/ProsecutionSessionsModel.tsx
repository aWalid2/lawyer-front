import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useCreateProsecutionSessions } from "../../../api/hooks/useCreateProsecutionSessions";
import { useUpdateProsecutionSessions } from "../../../api/hooks/useUpdateProsecutionSessions";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { SelectForm } from "@/shared/components/SelectForm";

interface ProsecutionSessionsModelProps {
    onClose: () => void;
    initialValues?: any;
    mode?: "add" | "edit";
}

const validationSchema = Yup.object({
    session_date: Yup.string().required("تاريخ الجلسة مطلوب"),
    session_time: Yup.string().required("وقت الجلسة مطلوب"),
    lawyer_id: Yup.string().required("اسم المحامي المسؤول مطلوب"),
    session_ruling: Yup.string().required("قرار الجلسة مطلوب"),
});

function ProsecutionSessionsModel({ onClose, initialValues, mode = "add" }: ProsecutionSessionsModelProps) {
    const { id } = useParams<{ id: string }>();

    const { mutateAsync: createSessionAsync, isPending: isCreating } = useCreateProsecutionSessions();
    const { mutateAsync: updateSessionAsync, isPending: isUpdating } = useUpdateProsecutionSessions();

    const isPending = isCreating || isUpdating;

    const { data: lawyersResponse } = useFetchLawyers();
    const lawyers = Array.isArray(lawyersResponse) ? lawyersResponse : (lawyersResponse as any)?.data || [];

    const lawyersOptions = lawyers.map((lawyer: any) => ({
        value: String(lawyer?.user_id),
        label: lawyer?.user?.first_name,
    })) || [];

    console.log(lawyersOptions);

    const defaultFormValues = {
        session_date: initialValues?.session_date
            ? initialValues.session_date.split("T")[0]
            : "",
        session_time: initialValues?.session_time
            ? initialValues.session_time.split("T")[1]
            : "",
        lawyer_id: initialValues?.lawyer_id ? String(initialValues.lawyer_id) : "",
        session_ruling: initialValues?.session_ruling || "",
    };

    const handleSubmit = async (values: any) => {
        const payload = {
            session_date: values.session_date + "T" + values.session_time,
            lawyer_id: Number(values.lawyer_id),
            session_ruling: values.session_ruling,
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
                className="sm:max-w-[772px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none"
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
                        className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all"
                    >
                        <XIcon size={23} className="text-gray-500" />
                    </button>
                </DialogClose>

                <DialogHeader className="mb-2 mt-15">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
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
                                    type="time"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <SelectForm
                                    name="lawyer_id"
                                    label="المحامي المسؤول"
                                    options={lawyersOptions}
                                    placeholder="اختر المحامي المسؤول"
                                />
                                <TextAreaForm
                                    name="session_ruling"
                                    label="القرار "
                                    placeholder="أدخل قرار الجلسة"
                                />
                            </div>

                            <SubmitButton
                                isPending={isPending}
                                loadingText={mode === "add" ? "جاري الإضافة..." : "جاري حفظ التعديلات..."}
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