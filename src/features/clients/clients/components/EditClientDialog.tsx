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
import { useUpdateClient } from "../api/hooks/useUpdateClient";
import type { ClientRelatedT } from "../types/clientT";

import * as Yup from "yup";

interface EditClientDialogProps {
    client: ClientRelatedT;
    trigger: React.ReactNode;
    onSave?: (client: any) => void;
}

export const EditClientDialog: React.FC<EditClientDialogProps> = ({
    client,
    trigger,
    onSave,
}) => {
    const { mutateAsync: update, isPending } = useUpdateClient();

    const initialValues = {
        clientType: "individual",
        clientName: `${client?.user?.first_name || ""} ${client?.user?.last_name || ""}`.trim(),
        nationalId: client?.user?.national_id || "",
        phoneNumber: client?.user?.phone || "",
        countryCode: "+966",
        email: client?.user?.email || "",
        nationality: client?.user?.nationality || "",
        country: client?.user?.country || "",
        address: client?.user?.address || "",
        uploadFiles: null,
        notes: client?.user?.notes || "",
    };

    const validationSchema = Yup.object().shape({
        clientType: Yup.string().required("نوع الموكل مطلوب"),
        clientName: Yup.string().required("اسم الموكل مطلوب"),
        nationalId: Yup.string().required("الرقم المدني مطلوب"),
        phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
        countryCode: Yup.string().required("كود الدولة مطلوب"),
        email: Yup.string().email("البريد الإلكتروني غير صالح"),
        nationality: Yup.string(),
        country: Yup.string(),
        address: Yup.string(),
        uploadFiles: Yup.mixed().nullable(),
        notes: Yup.string().nullable(),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        await update({ id: client.id, data: values });
        onSave?.(values);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[772px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-main rounded-main border-none"
                dir="rtl"
                showCloseButton={false}
                onClick={(e) => e.stopPropagation()}
            >
                <DialogClose asChild>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all outline-none"
                    >
                        <XIcon size={23} className="text-gray-500" />
                    </button>
                </DialogClose>

                <DialogHeader className="mb-2 mt-15">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
                        تعديل بيانات الموكل
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
                                <SelectForm
                                    name="clientType"
                                    label="نوع الموكل"
                                    options={[
                                        { value: "individual", label: "فرد" },
                                        { value: "company", label: "شركة" },
                                        { value: "government", label: "جهة حكومية" },
                                    ]}
                                />

                                <InputForm
                                    name="clientName"
                                    label="الاسم"
                                    type="text"
                                    placeholder="أدخل الاسم كاملاً"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <InputForm
                                    name="nationalId"
                                    label="الرقم المدني"
                                    type="text"
                                    placeholder="أدخل الرقم المدني"
                                />

                                <div className="grid grid-cols-12 gap-2 ">
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


                            <div className="w-[121px] h-[99px] mb-16">
                                <FileUpload
                                    name="uploadFiles"
                                    label="صورة التوكيل"
                                />
                            </div>

                            <DialogClose asChild>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity font-cairo disabled:opacity-50"
                                >
                                    {isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
                                </button>
                            </DialogClose>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};