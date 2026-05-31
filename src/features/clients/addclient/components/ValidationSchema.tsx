import * as Yup from "yup";
import type { FormValues } from "../types/addClientT";
import {
  civilIdValidationSchema,
  isValidCivilId,
  isValidPhoneNumber,
  phoneValidationSchema,
} from "@/shared/utils/validators";
import {
  CLIENT_STATUS_OPTIONS,
  CLIENT_TYPES_OPTIONS,
} from "@/shared/constants/clientOptions";

const validationFields = {
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
      CLIENT_TYPES_OPTIONS.map((option) => option.value),
      "نوع الموكل غير صالح",
    )
    .required("نوع الموكل مطلوب"),
  notes: Yup.string(),
  has_contract: Yup.boolean(),
  add_clients: Yup.boolean(),
  contract_start_date: Yup.string()
    .nullable()
    .when("has_contract", {
      is: true,
      then: (schema) => schema.required("تاريخ بداية العقد مطلوب"),
      otherwise: (schema) => schema.notRequired(),
    }),
  contract_value: Yup.string()
    .nullable()
    .when("has_contract", {
      is: true,
      then: (schema) => schema.required("القيمة المتفق عليها مطلوبة"),
      otherwise: (schema) => schema.notRequired(),
    }),
  contract_duration: Yup.string()
    .nullable()
    .when("has_contract", {
      is: true,
      then: (schema) => schema.required("مدة العقد مطلوبة"),
      otherwise: (schema) => schema.notRequired(),
    }),
  password: Yup.string()
    .nullable()
    .when("add_clients", {
      is: true,
      then: (schema) =>
        schema
          .required("كلمة المرور مطلوبة")
          .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
      otherwise: (schema) => schema.notRequired(),
    }),
  confirmation_password: Yup.string().nullable().when(["password", "add_clients"], {
    is: (password: string | undefined, add_clients: boolean | undefined) =>
      add_clients === true && !!password && password.length > 0,
    then: (schema) =>
      schema
        .required("تأكيد كلمة المرور مطلوب")
        .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة"),
    otherwise: (schema) => schema.notRequired(),
  }),
  user_status: Yup.string()
    .oneOf(
      CLIENT_STATUS_OPTIONS.map((option) => option.value),
      "حالة المستخدم غير صالحة",
    )
    .required("حالة المستخدم مطلوبة"),
  authorization_photo: Yup.string().nullable(),
  contract_file: Yup.string().nullable(),
} satisfies Record<keyof FormValues, Yup.AnySchema>;

export const validationSchema = Yup.object(validationFields);
