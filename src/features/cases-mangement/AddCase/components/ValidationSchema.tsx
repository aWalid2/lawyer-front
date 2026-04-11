import * as Yup from "yup";

export const validationSchema = Yup.object({
  case_status_received: Yup.string(),
  case_title: Yup.string().required("عنوان القضية مطلوب"),
  client_id: Yup.string().required("اسم الموكل مطلوب"),
  case_type_id: Yup.string().required("نوع القضية مطلوب"),
  client_type: Yup.string().required("صفة الموكل مطلوبة"),
  case_status_id: Yup.string().required("حالة القضية مطلوبة"),
  case_entry_date: Yup.date().required("تاريخ ورود القضية في المكتب مطلوب"),
  case_police_station: Yup.string().when("case_situation", {
    is: "PUBLIC_PROSECUTION",
    then: (schema: any) => schema.required("المخفر مطلوب"),
    otherwise: (schema: any) => schema.notRequired(),
  }),

  regestration_date_of_case_at_prosecution: Yup.date().nullable().when("case_situation", {
    is: "PUBLIC_PROSECUTION",
    then: (schema: any) => schema.required("تاريخ تسجيل القضية "),
    otherwise: (schema: any) => schema.notRequired(),
  }),

  case_arrival_date_at_police_station: Yup.date().nullable().when("case_situation", {
    is: "PUBLIC_PROSECUTION",
    then: (schema: any) => schema.required("تاريخ ورود القضية "),
    otherwise: (schema: any) => schema.notRequired(),
  }),

  case_sequence: Yup.string().when("case_situation", {
    is: "ACTIVE",
    then: (schema: any) => schema.required("الرقم الالي للقضية مطلوب"),
    otherwise: (schema: any) => schema.notRequired(),
  }),
  court_id: Yup.string().when("case_situation", {
    is: "ACTIVE",
    then: (schema: any) => schema.required("المحكمة مطلوبة"),
    otherwise: (schema: any) => schema.notRequired(),
  }),
  Current_court_degree: Yup.string().when("case_situation", {
    is: "ACTIVE",
    then: (schema: any) => schema.required("درجة التقاضي مطلوبة"),
    otherwise: (schema: any) => schema.notRequired(),
  }),

  Case_Arrival_Date_at_the_Authority: Yup.date().nullable().when("case_situation", {
    is: "OTHER",
    then: (schema: any) => schema.required("تاريخ ورود القضية مطلوب"),
    otherwise: (schema: any) => schema.notRequired(),
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



});