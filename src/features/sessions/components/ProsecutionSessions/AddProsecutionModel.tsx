import { Formik, Form } from "formik";
import close from "../../../../../public/images/close.svg";
import { useState } from "react";
import * as Yup from "yup";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { SessionFormValues } from "./typseProsecution";

// تعريف الـ interface للـ props
interface AddProsecutionModelProps {
    onClose: () => void;
    onSave?: (values: SessionFormValues) => void;
    initialValues?: SessionFormValues;
}

// Validation Schema
const validationSchema = Yup.object({
    sessionDate: Yup.string().required("تاريخ الجلسة مطلوب"),
    sessionTime: Yup.string().required("وقت الجلسة مطلوب"),
    lawyer: Yup.string().required("اسم المحامي المسؤول مطلوب"),
    decision: Yup.string().required("قرار الجلسة مطلوب"),
});

// تعريف CSS classes مجمعة
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
    submitButton: "w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-medium text-white bg-[linear-gradient(to_right,#E3C086,#CBA462)] hover:brightness-95 transition"
};

// ✅ القيم الافتراضية
const defaultValues: SessionFormValues = {
    sessionDate: "",
    sessionTime: "",
    lawyer: "",
    decision: "",
};

function AddProsecutionModel({ onClose, onSave, initialValues = defaultValues }: AddProsecutionModelProps) {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    const handleSubmit = (values: SessionFormValues) => {
        console.log("تم حفظ بيانات الجلسة:", values);
        if (onSave) {
            onSave(values);
        }
        setIsModalOpen(false);
        onClose();
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

                    {/* ✅ غير العنوان */}
                    <h2 className={modalClasses.title}>
                        إضافة جلسة نيابة
                    </h2>
                </div>

                <Formik<SessionFormValues>
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                            <div className={modalClasses.body}>
                                <div className={modalClasses.formContainer}>
                                    {/* المحامي المسؤول */}
                                    <div className={modalClasses.fieldWrapper}>
                                        <label className={modalClasses.label}>
                                            المحامي المسؤول
                                        </label>
                                        <input
                                            name="lawyer"
                                            type="text"
                                            placeholder="أدخل اسم المحامي المسؤول"
                                            value={values.lawyer}
                                            onChange={(e) => setFieldValue("lawyer", e.target.value)}
                                            className={`${modalClasses.input} ${errors.lawyer && touched.lawyer ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.lawyer && touched.lawyer && (
                                            <div className="text-red-500 text-xs mt-1">{errors.lawyer}</div>
                                        )}
                                    </div>

                                    {/* تاريخ الجلسة */}
                                    <div className={modalClasses.fieldWrapper}>
                                        <label className={modalClasses.label}>
                                            تاريخ الجلسة
                                        </label>
                                        <input
                                            name="sessionDate"
                                            type="date"
                                            value={values.sessionDate}
                                            onChange={(e) => setFieldValue("sessionDate", e.target.value)}
                                            className={`${modalClasses.input} ${errors.sessionDate && touched.sessionDate ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.sessionDate && touched.sessionDate && (
                                            <div className="text-red-500 text-xs mt-1">{errors.sessionDate}</div>
                                        )}
                                    </div>

                                    {/* وقت الجلسة */}
                                    <div className={modalClasses.fieldWrapper}>
                                        <label className={modalClasses.label}>وقت الجلسة</label>
                                        <input
                                            name="sessionTime"
                                            type="time"
                                            value={values.sessionTime}
                                            onChange={(e) => setFieldValue("sessionTime", e.target.value)}
                                            className={`${modalClasses.input} ${errors.sessionTime && touched.sessionTime ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.sessionTime && touched.sessionTime && (
                                            <div className="text-red-500 text-xs mt-1">{errors.sessionTime}</div>
                                        )}
                                    </div>

                                    {/* قرار الجلسة */}
                                    <div className={modalClasses.fieldWrapper}>
                                        <label className={modalClasses.label}>
                                            قرار الجلسة
                                        </label>
                                        <Select
                                            value={values.decision}
                                            onValueChange={(value) => setFieldValue("decision", value)}
                                        >
                                            <SelectTrigger className={`${modalClasses.select} ${errors.decision && touched.decision ? "border-red-500" : ""
                                                }`}>
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
                                        {errors.decision && touched.decision && (
                                            <div className="text-red-500 text-xs mt-1">{errors.decision}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={modalClasses.footer}>
                                <button
                                    type="submit"
                                    className={modalClasses.submitButton}
                                >
                                    إضافة
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AddProsecutionModel;