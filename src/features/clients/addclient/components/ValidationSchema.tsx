import * as Yup from "yup";
import {
  civilIdValidationSchema,
  isValidCivilId,
  isValidPhoneNumber,
  phoneValidationSchema,
} from "@/shared/utils/validators";

export const validationSchema = Yup.object({
  first_name: Yup.string().required("اسم الموكل مطلوب"),
  email: Yup.string()
    .required("البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صالح"),
  ssn: civilIdValidationSchema().test(
    "client-ssn",
    "الرقم المدني يجب أن يكون من 12 إلى 14 رقماً",
    (value) => isValidCivilId(value),
  ),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  country: Yup.string().required("الدولة مطلوبة"),
  address: Yup.string().required("العنوان مطلوب"),
  countryCode: Yup.string().required("كود الدولة مطلوب"),
  phone: phoneValidationSchema("countryCode").test(
    "client-phone",
    "رقم الهاتف غير صحيح",
    function (value) {
      return isValidPhoneNumber(value, this.parent.countryCode);
    },
  ),
  client_type: Yup.string()
    .oneOf(
      ["individual", "company", "government"] as const,
      "نوع الموكل غير صالح",
    )
    .required("نوع الموكل مطلوب"),
  notes: Yup.string(),
  has_contract: Yup.boolean(),
  add_clients: Yup.boolean(),
  contract_start_date: Yup.string().when("has_contract", {
    is: true,
    then: (schema) => schema.required("تاريخ بداية العقد مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  contract_value: Yup.string().when("has_contract", {
    is: true,
    then: (schema) => schema.required("القيمة المتفق عليها مطلوبة"),
    otherwise: (schema) => schema.notRequired(),
  }),
  contract_duration: Yup.string().when("has_contract", {
    is: true,
    then: (schema) => schema.required("مدة العقد مطلوبة"),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: Yup.string().when("add_clients", {
    is: true,
    then: (schema) =>
      schema
        .required("كلمة المرور مطلوبة")
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    otherwise: (schema) => schema.notRequired(),
  }),
  confirmation_password: Yup.string().when(["password", "add_clients"], {
    is: (password: string | undefined, add_clients: boolean | undefined) =>
      add_clients === true && !!password && password.length > 0,
    then: (schema) =>
      schema
        .required("تأكيد كلمة المرور مطلوب")
        .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة"),
    otherwise: (schema) => schema.notRequired(),
  }),
  contract_photo: Yup.mixed().nullable(),
  authorization_photo: Yup.mixed().nullable(),
});
