import React from "react";
import { Formik, Form } from "formik";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import * as Yup from "yup";

const procedureTypeOptions = [
    { label: "تقديم مذكرة", value: "تقديم مذكرة" },
    { label: "إشعار رسمي", value: "إشعار رسمي" },
    { label: "استئناف", value: "استئناف" },
    { label: "طعن", value: "طعن" },
    { label: "تسليم وثيقة", value: "تسليم وثيقة" },
    { label: "مدفوعات", value: "مدفوعات" },
    { label: "جلسة استماع", value: "جلسة استماع" },
    { label: "أخرى", value: "أخرى" },
];

const statusOptions = [
    { label: "مكتمل", value: "مكتمل" },
    { label: "قيد التنفيذ", value: "قيد التنفيذ" },
    { label: "متأخر", value: "متأخر" },
];

interface EditProcedureDialogProps {
    trigger: React.ReactNode;
    procedure?: any;
}

export const ProcedureDialog: React.FC<EditProcedureDialogProps> = ({ trigger, procedure }) => {
    const initialValues = {
        type: procedure?.type || procedureTypeOptions[0].value,
        date: procedure?.date || "",
        description: procedure?.description || "",
        status: procedure?.status || statusOptions[0].value,
    };

    const validationSchema = Yup.object().shape({
        type: Yup.string().required("نوع الإجراء مطلوب"),
        date: Yup.string().required("تاريخ الإجراء مطلوب"),
        description: Yup.string().required("الوصف مطلوب"),
        status: Yup.string().required("الحالة مطلوبة"),
    });

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[520px] flex flex-col sm:px-12 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none"
                dir="rtl"
                showCloseButton={false}
            >
                <DialogClose asChild>
                    <button className="absolute top-6 sm:inset-e-8 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
                        <XIcon size={23} className="text-gray-500" />
                    </button>
                </DialogClose>

                <DialogHeader className="mb-2 mt-4">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
                        إضافة إجراء
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("Adding procedure:", values);
                    }}
                >
                    {() => (
                        <Form className="space-y-4">
                            <SelectForm
                                name="type"
                                label="نوع الإجراء"
                                placeholder="اختر نوع الإجراء"
                                options={procedureTypeOptions}
                            />

                            <InputForm
                                name="date"
                                label="تاريخ الإجراء"
                                type="date"
                            />

                            <TextAreaForm
                                name="description"
                                label="الوصف"
                                placeholder="اكتب وصف الإجراء..."
                            />

                            <SelectForm
                                name="status"
                                label="الحالة"
                                placeholder="اختر الحالة"
                                options={statusOptions}
                            />

                            <button
                                type="submit"
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
                            >
                                إضافة
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};
