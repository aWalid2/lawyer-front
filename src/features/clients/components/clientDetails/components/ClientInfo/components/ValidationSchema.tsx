import * as Yup from "yup";
export const validationSchema = Yup.object({
  clientCode: Yup.string().required("الاسم مطلوب"),
  clientName: Yup.string().required("الاسم مطلوب"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "رقم غير صحيح")
    .required("رقم الهاتف مطلوب"),
  civilId: Yup.string().required("الرقم المدني مطلوب"),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  country: Yup.string().required("الدولة مطلوبة"),
  address: Yup.string().required("العنوان مطلوب"),
  email: Yup.string().required("البريد الإلكتروني مطلوب"),
  registrationDate: Yup.string().required("تاريخ التسجيل مطلوب"),
});
