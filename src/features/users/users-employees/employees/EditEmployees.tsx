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
import type { Employee } from "./types";

import * as Yup from "yup";

interface EditemployeesProps {
    employee?: Employee;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onEmployeeUpdated?: () => void;
}

export const Editemployees: React.FC<EditemployeesProps> = ({
    employee,
    open,
    onOpenChange,
    onEmployeeUpdated
}) => {
    const isEditMode = !!employee;

    const initialValues = {
        employeeName: employee?.employeeName || "",
        phoneNumber: employee?.phoneNumber || "",
        email: employee?.email || "",
        jobTitle: employee?.jobTitle || "",
        countryCode: employee?.countryCode || "+966",
        notes: employee?.notes || "",
    };

    const validationSchema = Yup.object().shape({
        employeeName: Yup.string().required("اسم الموظف مطلوب"),
        phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
        email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
        jobTitle: Yup.string().required("الوظيفة مطلوبة"),
        countryCode: Yup.string().required("كود الدولة مطلوب"),
    });

    const handleSubmit = (values: typeof initialValues) => {
        console.log(isEditMode ? "تحديث الموظف:" : "إضافة موظف جديد:", values);
        if (onEmployeeUpdated) {
            onEmployeeUpdated();
        }
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden sm:px-16 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none"
                dir="rtl"
                showCloseButton={false}
            >
                <DialogClose asChild>
                    <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
                        <XIcon size={23} className="text-gray-500" />
                    </button>
                </DialogClose>

                <DialogHeader className="mb-2 mt-15">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
                        {isEditMode ? "تعديل بيانات الموظف" : "إضافة موظف جديد"}
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
                            {/* اسم الموظف */}
                            <InputForm
                                name="employeeName"
                                label="اسم الموظف"
                                type="text"
                                placeholder="أدخل اسم الموظف كاملاً"
                            />

                            {/* رقم الهاتف مع الكود */}
                            <div className="grid grid-cols-12 gap-2">
                                {/* رقم الهاتف */}
                                <div className="col-span-8">
                                    <InputForm
                                        name="phoneNumber"
                                        label="رقم الهاتف"
                                        type="tel"
                                        placeholder="أدخل رقم الهاتف"
                                    />
                                </div>
                                {/* كود الدولة */}
                                <div className="col-span-4 flex items-end">
                                    <SelectForm
                                        name="countryCode"
                                        label=""
                                        options={[
                                            { value: "+966", label: "🇸🇦 +966" },
                                            { value: "+971", label: "🇦🇪 +971" },
                                            { value: "+974", label: "🇶🇦 +974" },
                                            { value: "+965", label: "🇰🇼 +965" },
                                            { value: "+973", label: "🇧🇭 +973" },
                                            { value: "+968", label: "🇴🇲 +968" },
                                            { value: "+20", label: "🇪🇬 +20" },
                                            { value: "+962", label: "🇯🇴 +962" },
                                            { value: "+961", label: "🇱🇧 +961" },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* البريد الإلكتروني */}
                            <InputForm
                                name="email"
                                label="البريد الإلكتروني"
                                type="email"
                                placeholder="example@domain.com"
                            />

                            {/* الوظيفة */}
                            <InputForm
                                name="jobTitle"
                                label="الوظيفة"
                                type="text"
                                placeholder="أدخل المسمى الوظيفي"
                            />

                            {/* الملاحظات */}
                            <InputForm
                                name="notes"
                                label="ملاحظات"
                                type="text"
                                placeholder="أي ملاحظات إضافية..."
                            />

                            <button
                                type="submit"
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
                            >
                                {isEditMode ? "حفظ التغييرات" : "إضافة موظف"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};