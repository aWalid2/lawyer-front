import * as Yup from "yup";

export const validationSchema = Yup.object({
    caseTitle: Yup.string()
        .required("رقم القضية مطلوب"),

    clientName: Yup.string()
        .required("اسم المحقق مطلوب"),

    investigationSource: Yup.string()
        .required("جهة التحقيق مطلوبة"),

    caseReceiptDate: Yup.string()
        .required("تاريخ ورود القضية مطلوب"),

    notes: Yup.string()
        .required("المخفر التابع له القضية مطلوب"),
});