import React from "react";
import { Formik, Form } from "formik";
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
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import * as Yup from "yup";

interface AddLegislationModalProps {
    onClose: () => void;
    onSave: (values: any) => void;
    initialValues?: any;
}

const AddLegislationModal: React.FC<AddLegislationModalProps> = ({
    onClose,
    onSave,
    initialValues
}) => {
    const defaultValues = {
        legislationNumber: initialValues?.legislationNumber || "",
        legislationType: initialValues?.legislationType || "قانون",
        legislationTitle: initialValues?.legislationTitle || "",
        issuingBody: initialValues?.issuingBody || "",
        issueDate: initialValues?.issueDate || "",
        effectiveDate: initialValues?.effectiveDate || "",
        courtLevel: initialValues?.courtLevel || "",
        status: initialValues?.status || "ساري",
        summary: initialValues?.summary || "",
    };

    const validationSchema = Yup.object().shape({
        legislationNumber: Yup.string().required("رقم التشريع/الحكم مطلوب"),
        legislationType: Yup.string().required("النوع مطلوب"),
        legislationTitle: Yup.string().required("عنوان التشريع مطلوب"),
        issuingBody: Yup.string().required("جهة الإصدار مطلوبة"),
        issueDate: Yup.string().required("تاريخ الإصدار مطلوب"),
        status: Yup.string().required("الحالة مطلوبة"),
    });

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
                        {initialValues ? "تعديل التشريع/الحكم" : "إضافة تشريع / حكم جديد"}
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onSave(values);
                    }}
                >
                    {({ values }) => (
                        <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="legislationNumber"
                                    label="رقم التشريع/الحكم"
                                    type="text"
                                    placeholder="مثال: قانون 1 لسنة 2024"
                                />
                                <SelectForm
                                    name="legislationType"
                                    label="النوع"
                                    options={[
                                        { value: "قانون", label: "قانون" },
                                        { value: "لائحة", label: "لائحة" },
                                        { value: "قرار وزاري", label: "قرار وزاري" },
                                        { value: "حكم محكمة", label: "حكم محكمة" },
                                        { value: "مبدأ قضائي", label: "مبدأ قضائي" },
                                    ]}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <InputForm
                                    name="legislationTitle"
                                    label="عنوان التشريع"
                                    type="text"
                                    placeholder="أدخل العنوان الكامل للتشريع/الحكم"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="issuingBody"
                                    label="جهة الإصدار"
                                    type="text"
                                    placeholder="مجلس النواب / وزارة العدل / محكمة النقض ..."
                                />
                                <InputForm
                                    name="issueDate"
                                    label="تاريخ الإصدار"
                                    type="date"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="effectiveDate"
                                    label="تاريخ النفاذ (اختياري)"
                                    type="date"
                                />
                                {values.legislationType === "حكم محكمة" && (
                                    <SelectForm
                                        name="courtLevel"
                                        label="درجة المحكمة"
                                        options={[
                                            { value: "محكمة النقض", label: "محكمة النقض" },
                                            { value: "محكمة استئناف", label: "محكمة استئناف" },
                                            { value: "محكمة ابتدائية", label: "محكمة ابتدائية" },
                                            { value: "محكمة إدارية", label: "محكمة إدارية" },
                                            { value: "محكمة دستورية", label: "محكمة دستورية" },
                                        ]}
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SelectForm
                                    name="status"
                                    label="الحالة"
                                    options={[
                                        { value: "ساري", label: "ساري" },
                                        { value: "ملغي", label: "ملغي" },
                                        { value: "معدل", label: "معدل" },
                                        { value: "مبدأ قضائي", label: "مبدأ قضائي" },
                                    ]}
                                />
                            </div>

                            <TextAreaForm
                                name="summary"
                                label="ملخص (اختياري)"
                                placeholder="أدخل ملخصاً للتشريع أو الحكم"
                            />

                            <button
                                type="submit"
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
                            >
                                {initialValues ? "حفظ التعديلات" : "إضافة تشريع / حكم"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default AddLegislationModal;