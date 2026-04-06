import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff, XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import * as Yup from "yup";
import { useUpdateLawyer } from "../api/hooks/useLawyersUpdate";
import { useAddLawyer } from "../api/hooks/useLawyers";
import type { Lawyer } from "../lawyers/types";

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
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        first_name: lawyer?.user?.first_name || "",
        phone: lawyer?.user?.phone?.replace(/^\+?\d{1,3}/, "") || "",
        countryCode: lawyer?.user?.phone?.match(/^\+\d{1,3}/)?.[0] || "+966",
        email: lawyer?.user?.email || "",
        specialization: lawyer?.specialization || "",
        license_number: lawyer?.license_number || "",
        password: "",
        nationality: "",
        country: "",
        address: "",
        role: "lawyer",
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("اسم المحامي مطلوب"),
        phone: Yup.string().required("رقم الهاتف مطلوب"),
        countryCode: Yup.string().required("كود الدولة مطلوب"),
        email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
        specialization: Yup.string().required("التخصص مطلوب"),
        license_number: Yup.string(),
        password: !isEditMode
            ? Yup.string().required("كلمة المرور مطلوبة").min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
            : Yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"), nationality: Yup.string(),
        country: Yup.string(),
        address: Yup.string(),
    });

    const { mutateAsync: updateLawyer, isPending: isUpdating } = useUpdateLawyer();
    const { mutateAsync: addLawyer, isPending: isAdding } = useAddLawyer();

    const isLoading = isEditMode ? isUpdating : isAdding;

    const handleSubmit = async (values: typeof initialValues) => {
        let cleanPhone = values.phone.replace(/\s/g, '').replace(/-/g, '');
        cleanPhone = cleanPhone.replace(/^\+\d{1,3}/, '');
        const fullPhone = `${values.countryCode}${cleanPhone}`;

        if (isEditMode && lawyer?.user_id) {
            await updateLawyer({
                id: lawyer.user_id.toString(),
                data: {
                    first_name: values.first_name,
                    email: values.email,
                    phone: fullPhone,
                    nationality: values.nationality,
                    password: values.password || undefined,
                    country: values.country,
                    address: values.address,
                    license_number: values.license_number,
                    specialization: values.specialization,
                    role: values.role,
                }
            });
        } else {
            await addLawyer({
                ...values,
                phone: fullPhone,
            });
        }
        onLawyerUpdated?.();
        onOpenChange?.(false);
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid grid-cols-12 gap-2">
                                    <div className="col-span-8">
                                        <InputForm
                                            name="phone"
                                            label="رقم الهاتف"
                                            type="tel"
                                            placeholder="أدخل رقم الهاتف"
                                        />
                                    </div>
                                    <div className="col-span-4">
                                        <SelectForm
                                            name="countryCode"
                                            label="كود الدولة"
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="license_number"
                                    label="رقم الترخيص"
                                    type="text"
                                    placeholder="أدخل رقم الترخيص"
                                />

                                <InputForm
                                    name="nationality"
                                    label="الجنسية"
                                    type="text"
                                    placeholder="أدخل الجنسية"
                                />
                            </div>

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

                            <div className="relative">
                                <InputForm
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    label="كلمة المرور"
                                    placeholder="أدخل كلمة المرور"
                                />
                                <button
                                    type="button"
                                    className="absolute left-3 top-[60px] -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

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