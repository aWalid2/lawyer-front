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
import type { Lawyer } from "./types";

import * as Yup from "yup";

interface EditLawyersProps {
    lawyer?: Lawyer;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onLawyerUpdated?: () => void;
}

export const Editlawyers: React.FC<EditLawyersProps> = ({
    lawyer,
    open,
    onOpenChange,
    onLawyerUpdated
}) => {
    const isEditMode = !!lawyer;

    const initialValues = {
        lawyerName: lawyer?.lawyerName || "",
        phoneNumber: lawyer?.phoneNumber || "",
        email: lawyer?.email || "",
        specialization: lawyer?.specialization || "",
        nationalId: lawyer?.nationalId || "",
        countryCode: lawyer?.countryCode || "+966",
        nationality: lawyer?.nationality || "",
        country: lawyer?.country || "",
        address: lawyer?.address || "",

    };

    const validationSchema = Yup.object().shape({
        lawyerName: Yup.string().required("اسم المحامي مطلوب"),
        phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
        email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
        specialization: Yup.string().required("التخصص مطلوب"),
        nationalId: Yup.string(),
        countryCode: Yup.string().required("كود الدولة مطلوب"),
        nationality: Yup.string(),
        country: Yup.string(),
        address: Yup.string(),
    });

    const handleSubmit = (values: typeof initialValues) => {
        console.log(isEditMode ? "تحديث المحامي:" : "إضافة محامي جديد:", values);
        if (onLawyerUpdated) {
            onLawyerUpdated();
        }
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[715px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none"
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
                        {isEditMode ? "تعديل بيانات المحامي" : "إضافة محامي جديد"}
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
                            {/* الصف الأول: الاسم والتخصص */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="lawyerName"
                                    label="اسم المحامي"
                                    type="text"
                                    placeholder="أدخل اسم المحامي كاملاً"
                                />

                                <InputForm
                                    name="specialization"
                                    label="التخصص"
                                    type="text"
                                    placeholder="أدخل التخصص"
                                />
                            </div>

                            {/* الصف الثاني: رقم الهاتف مع الكود والبريد الإلكتروني */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                <InputForm
                                    name="email"
                                    label="البريد الإلكتروني"
                                    type="email"
                                    placeholder="example@domain.com"
                                />
                            </div>

                            {/* الصف الثالث: رقم الهوية والجنسية */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="nationalId"
                                    label="رقم الهوية"
                                    type="text"
                                    placeholder="أدخل رقم الهوية"
                                />

                                <InputForm
                                    name="nationality"
                                    label="الجنسية"
                                    type="text"
                                    placeholder="أدخل الجنسية"
                                />
                            </div>

                            {/* الصف الرابع: الدولة والعنوان */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="country"
                                    label="الدولة"
                                    type="text"
                                    placeholder="أدخل الدولة"
                                />

                                <InputForm
                                    name="address"
                                    label="العنوان"
                                    type="text"
                                    placeholder="أدخل العنوان بالتفصيل"
                                />
                            </div>



                            <button
                                type="submit"
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
                            >
                                {isEditMode ? "حفظ التغييرات" : "إضافة محامي"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};