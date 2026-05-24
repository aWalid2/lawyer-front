import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string().required("الاسم الأول مطلوب"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("بريد إلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
  civilId: Yup.string().required("الرقم المدني مطلوب"),
  country: Yup.string().required("الدولة مطلوبة"),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  address: Yup.string().required("العنوان مطلوب"),
  password: Yup.string()
    .trim()
    .test(
      "password-length",
      "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      (value) => !value || value.length >= 6,
    ),
});
