// ValidationSchema.ts
import * as Yup from "yup";

export const validationSchema = Yup.object({
  // المعلومات الأساسية
  clientType: Yup.string()
    .oneOf(["individual", "company", "lawyer"], "نوع الموكل غير صحيح")
    .required("نوع الموكل مطلوب"),
  
  secondName: Yup.string()
    .min(2, "الاسم يجب أن يكون على الأقل حرفين")
    .max(50, "الاسم طويل جداً")
    .required("الاسم مطلوب"),
  
  // معلومات الاتصال
  phone: Yup.string()
    .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
    .min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل")
    .max(15, "رقم الهاتف طويل جداً")
    .required("رقم الهاتف مطلوب"),
  
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  
  address: Yup.string()
    .min(5, "العنوان قصير جداً")
    .required("العنوان مطلوب"),
  
  // المعلومات الشخصية
  civilId: Yup.string()
    .matches(/^[0-9]+$/, "الرقم المدني يجب أن يحتوي على أرقام فقط")
    .min(10, "الرقم المدني يجب أن يكون 10 أرقام")
    .max(10, "الرقم المدني يجب أن يكون 10 أرقام")
    .required("الرقم المدني مطلوب"),
  
  nationality: Yup.string()
    .required("الجنسية مطلوبة"),
  
  country: Yup.string()
    .required("الدولة مطلوبة"),
  
  // معلومات العقد (اختيارية)
  contractStartDate: Yup.string()
    .when('hasContract', {
      is: true,
      then: (schema) => schema.required("تاريخ بداية العقد مطلوب")
    }),
  
  contractValue: Yup.string()
    .when('hasContract', {
      is: true,
      then: (schema) => schema.required("القيمة المتفق عليها مطلوبة")
    }),
  
  contractDuration: Yup.string()
    .when('hasContract', {
      is: true,
      then: (schema) => schema.required("مدة العقد مطلوبة")
    }),
  
  contractImage: Yup.mixed()
    .when('hasContract', {
      is: true,
      then: (schema) => schema.required("صورة العقد مطلوبة")
    }),
  
  // معلومات الحساب (اختيارية)
  password: Yup.string()
    .when('addClients', {
      is: true,
      then: (schema) => schema
        .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
        .matches(/[a-zA-Z]/, "كلمة المرور يجب أن تحتوي على حروف")
        .matches(/[0-9]/, "كلمة المرور يجب أن تحتوي على أرقام")
        .required("كلمة المرور مطلوبة")
    }),
  
  confirmPassword: Yup.string()
    .when('addClients', {
      is: true,
      then: (schema) => schema
        .oneOf([Yup.ref('password')], "كلمة المرور غير متطابقة")
        .required("تأكيد كلمة المرور مطلوب")
    }),
});