import * as Yup from "yup";

export const validationSchema = Yup.object({
    session_date: Yup.string().required("تاريخ الجلسة مطلوب"),
    session_time: Yup.string().required("وقت الجلسة مطلوب"),
    lawyer_id: Yup.string().required("اسم المحامي مطلوب"),
    session_ruling: Yup.string().required("قرار الجلسة مطلوب"),
});