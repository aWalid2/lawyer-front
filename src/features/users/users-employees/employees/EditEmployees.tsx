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
import type { Employee } from "./types";
import * as Yup from "yup";
import { useAddEmployee } from "./api/hooks/useAddEmployee";
import { useUpdateEmployee } from "./api/hooks/useUpdateEmployee";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";
import parsePhoneNumberFromString from "libphonenumber-js";

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
    const [showPassword, setShowPassword] = useState(false);
    const phoneData = employee?.user?.phone ? parsePhoneNumberFromString(employee.user.phone) : null;
    
    const initialValues = {
        first_name: employee?.user?.first_name || "",
        phone: phoneData ? phoneData.nationalNumber : (employee?.user?.phone || ""),
        countryCode: phoneData ? `+${phoneData.countryCallingCode}` : "+966",
        email: employee?.user?.email || "",
        password: "",
        position: employee?.position || "",
        notes: employee?.profile?.notes || ""
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("اسم الموظف مطلوب"),
        phone: Yup.string()
            .required("رقم الهاتف مطلوب")
            .test("is-valid-phone", "رقم الهاتف غير صحيح", function (value) {
                const { countryCode } = this.parent;
                if (!value) return false;

                const country = COUNTRY_OPTIONS.find(opt => opt.value === countryCode);
                const iso = (country as any)?.iso;

                try {
                    const phoneNumber = parsePhoneNumberFromString(value, iso);
                    return phoneNumber?.isValid() || false;
                } catch {
                    return false;
                }
            }),
        countryCode: Yup.string().required("كود الدولة مطلوب"),
        email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
        password: !isEditMode
            ? Yup.string().required("كلمة المرور مطلوبة").min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
            : Yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
        position: Yup.string().required("الوظيفة مطلوبة"),
        notes: Yup.string(),
    });

    const { mutate: addEmployee, isPending: isAdding } = useAddEmployee();
    const { mutate: updateEmployee, isPending: isUpdating } = useUpdateEmployee();
    const isLoading = isEditMode ? isUpdating : isAdding;

    const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
        const submitData: any = {
            first_name: values.first_name,
            phone: `${values.countryCode}${values.phone}`,
            email: values.email,
            role: "employee",
            position: values.position,
            notes: values.notes
        };
        if (!isEditMode) {
            submitData.password = values.password;
        } else if (values.password) {
            submitData.password = values.password;
        }

        if (isEditMode && employee?.user_id) {
            // تعديل موظف
            updateEmployee({
                id: employee.user_id.toString(),
                data: submitData
            }, {
                onSuccess: () => {
                    onEmployeeUpdated?.();
                    onOpenChange?.(false);
                    setSubmitting(false);
                },
                onError: () => {
                    setSubmitting(false);
                }
            });
        } else {
            // إضافة موظف جديد
            addEmployee(submitData, {
                onSuccess: () => {
                    onEmployeeUpdated?.();
                    onOpenChange?.(false);
                    setSubmitting(false);
                },
                onError: () => {
                    setSubmitting(false);
                }
            });
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
                    {({ isSubmitting }) => (
                        <Form className="space-y-6 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
                            <InputForm
                                name="first_name"
                                label="اسم الموظف"
                                type="text"
                                placeholder="أدخل اسم الموظف كاملاً"
                            />

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
                                        options={COUNTRY_OPTIONS}
                                    />
                                </div>
                            </div>

                            <InputForm
                                name="email"
                                label="البريد الإلكتروني"
                                type="email"
                                placeholder="example@domain.com"
                            />

                            <InputForm
                                name="position"
                                label="الوظيفة"
                                type="text"
                                placeholder="أدخل المسمى الوظيفي"
                            />

                            <InputForm
                                name="notes"
                                label="ملاحظات"
                                type="text"
                                placeholder="أي ملاحظات إضافية..."
                            />

                            <div className="relative">
                                <InputForm
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="********"
                                    label={isEditMode ? "كلمة المرور" : "كلمة المرور"}
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
                                disabled={isLoading || isSubmitting}
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {(isLoading || isSubmitting) ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                        {isEditMode ? "جاري الحفظ..." : "جاري الإضافة..."}
                                    </span>
                                ) : (
                                    isEditMode ? "حفظ التغييرات" : "إضافة موظف"
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};