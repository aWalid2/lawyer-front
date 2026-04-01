import * as Yup from "yup";

export const validationSchema = Yup.object({
  caseStatus: Yup.string(),
  caseTitle: Yup.string().required("عنوان القضية مطلوب"),
  clientId: Yup.string().required("اسم الموكل مطلوب"),
  caseType: Yup.string().required("وضع القضية مطلوب"),
  clientType: Yup.string().required("صفة الموكل مطلوبة"),
  caseStatusReceived: Yup.string(),
  policeStation: Yup.string(),
  numberInPoliceStation: Yup.string(),
  dateInPoliceStation: Yup.date().nullable(),
  investigatorName: Yup.string(),
  investigativeAuthority: Yup.string(),
  dateInProsecution: Yup.date().nullable(),
  dateInOffice: Yup.date().nullable(),
  caseReceiptDate: Yup.date().nullable(),

  firstName: Yup.string(),
  secondName: Yup.string(),
  legalStatus: Yup.string(),

  countryCode: Yup.string().required("كود الدولة مطلوب"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
    .min(9, "رقم الهاتف يجب أن يكون 9 أرقام على الأقل")
    .max(14, "رقم الهاتف طويل جداً"),

  civilId: Yup.string()
    .matches(/^[0-9]+$/, "الرقم القومي يجب أن يحتوي على أرقام فقط")
    .min(14, "الرقم القومي يجب أن يكون 14 رقم")
    .max(14, "الرقم القومي يجب أن يكون 14 رقم"),

  nationality: Yup.string(),
  country: Yup.string(),
  address: Yup.string(),
  email: Yup.string().email("البريد الإلكتروني غير صحيح"),

  fixedFees: Yup.number()
    .positive("يجب أن يكون رقماً موجباً")
    .when('feeType', {
      is: 'fixed',
      then: (schema) => schema.required("الأتعاب الثابتة مطلوبة"),
      otherwise: (schema) => schema.notRequired(),
    }),

  profitPercentage: Yup.number()
    .positive("يجب أن يكون رقماً موجباً")
    .max(100, "النسبة يجب أن تكون أقل من أو تساوي 100")
    .when('feeType', {
      is: 'profit',
      then: (schema) => schema.required("نسبة الأرباح مطلوبة"),
      otherwise: (schema) => schema.notRequired(),
    }),

  contractStartDate: Yup.date().nullable(),
  contractValue: Yup.string(),
  contractDuration: Yup.string(),
  contractImage: Yup.mixed().nullable(),
  powerOfAttorneyImage: Yup.mixed().nullable(),
  notes: Yup.string(),

});