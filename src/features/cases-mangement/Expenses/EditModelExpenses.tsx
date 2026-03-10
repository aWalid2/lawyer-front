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
import { InputForm } from "@/components/shared/components/InputForm";
import { TextAreaForm } from "@/components/shared/components/TextAreaForm";
import type { Document } from "./types";

import * as Yup from "yup";

interface EditModelExpensesProps {
    document: Document;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (values: any) => void;
}

export const EditModelExpenses: React.FC<EditModelExpensesProps> = ({ 
    document, 
    open, 
    onOpenChange,
    onSave 
}) => {
    const initialValues = {
        caseReceiptDate: document.caseReceiptDate || "",
        receiptStatus: document.receiptStatus || "",
        caseType: document.caseType || "",
        caseStatus: document.caseStatus || "",
        currentDegree: document.currentDegree || "",
        fees: document.fees || "",
        uploadFiles: document.uploadFiles || null,
        notes: document.notes || "",
    };

    const validationSchema = Yup.object().shape({
        caseReceiptDate: Yup.string().required("تاريخ ورود القضية مطلوب"),
        receiptStatus: Yup.string().required("وضع القضية عند الاستلام مطلوب"),
        caseType: Yup.string().required("نوع القضية مطلوب"),
        caseStatus: Yup.string().required("حالة القضية مطلوبة"),
        currentDegree: Yup.string().required("درجة التقاضي الحالية مطلوبة"),
        fees: Yup.string().required("الاتعاب مطلوبة"),
        uploadFiles: Yup.mixed().nullable(),
        notes: Yup.string().nullable(),
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[715px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none"
                dir="rtl"
                showCloseButton={false}
            >
                <DialogClose asChild onClick={() => onOpenChange(false)}>
                    <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
                        <XIcon size={23} className="text-gray-500 " />
                    </button>
                </DialogClose>
                <DialogHeader className="mb-2 mt-15">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
                        تعديل بيانات المصاريف
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values) => {
                        onSave(values);
                        onOpenChange(false);
                    }}
                >
                    {() => (
                        <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
                            {/* صف مكون من عمودين - السطر الأول */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="caseReceiptDate"
                                    label="تاريخ ورود القضية"
                                    type="date"
                                />
                                <InputForm
                                    name="receiptStatus"
                                    label="وضع القضية عند الاستلام"
                                    type="text"
                                    placeholder="أدخل وضع القضية عند الاستلام"
                                />
                            </div>

                            {/* صف مكون من عمودين - السطر الثاني */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="caseType"
                                    label="نوع القضية"
                                    type="text"
                                    placeholder="أدخل نوع القضية"
                                />
                                <InputForm
                                    name="caseStatus"
                                    label="حالة القضية"
                                    type="text"
                                    placeholder="أدخل حالة القضية"
                                />
                            </div>

                            {/* صف مكون من عمودين - السطر الثالث */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="currentDegree"
                                    label="درجة التقاضي الحالية"
                                    type="text"
                                    placeholder="أدخل درجة التقاضي الحالية"
                                />
                                <InputForm
                                    name="fees"
                                    label="الاتعاب"
                                    type="text"
                                    placeholder="أدخل قيمة الاتعاب"
                                />
                            </div>


                            <TextAreaForm
                                name="notes"
                                label="ملاحظات"
                                placeholder="أدخل أي ملاحظات إضافية"
                            />

                            <button
                                type="submit"
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
                            >
                                حفظ التغييرات
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};