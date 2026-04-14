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
import { FileUpload } from "@/shared/components/FileUpload";
import { SelectForm } from "@/shared/components/SelectForm";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { useUpdateClient } from "@/features/users/users-clients/api/hooks/useUpdateClients";

interface EditClientDialogProps {
    client: any
    trigger: React.ReactNode;
    onSave?: (client: any) => void;
}

export const EditClientDialog: React.FC<EditClientDialogProps> = ({
    client,
    trigger,
    onSave,
}) => {
    const [open, setOpen] = React.useState(false);
    const { mutateAsync: updateClient, isPending } = useUpdateClient();

    const phoneData = client?.user?.phone ? parsePhoneNumberFromString(client.user.phone) : null;

    const initialValues: any = {
        ...client,
        client_type: client?.client_type || "individual",
        first_name: client?.user?.first_name || "",
        last_name: client?.user?.last_name || "",
        ssn: client?.user?.ssn || "",
        phone: phoneData ? phoneData.nationalNumber : (client?.user?.phone || ""),
        country_code: phoneData ? `+${phoneData.countryCallingCode}` : "+966",
        email: client?.user?.email || "",
        nationality: client?.user?.nationality || "",
        country: client?.user?.country || "",
        address: client?.user?.address || "",
        contract_photo: client?.contract_photo || null,
        notes: client?.user?.notes || "",
        user_status: client?.user?.user_status || "",
    };


    const validationSchema = Yup.object().shape({
        client_type: Yup.string().required("نوع الموكل مطلوب"),
        first_name: Yup.string(),
        last_name: Yup.string(),
        ssn: Yup.string()
            .matches(/^[0-9]+$/, "الرقم المدني يجب أن يكون أرقام")
            .length(10, "الرقم المدني يجب أن يكون 10 أرقام"),
        phone: Yup.string()
            .required("رقم الهاتف مطلوب")
            .test("is-valid-phone", "رقم الهاتف غير صحيح", function (value) {
                const { country_code } = this.parent;
                if (!value) return false;


                const country = COUNTRY_OPTIONS.find(opt => opt.value === country_code);
                const iso = (country as any)?.iso;

                try {
                    const phoneNumber = parsePhoneNumberFromString(value, iso);
                    return phoneNumber?.isValid() || false;
                } catch {
                    return false;
                }
            }),
        country_code: Yup.string().required("كود الدولة مطلوب"),
        email: Yup.string().email("البريد الإلكتروني غير صالح"),
        nationality: Yup.string().nullable(),
        country: Yup.string().nullable(),
        address: Yup.string().nullable(),
        uploadFiles: Yup.mixed().nullable(),
        user_status: Yup.string().required("حالة المستخدم مطلوبة"),
    });


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[772px] max-h-[95vh] flex flex-col overflow-hidden sm:px-16 px-6 sm:py-8 py-4 sm:rounded-main rounded-main border-none"
                dir="rtl"
                showCloseButton={false}
                onClick={(e) => e.stopPropagation()}
            >
                <DialogClose asChild>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-4 sm:top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all outline-none"
                    >
                        <XIcon size={23} className="text-gray-500" />
                    </button>
                </DialogClose>

                <DialogHeader className="mb-2 sm:mt-10 mt-6 lh-0">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
                        تعديل بيانات الموكل
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const country = COUNTRY_OPTIONS.find(opt => opt.value === values.country_code);
                            const iso = (country as any)?.iso;
                            const phoneNumber = parsePhoneNumberFromString(values.phone, iso);

                            const formattedValues = {
                                ...values,
                                phone: phoneNumber ? phoneNumber.format("E.164") : `${values.country_code}${values.phone}`,
                            };
                            await updateClient({ id: client.user_id, data: formattedValues });
                            onSave?.(formattedValues);
                            setOpen(false);
                        } catch (error) {
                            console.error(error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {() => (
                        <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SelectForm
                                    name="client_type"
                                    label="نوع الموكل"
                                    options={[
                                        { value: "individual", label: "فرد" },
                                        { value: "company", label: "شركة" },
                                        { value: "government", label: "جهة حكومية" },
                                    ]}
                                    showSearch={true}
                                />

                                <InputForm
                                    name="first_name"
                                    label="الاسم"
                                    type="text"
                                    placeholder="أدخل الاسم كاملاً"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <InputForm
                                    name="ssn"
                                    label="الرقم المدني"
                                    type="text"
                                    placeholder="أدخل الرقم المدني"
                                />

                                <div className="grid grid-cols-12 gap-2 ">
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
                                            name="country_code"
                                            label="كود الدولة"
                                            showSearch={true}
                                            options={COUNTRY_OPTIONS}

                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    name="email"
                                    label="البريد الإلكتروني"
                                    type="email"
                                    placeholder="example@domain.com"
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SelectForm
                                    name="user_status"
                                    label="حالة المستخدم"
                                    placeholder="أدخل حالة المستخدم"
                                    options={[
                                        { value: "active", label: "نشط" },
                                        { value: "inactive", label: "غير نشط" },
                                    ]}
                                />
                            </div>

                            <div className="w-[121px] h-[99px] mb-16">
                                <FileUpload
                                    name="contract_photo"
                                    label="صورة التوكيل"
                                />
                            </div>
                            <SubmitButton
                                isPending={isPending}
                                loadingText="جاري التعديل..."
                                className="mt-6"
                            >
                                حفظ التغييرات
                            </SubmitButton>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};