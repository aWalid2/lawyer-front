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
import type { ExpertDocument } from "./typs";

import * as Yup from "yup";

interface EditModelExpertsProps {
    document: ExpertDocument;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (values: any) => void;
}

export const EditModelExperts: React.FC<EditModelExpertsProps> = ({ 
    document, 
    open, 
    onOpenChange,
    onSave 
}) => {
    const initialValues = {
        expertReportNumber: document.expertReportNumber || "",
        assignedAuthority: document.assignedAuthority || "",
        assignmentDate: document.assignmentDate || "",
        expertOfficeName: document.expertOfficeName || "",
        taskStartDate: document.taskStartDate || "",
        subjectOfExpertise: document.subjectOfExpertise || "",
        finalOpinion: document.finalOpinion || "",
        reportSubmissionDate: document.reportSubmissionDate || "",
        objections: document.objections || "",
        notes: document.notes || "",
    };

    const validationSchema = Yup.object().shape({
        expertReportNumber: Yup.string().required("رقم تقرير الخبير مطلوب"),
        assignedAuthority: Yup.string().required("الجهة المكلفة مطلوبة"),
        assignmentDate: Yup.string().required("تاريخ التكليف مطلوب"),
        expertOfficeName: Yup.string().required("اسم مكتب الخبراء مطلوب"),
        taskStartDate: Yup.string().required("تاريخ مباشرة المهمة مطلوب"),
        subjectOfExpertise: Yup.string().required("موضوع الخبرة مطلوب"),
        finalOpinion: Yup.string().required("الرأي النهائي للخبير مطلوب"),
        reportSubmissionDate: Yup.string().required("تاريخ إيداع التقرير مطلوب"),
        objections: Yup.string().nullable(),
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
                        تعديل بيانات الخبراء
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
                                    name="expertReportNumber"
                                    label="رقم تقرير الخبير"
                                    type="text"
                                    placeholder="أدخل رقم تقرير الخبير"
                                />
                                <InputForm
                                    name="assignedAuthority"
                                    label="الجهة المكلفة"
                                    type="text"
                                    placeholder="محكمة / نيابة / هيئة تحكيم"
                                />
                            </div>

                            {/* صف مكون من عمودين - السطر الثاني */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="assignmentDate"
                                    label="تاريخ التكليف"
                                    type="date"
                                />
                                <InputForm
                                    name="expertOfficeName"
                                    label="مكتب الخبراء / الخبير"
                                    type="text"
                                    placeholder="أدخل اسم مكتب الخبراء"
                                />
                            </div>

                            {/* صف مكون من عمودين - السطر الثالث */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="taskStartDate"
                                    label="تاريخ مباشرة المهمة"
                                    type="date"
                                />
                                <InputForm
                                    name="subjectOfExpertise"
                                    label="موضوع الخبرة"
                                    type="text"
                                    placeholder="تقدير تعويض / فحص توقيع / فحص طبي ..."
                                />
                            </div>

                            {/* صف مكون من عمودين - السطر الرابع */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="finalOpinion"
                                    label="الرأي النهائي للخبير"
                                    type="text"
                                    placeholder="ملخص ما انتهى إليه الخبير"
                                />
                                <InputForm
                                    name="reportSubmissionDate"
                                    label="تاريخ إيداع التقرير"
                                    type="date"
                                />
                            </div>

                            {/* صف كامل - الاعتراضات */}
                            <div className="grid grid-cols-1 gap-4">
                                <TextAreaForm
                                    name="objections"
                                    label="الاعتراضات"
                                    placeholder="اعتراضات الخصوم على التقرير"
                                />
                            </div>

                            {/* صف كامل - الملاحظات الإضافية */}
                            <div className="grid grid-cols-1 gap-4">
                                <TextAreaForm
                                    name="notes"
                                    label="ملاحظات إضافية"
                                    placeholder="أدخل أي ملاحظات إضافية عن الخبرة"
                                />
                            </div>

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