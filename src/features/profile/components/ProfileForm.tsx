import { Formik, Form } from "formik";
import { InputForm } from "@/components/shared/components/InputForm";
import { SelectForm } from "@/components/shared/components/SelectForm";
import { validationSchema } from "./ProfileValidation";

interface ProfileFormProps {
    onSubmit: (values: any) => void;
    initialValues: any;
}

const ProfileForm = ({ onSubmit, initialValues }: ProfileFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {() => (
                <Form>
                    <div className="flex-1">
                        {/* الصف الأول: الاسم الأول والاسم الأخير */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <InputForm
                                label="الاسم الأول"
                                name="firstName"
                                type="text"
                                placeholder="أدخل الاسم الأول"
                            />
                            <InputForm
                                label="الاسم الأخير"
                                name="lastName"
                                type="text"
                                placeholder="أدخل الاسم الأخير"
                            />
                        </div>

                        {/* الصف الثاني: البريد الإلكتروني ورقم الهاتف مع الكود */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <InputForm
                                name="email"
                                label="البريد الإلكتروني"
                                type="email"
                                placeholder="أدخل البريد الإلكتروني"
                            />

                            <div className="grid grid-cols-12 gap-2">
                                <div className="col-span-8">
                                    <InputForm
                                        name="phoneNumber"
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
                        </div>

                        {/* الصف الثالث: الرقم المدني والدولة */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <InputForm
                                label="الرقم المدني"
                                name="civilId"
                                type="text"
                                placeholder="أدخل الرقم المدني"
                            />
                            <InputForm
                                label="الدولة"
                                name="country"
                                type="text"
                                placeholder="أدخل الدولة"
                            />
                        </div>

                        {/* الصف الرابع: الجنسية والعنوان */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <InputForm
                                label="الجنسية"
                                name="nationality"
                                type="text"
                                placeholder="أدخل الجنسية"
                            />
                            <InputForm
                                label="العنوان"
                                name="address"
                                type="text"
                                placeholder="أدخل العنوان"
                            />
                        </div>

                        {/* الصف الخامس: كلمة المرور */}
                        <div className="mb-4">
                            <InputForm
                                label="كلمة المرور"
                                name="password"
                                type="password"
                                placeholder="أدخل كلمة المرور"
                            />
                        </div>

                        {/* زر الحفظ */}
                        <div className="flex justify-start mt-6 ">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#CBA462] text-white rounded-lg hover:bg-[#E3C086] transition-colors h-[50px] w-[241px] "
                            >
                               حفظ التعديلات
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileForm;