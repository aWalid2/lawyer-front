import * as Yup from "yup";

export const validationSchema = Yup.object({
  // الحقول الأساسية
  clientType: Yup.string().required("نوع الموكل مطلوب"),
  firstName: Yup.string(),
  secondName: Yup.string().required("الاسم مطلوب"),
  countryCode: Yup.string().required("كود الدولة مطلوب"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
    .min(9, "رقم الهاتف يجب أن يكون 9 أرقام على الأقل")
    .max(14, "رقم الهاتف طويل جداً")
    .required("رقم الهاتف مطلوب"),
  
  // الحقول الإضافية
  civilId: Yup.string()
    .matches(/^[0-9]+$/, "الرقم المدني يجب أن يحتوي على أرقام فقط")
    .min(10, "الرقم المدني يجب أن يكون 10 أرقام")
    .max(10, "الرقم المدني يجب أن يكون 10 أرقام"),
  
  nationality: Yup.string(),
  country: Yup.string(),
  address: Yup.string(),
  
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .nullable(),
  
  // حقول العقد (شرطية)
  contractStartDate: Yup.date()
    .nullable(),
  
  contractValue: Yup.string(),
  contractDuration: Yup.string(),
  
  // حقول الصور
  contractImage: Yup.mixed()
    .nullable(),
  
  powerOfAttorneyImage: Yup.mixed()
    .nullable(),
  
  notes: Yup.string(),
  
  // حقول إنشاء الحساب
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .when('addClients', {
      is: true,
      then: (schema) => schema.required("كلمة المرور مطلوبة"),
      otherwise: (schema) => schema.notRequired(),
    }),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "كلمة المرور غير متطابقة")
    .when('addClients', {
      is: true,
      then: (schema) => schema.required("تأكيد كلمة المرور مطلوب"),
      otherwise: (schema) => schema.notRequired(),
    }),
});