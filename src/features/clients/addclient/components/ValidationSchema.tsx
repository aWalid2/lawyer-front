import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  first_name: Yup.string().required("اسم الموكل مطلوب"),
  email: Yup.string().required("البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صالح"),
  ssn: Yup.string()
    .matches(/^[0-9]+$/, "الرقم المدني يجب أن يكون أرقام")
    .length(10, "الرقم المدني يجب أن يكون 10 أرقام"),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  country: Yup.string().required("الدولة مطلوبة"),
  address: Yup.string().required("العنوان مطلوب"),
  countryCode: Yup.string().required("كود الدولة مطلوب"),

  phone: Yup.string()
    .required("رقم الهاتف مطلوب")
    .test("is-valid-phone", "رقم الهاتف غير صحيح", function (value) {
      const { countryCode } = this.parent;
      if (!value) return false;

      const country = COUNTRY_OPTIONS.find(opt => opt.value === countryCode);
      const iso = (country as any)?.iso;

      try {
        const phoneNumber = parsePhoneNumberFromString(value, iso);
        return phoneNumber?.isValid() || false;
      } catch {
        return false;
      }
    }),

  client_type: Yup.string()
    .oneOf(["individual", "company", "government"] as const, "نوع الموكل غير صالح")
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
    then: (schema) => schema.required("كلمة المرور مطلوبة").min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    otherwise: (schema) => schema.notRequired(),
  }),

  confirmation_password: Yup.string().when(["password", "add_clients"], {
    is: (password: string | undefined, add_clients: boolean | undefined) =>
      add_clients === true && !!password && password.length > 0,
    then: (schema) => schema
      .required("تأكيد كلمة المرور مطلوب")
      .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة"),
    otherwise: (schema) => schema.notRequired(),
  }),

  contract_photo: Yup.mixed().nullable(),
  authorization_photo: Yup.mixed().nullable(),
});