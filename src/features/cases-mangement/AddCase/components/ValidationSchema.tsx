import * as Yup from "yup";

export const validationSchema = Yup.object({
  // case_status: Yup.string(),
  // case_title: Yup.string().required("عنوان القضية مطلوب"),
  // client_name: Yup.string().required("اسم الموكل مطلوب"),
  // case_type: Yup.string().required("وضع القضية مطلوب"),
  // client_type: Yup.string().required("صفة الموكل مطلوبة"),
  // case_status_received: Yup.string(),
  // police_station: Yup.string(),
  // case_number_at_prosecution: Yup.string(),
  // regestration_date_of_case_at_prosecution: Yup.date().nullable(),
  // detective_name: Yup.string(),
  // investigation_name: Yup.string(),
  // registration_at_public_prosecution: Yup.date().nullable(),
  // case_entry_date: Yup.date().nullable(),
  // case_receipt_date: Yup.date().nullable(),

  // name: Yup.string(),
  // legal_status: Yup.string(),

  // phone: Yup.string()
  //   .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
  //   .min(9, "رقم الهاتف يجب أن يكون 9 أرقام على الأقل")
  //   .max(14, "رقم الهاتف طويل جداً"),

  // ssn: Yup.string()
  //   .matches(/^[0-9]+$/, "الرقم القومي يجب أن يحتوي على أرقام فقط")
  //   .min(14, "الرقم القومي يجب أن يكون 14 رقم")
  //   .max(14, "الرقم القومي يجب أن يكون 14 رقم"),

  // nationality: Yup.string(),
  // country: Yup.string(),
  // address: Yup.string(),
  // email: Yup.string().email("البريد الإلكتروني غير صحيح"),

  // fixedFees: Yup.number()
  //   .positive("يجب أن يكون رقماً موجباً")
  //   .when('fee_type', {
  //     is: 'fixed',
  //     then: (schema) => schema.required("الأتعاب الثابتة مطلوبة"),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),

  // profitPercentage: Yup.number()
  //   .positive("يجب أن يكون رقماً موجباً")
  //   .max(100, "النسبة يجب أن تكون أقل من أو تساوي 100")
  //   .when('fee_type', {
  //     is: 'profit',
  //     then: (schema) => schema.required("نسبة الأرباح مطلوبة"),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),

  // contract_start_date: Yup.date().nullable(),
  // contract_value: Yup.string(),
  // contract_duration: Yup.string(),
  // contract_image: Yup.mixed().nullable(),
  // power_of_attorney_image: Yup.mixed().nullable(),
  // notes: Yup.string(),

});