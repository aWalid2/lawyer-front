import * as Yup from "yup";

// في ملف ValidationSchema.ts
export const validationSchema = (shouldAddClient: boolean) => {
  const baseSchema = Yup.object().shape({
    first_name: Yup.string().required("اسم الموكل مطلوب"),
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
    ssn: Yup.string()
      .required("الرقم المدني مطلوب"),
    nationality: Yup.string().required("الجنسية مطلوبة"),
    country: Yup.string().required("الدولة مطلوبة"),
    address: Yup.string().required("العنوان مطلوب"),

    profile: Yup.object().shape({
      client_type: Yup.string()
        .oneOf(["individual", "company", "lawyer"], "نوع الموكل غير صالح")
        .required("نوع الموكل مطلوب"),
      phone: Yup.string()
        .required("رقم الهاتف مطلوب")
        .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
        .min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل")
        .max(15, "رقم الهاتف يجب أن لا يتجاوز 15 رقم"),
      notes: Yup.string(),
      contract: Yup.object().shape({
        start_date: Yup.string().nullable(),
        contract_value: Yup.string().nullable(),
        contract_duration: Yup.string().nullable(),
      }),
      account: Yup.object().shape({
        confirmation_password: Yup.string(),
      }),
    }),
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
              function(value) {
                // الطريقة الصحيحة للوصول إلى password
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