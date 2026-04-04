import * as Yup from "yup";

export const validationSchema = Yup.object({
  case_status_received: Yup.string(),
  case_title: Yup.string().required("عنوان القضية مطلوب"),
  client_name: Yup.string().required("اسم الموكل مطلوب"),
  case_type: Yup.string().required("وضع القضية نوع"),
  client_type: Yup.string().required("صفة الموكل مطلوبة"),
  case_status: Yup.string().required("حالة القضية مطلوبة"),
  case_entry_date: Yup.date().required("تاريخ ورود القضية في المكتب مطلوب"),
  case_police_station: Yup.string().when("case_situation", {
    is: "PUBLIC_PROSECUTION",
    then: (schema) => schema.required("المخفر مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),

  regestration_date_of_case_at_prosecution: Yup.date().when("case_situation", {
    is: "PUBLIC_PROSECUTION",
    then: (schema) => schema.required("تاريخ تسجيل القضية في الادعاء العام مطلوب"),
    otherwise: (schema) => schema.required("تاريخ تسجيل القضية في المخفر مطلوب"),
  }),
  case_arrival_date_at_police_station: Yup.date().when("case_situation", {
    is: "PUBLIC_PROSECUTION",
    then: (schema) => schema.required("تاريخ ورود القضية في المخفر مطلوب"),
    otherwise: (schema) => schema.required("تاريخ ورود القضية في النيابة مطلوب"),
  }),


  name: Yup.string().when("has_opponent", {
    is: true,
    then: (schema) => schema.required("اسم الخصم مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  legal_status: Yup.string().when("has_opponent", {
    is: true,
    then: (schema) => schema.required("صفة الخصم مطلوبة"),
    otherwise: (schema) => schema.notRequired(),
  }),

  phone: Yup.string().when("has_opponent", {
    is: true,
    then: (schema) => schema.required("رقم الهاتف مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  })
    .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
    .min(9, "رقم الهاتف يجب أن يكون 9 أرقام على الأقل")
    .max(14, "رقم الهاتف طويل جداً"),

  ssn: Yup.string().when("has_opponent", {
    is: true,
    then: (schema) => schema.required("الرقم القومي مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  })
    .matches(/^[0-9]+$/, "الرقم القومي يجب أن يحتوي على أرقام فقط")
    .min(14, "الرقم القومي يجب أن يكون 14 رقم")
    .max(14, "الرقم القومي يجب أن يكون 14 رقم"),


  fixed_profits: Yup.number()
    .nullable()
    .when("case_fees_type", {
      is: "fixed_profits",
      then: (schema) =>
        schema
          .required("الأتعاب الثابتة مطلوبة")
          .typeError("يجب إدخال رقم صحيح")
          .min(1, "الأتعاب الثابتة لابد ان تكون اكبر من 0"),
      otherwise: (schema) => schema.notRequired(),
    }),

  percentage_of_profits: Yup.number()
    .nullable()
    .when("case_fees_type", {
      is: "percentage_of_profits",
      then: (schema) =>
        schema
          .required("نسبة الأرباح مطلوبة")
          .typeError("يجب إدخال رقم صحيح")
          .min(0, "يجب أن يكون 0 أو أكبر")
          .max(100, "النسبة يجب أن تكون أقل من أو تساوي 100"),
      otherwise: (schema) => schema.notRequired(),
    }),




  nationality: Yup.string(),
  country: Yup.string(),
  address: Yup.string(),
  email: Yup.string().email("البريد الإلكتروني غير صحيح"),

  contract_start_date: Yup.date().nullable(),
  contract_value: Yup.string(),
  contract_duration: Yup.string(),
  contract_image: Yup.mixed().nullable(),
  power_of_attorney_image: Yup.mixed().nullable(),
  notes: Yup.string(),

});