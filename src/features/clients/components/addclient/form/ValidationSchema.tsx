

import * as Yup from "yup";
export const validationSchema = Yup.object({
    firstName: Yup.string().required("الاسم مطلوب"),
    secondName: Yup.string().required("الاسم مطلوب"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "رقم غير صحيح")
        .required("رقم الهاتف مطلوب"),
});