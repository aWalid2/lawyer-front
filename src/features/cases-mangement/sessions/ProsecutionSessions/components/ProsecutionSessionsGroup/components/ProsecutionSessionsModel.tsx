import { Formik, Form } from "formik";
import close from "@/public/images/close.svg";
import { useState } from "react";
import * as Yup from "yup";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { useCreateProsecutionSession } from "../../../api/hooks/useCreateProsecutionSession";
import { useUpdateProsecutionSession } from "../../../api/hooks/useUpdateProsecutionSession";

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

const modalClasses = {
    overlay: "fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6",
    backdrop: "absolute inset-0 bg-black/30",
    container: "relative w-full max-w-[520px] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden",
    header: "relative px-5 sm:px-7 pt-5 sm:pt-6 pb-3",
    closeButton: "absolute left-4 top-4 pt-4 px-16 text-gray-400 hover:text-gray-600 transition-colors",
    closeIcon: "w-4 h-4 sm:w-5 sm:h-5",
    title: "text-center text-[15px] pt-10 sm:pt-16 sm:text-base font-semibold text-gray-800",
    body: "px-5 sm:px-7 pt-4 pb-24 sm:pb-28 max-h-[65vh] sm:max-h-[70vh] overflow-y-auto",
    formContainer: "flex flex-col items-center space-y-4",
    fieldWrapper: "w-full max-w-[420px] space-y-1.5",
    label: "block text-xs sm:text-sm font-medium text-gray-700 text-right px-1 pb-4",
    input: "w-full h-10 sm:h-11 rounded-xl bg-[#FBFBFB] border border-transparent px-4 text-right text-sm outline-none focus:ring-2 focus:ring-[#CBA462]/40",
    select: "w-full h-10 sm:h-11 rounded-xl bg-[#FBFBFB] border border-transparent px-4 text-right text-sm outline-none focus:ring-2 focus:ring-[#CBA462]/40 cursor-pointer",
    footer: "absolute inset-x-0 bottom-0 bg-white px-5 sm:px-7 py-4 border-t border-gray-100",
    submitButton: "w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-medium text-white bg-[linear-gradient(to_right,#E3C086,#CBA462)] hover:brightness-95 transition flex justify-center items-center gap-2 disabled:opacity-70"
};

const defaultValues = {
    session_date: "",
    session_time: "",
    lawyer_id: "",
    session_ruling: "",
};

function ProsecutionSessionsModel({ onClose, initialValues, mode = "add" }: ProsecutionSessionsModelProps) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const { id } = useParams<{ id: string }>();

    const { mutateAsync: createSessionAsync, isPending: isCreating } = useCreateProsecutionSession();
    const { mutateAsync: updateSessionAsync, isPending: isUpdating } = useUpdateProsecutionSession();

    const isPending = isCreating || isUpdating;

    const handleCloseModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    const handleSubmit = async (values: any) => {
        const case_id = Number(id);
        const payload = {
            case_id: case_id,
            session_date: values.session_date,
            session_time: values.session_time,
            lawyer_id: values.lawyer_id,
            session_ruling: values.session_ruling,
        };

        try {
            if (mode === "add") {
                await createSessionAsync(payload);
            } else {
                await updateSessionAsync({ id: initialValues?.id, data: payload });
            }
            setIsModalOpen(false);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className={modalClasses.overlay}>
            <div className={modalClasses.backdrop} />

            <div dir="rtl" className={modalClasses.container}>
                <div className={modalClasses.header}>
                    <button
                        type="button"
                        className={modalClasses.closeButton}
                        aria-label="close"
                        onClick={handleCloseModal}
                    >
                        <img src={close} alt="Close" className={modalClasses.closeIcon} />
                    </button>

                    <h2 className={modalClasses.title}>
                        {mode === "edit" ? "تعديل جلسة نيابة" : "إضافة جلسة نيابة"}
                    </h2>
                </div>

                <Formik
                    initialValues={initialValues || defaultValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                            <div className={modalClasses.body}>
                                <div className={modalClasses.formContainer}>
                                    <div className={modalClasses.fieldWrapper}>
                                        <label className={modalClasses.label}>
                                            المحامي المسؤول
                                        </label>
                                        <input
                                            name="lawyer_id"
                                            type="text"
                                            placeholder="أدخل اسم المحامي المسؤول"
                                            value={values.lawyer_id}
                                            onChange={(e) => setFieldValue("lawyer_id", e.target.value)}
                                            className={`${modalClasses.input} ${errors.lawyer_id && touched.lawyer_id ? "border-red-500" : ""}`}
                                        />
                                        {errors.lawyer_id && touched.lawyer_id && (
                                            <div className="text-red-500 text-xs mt-1">{String(errors.lawyer_id)}</div>
                                        )}
                                    </div>

                                    <div className={modalClasses.fieldWrapper}>
                                        <label className={modalClasses.label}>
                                            تاريخ الجلسة
                                        </label>
                                        <input
                                            name="session_date"
                                            type="date"
                                            value={values.session_date}
                                            onChange={(e) => setFieldValue("session_date", e.target.value)}
                                            className={`${modalClasses.input} ${errors.session_date && touched.session_date ? "border-red-500" : ""}`}
                                        />
                                        {errors.session_date && touched.session_date && (
                                            <div className="text-red-500 text-xs mt-1">{String(errors.session_date)}</div>
                                        )}
                                    </div>

                                    <div className={modalClasses.fieldWrapper}>
                                        <label className={modalClasses.label}>وقت الجلسة</label>
                                        <input
                                            name="session_time"
                                            type="time"
                                            value={values.session_time}
                                            onChange={(e) => setFieldValue("session_time", e.target.value)}
                                            className={`${modalClasses.input} ${errors.session_time && touched.session_time ? "border-red-500" : ""}`}
                                        />
                                        {errors.session_time && touched.session_time && (
                                            <div className="text-red-500 text-xs mt-1">{String(errors.session_time)}</div>
                                        )}
                                    </div>

                                    <div className={modalClasses.fieldWrapper}>
                                        <label className={modalClasses.label}>
                                            قرار الجلسة
                                        </label>
                                        <Select
                                            value={values.session_ruling}
                                            onValueChange={(value) => setFieldValue("session_ruling", value)}
                                        >
                                            <SelectTrigger className={`${modalClasses.select} ${errors.session_ruling && touched.session_ruling ? "border-red-500" : ""}`}>
                                                <SelectValue placeholder="اختر قرار الجلسة" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="تم التأجيل">تم التأجيل</SelectItem>
                                                <SelectItem value="تم الحضور">تم الحضور</SelectItem>
                                                <SelectItem value="انتظار القرار">انتظار القرار</SelectItem>
                                                <SelectItem value="تم الصلح">تم الصلح</SelectItem>
                                                <SelectItem value="تم الحبس">تم الحبس</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.session_ruling && touched.session_ruling && (
                                            <div className="text-red-500 text-xs mt-1">{String(errors.session_ruling)}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={modalClasses.footer}>
                                <button
                                    type="submit"
                                    className={modalClasses.submitButton}
                                    disabled={isPending}
                                >
                                    {isPending && <span className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></span>}
                                    {mode === "add" ? "إضافة الجلسة" : "حفظ التعديلات"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ProsecutionSessionsModel;