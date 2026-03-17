import * as Yup from "yup";

export const validationSchema = Yup.object({
    officeLogo: Yup.mixed().nullable(),
    officeName: Yup.string().required("اسم المكتب مطلوب"),
    notes: Yup.string().required("حقل من نحن مطلوب"),
    vision: Yup.string().required("حقل الرؤية مطلوب"),
    message: Yup.string().required("حقل الرسالة مطلوب"),
    teamMembers: Yup.array().of(
        Yup.object({
            name: Yup.string().required("اسم العضو مطلوب"),
            role: Yup.string().required("الوظيفة مطلوبة"),
            description: Yup.string(),
        })
    ),
    contactInfo: Yup.object({
        email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
        phone: Yup.string().required("رقم الهاتف مطلوب"),
        address: Yup.string().required("العنوان مطلوب"),
        workingHours: Yup.string().required("أوقات العمل مطلوبة"),
    }),
});