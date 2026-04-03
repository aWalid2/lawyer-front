import * as Yup from "yup";

export const validationSchema = (shouldAddClient: boolean, hasContract: boolean = false) => {
  const baseSchema = Yup.object().shape({
    first_name: Yup.string().required("اسم الموكل مطلوب"),
    email: Yup.string().required("البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صالح"),
    ssn: Yup.string().required("الرقم المدني مطلوب"),
    nationality: Yup.string().required("الجنسية مطلوبة"),
    country: Yup.string().required("الدولة مطلوبة"),
    authorization_photo: Yup.mixed()
      .required("صورة التوكيل مطلوبة")
      .test("fileExists", "صورة التوكيل مطلوبة", (value) => {
        return value && value instanceof File;
      }),
      address: Yup.string().required("العنوان مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
      .min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل")
      .max(15, "رقم الهاتف يجب أن لا يتجاوز 15 رقم"),
    profile: Yup.object().shape({
      client_type: Yup.string()
        .oneOf(["individual", "company", "lawyer"], "نوع الموكل غير صالح")
        .required("نوع الموكل مطلوب"),
      notes: Yup.string(),
      contract: Yup.object().shape({
        start_date: hasContract 
          ? Yup.string().required("تاريخ بداية العقد مطلوب") 
          : Yup.string().nullable(),
        contract_value: hasContract 
          ? Yup.string().required("القيمة المتفق عليها مطلوبة") 
          : Yup.string().nullable(),
        contract_duration: hasContract 
          ? Yup.string().required("مدة العقد مطلوبة") 
          : Yup.string().nullable(),
      }),
      account: Yup.object().shape({
        confirmation_password: Yup.string(),
      }),
    }),
    contract_file: hasContract 
      ? Yup.mixed().required("صورة العقد مطلوبة")
      : Yup.mixed().notRequired(),
  });

  if (shouldAddClient) {
    return baseSchema.shape({
      password: Yup.string()
        .required("كلمة المرور مطلوبة")
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
      profile: Yup.object().shape({
        account: Yup.object().shape({
          confirmation_password: Yup.string()
            .required("تأكيد كلمة المرور مطلوب")
            .test(
              'passwords-match',
              'كلمة المرور غير متطابقة',
              function (value) {
                const password = this.options.context?.password || this.parent?.parent?.parent?.password;
                return value === password;
              }
            ),
        }),
      }),
    });
  }

  return baseSchema;
};