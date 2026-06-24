import * as Yup from "yup";

const opponentSchema = Yup.object({
  name: Yup.string().required("اسم الخصم مطلوب"),
  legal_status: Yup.string().required("صفة الخصم مطلوبة"),
  country_code: Yup.string().required("كود الدولة مطلوب"),
  phone: Yup.string()
    .required("رقم الهاتف مطلوب")
    .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
    .min(9, "رقم الهاتف يجب أن يكون 9 أرقام على الأقل")
    .max(14, "رقم الهاتف طويل جداً"),
  ssn: Yup.string()
    .required("الرقم القومي مطلوب")
    .matches(/^[0-9]+$/, "الرقم القومي يجب أن يحتوي على أرقام فقط")
    .min(14, "الرقم القومي يجب أن يكون 14 رقم")
    .max(14, "الرقم القومي يجب أن يكون 14 رقم"),
});

export const validationSchema = Yup.object({
  case_status_received: Yup.string(),
  case_title: Yup.string().required("عنوان القضية مطلوب"),
  client_id: Yup.string().required("اسم الموكل مطلوب"),
  case_type_id: Yup.string().required("نوع القضية مطلوب"),
  ClientStatus_id: Yup.string().required("صفة الموكل مطلوبة"),
  case_status_id: Yup.string().required("حالة القضية مطلوبة"),
  case_entry_date: Yup.date().required("تاريخ ورود القضية في المكتب مطلوب"),
  case_police_station_id: Yup.string().when("case_situation", {
    is: (value: string) =>
      value === "PUBLIC_PROSECUTION" || value === "POLICE_STATION",
    then: (schema: Yup.StringSchema) => schema.required("المخفر مطلوب"),
    otherwise: (schema: Yup.StringSchema) => schema.notRequired(),
  }),

  regestration_date_of_case_at_prosecution: Yup.date()
    .nullable()
    .when(
      "case_situation",
      (
        [caseSituation]: string[],
        schema: Yup.DateSchema<Date | null | undefined>,
      ) =>
        caseSituation === "PUBLIC_PROSECUTION"
          ? schema.required("تاريخ تسجيل القضية ")
          : schema.notRequired(),
    ),

  case_arrival_date_at_police_station: Yup.date().nullable().notRequired(),

  case_number_at_police_station: Yup.string().when("case_situation", {
    is: "POLICE_STATION",
    then: (schema: Yup.StringSchema) =>
      schema.required("رقم القضية في المخفر مطلوب"),
    otherwise: (schema: Yup.StringSchema) => schema.notRequired(),
  }),

  reference_number: Yup.string().when("case_situation", {
    is: "ACTIVE",
    then: (schema: Yup.StringSchema) =>
      schema.required("الرقم الالي للقضية مطلوب"),
    otherwise: (schema: Yup.StringSchema) => schema.notRequired(),
  }),
  court_id: Yup.string().when("case_situation", {
    is: "ACTIVE",
    then: (schema: Yup.StringSchema) => schema.required("المحكمة مطلوبة"),
    otherwise: (schema: Yup.StringSchema) => schema.notRequired(),
  }),
  Current_court_degree: Yup.string().when("case_situation", {
    is: "ACTIVE",
    then: (schema: Yup.StringSchema) => schema.required("درجة التقاضي مطلوبة"),
    otherwise: (schema: Yup.StringSchema) => schema.notRequired(),
  }),

  Case_Arrival_Date_at_the_Authority: Yup.date()
    .nullable()
    .when(
      "case_situation",
      (
        [caseSituation]: string[],
        schema: Yup.DateSchema<Date | null | undefined>,
      ) =>
        caseSituation === "OTHER"
          ? schema.required("تاريخ ورود القضية مطلوب")
          : schema.notRequired(),
    ),
  opponents: Yup.array().when("has_opponent", {
    is: true,
    then: (schema) =>
      schema.of(opponentSchema).min(1, "يجب إضافة خصم واحد على الأقل"),
    otherwise: (schema) => schema.notRequired(),
  }),

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
