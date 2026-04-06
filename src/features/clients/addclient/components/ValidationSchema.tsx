import * as Yup from "yup";

export const validationSchema = ( hasContract: boolean = false) => {
  const baseSchema = Yup.object().shape({
    first_name: Yup.string().required("اسم الموكل مطلوب"),
    email: Yup.string().required("البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صالح"),
    ssn: Yup.string().required("الرقم المدني مطلوب"),
    nationality: Yup.string().required("الجنسية مطلوبة"),
    country: Yup.string().required("الدولة مطلوبة"),
    address: Yup.string().required("العنوان مطلوب"),
    countryCode: Yup.string().required("كود الدولة مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
      .min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل")
      .max(15, "رقم الهاتف يجب أن لا يتجاوز 15 رقم"),
    profile: Yup.object().shape({
      client_type: Yup.string()
        .oneOf(["individual", "company", "government"], "نوع الموكل غير صالح")
        .required("نوع الموكل مطلوب"),
      notes: Yup.string(),
      contract: Yup.object().shape({
        start_date: hasContract 
          ? Yup.string().required("تاريخ بداية العقد مطلوب") 
          : Yup.string(),
        contract_value: hasContract 
          ? Yup.string().required("القيمة المتفق عليها مطلوبة") 
          : Yup.string(),
        contract_duration: hasContract 
          ? Yup.string().required("مدة العقد مطلوبة") 
          : Yup.string(),
      }),
      account: Yup.object().shape({
        confirmation_password: Yup.string(),
      }),
    }),
    contract_file: Yup.string(),
    authorization_photo: Yup.string(),
    // ✅ الباسورد مش مطلوب خالص
    password: Yup.string().notRequired(),
  });

  return baseSchema;
};