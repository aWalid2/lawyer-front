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
import type { Lawyer } from "./types";
import * as Yup from "yup";
import { useUpdateLawyer } from "../api/hooks/useLawyersUpdate";
import { useAddLawyer } from "../api/hooks/useLawyers";

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
        first_name: lawyer?.first_name || "",
        phone: lawyer?.phone || "",
        email: lawyer?.email || "",
        specialization: lawyer?.profile?.specialization || "",
        ssn: lawyer?.ssn || "",
        password: "",
        nationality: lawyer?.nationality || "",
        country: lawyer?.country || "",
        address: lawyer?.address || "",
        role: "lawyer", // ثابت
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("اسم المحامي مطلوب"),
        phone: Yup.string().required("رقم الهاتف مطلوب"),
        email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
        specialization: Yup.string().required("التخصص مطلوب"),
        ssn: Yup.string(),
        password: !isEditMode 
            ? Yup.string().required("كلمة المرور مطلوبة").min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
            : Yup.string(),
        nationality: Yup.string(),
        country: Yup.string(),
        address: Yup.string(),
    });

    const { mutate: updateLawyer, isPending: isUpdating } = useUpdateLawyer();
    const { mutate: addLawyer, isPending: isAdding } = useAddLawyer();

    const isLoading = isEditMode ? isUpdating : isAdding;

    const handleSubmit = (values: typeof initialValues) => {
        if (isEditMode && lawyer?.id) {
            // تحديث محامي موجود
            updateLawyer(
                { 
                    id: lawyer.id, 
                    data: {
                        first_name: values.first_name,
                        email: values.email,
                        phone: values.phone,
                        nationality: values.nationality,
                        password: values.password || undefined,
                        country: values.country,
                        address: values.address,
                        ssn: values.ssn,
                        specialization: values.specialization,
                        role: values.role, // إضافة الرول
                    }
                },
                {
                    onSuccess: () => {
                        if (onLawyerUpdated) {
                            onLawyerUpdated();
                        }
                        if (onOpenChange) {
                            onOpenChange(false);
                        }
                    },
                }
            );
        } else {
            // إضافة محامي جديد
            addLawyer(values, {
                onSuccess: () => {
                    if (onLawyerUpdated) {
                        onLawyerUpdated();
                    }
                    if (onOpenChange) {
                        onOpenChange(false);
                    }
                },
            });
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
                                    name="first_name"
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

                            {/* الصف الثاني: رقم الهاتف والبريد الإلكتروني */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="phone"
                                    label="رقم الهاتف"
                                    type="tel"
                                    placeholder="أدخل رقم الهاتف"
                                />

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
                                    name="ssn"
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

                           

                            {/* حقل كلمة المرور - يظهر في وضع الإضافة فقط */}
                            {!isEditMode && (
                                <div className="grid grid-cols-1 gap-4">
                                    <InputForm
                                        name="password"
                                        label="كلمة المرور"
                                        type="password"
                                        placeholder="أدخل كلمة المرور"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                        {isEditMode ? "جاري الحفظ..." : "جاري الإضافة..."}
                                    </span>
                                ) : (
                                    isEditMode ? "حفظ التغييرات" : "إضافة محامي"
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};