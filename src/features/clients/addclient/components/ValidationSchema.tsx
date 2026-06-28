import * as Yup from "yup";
import type { FormValues } from "../types/addClientT";
import {
  civilIdValidationSchema,
  isValidCivilId,
  isValidPhoneNumber,
  phoneValidationSchema,
} from "@/shared/utils/validators";
import { CLIENT_TYPES_OPTIONS } from "@/shared/constants/clientOptions";

const validationFields = {
  first_name: Yup.string().required("اسم الموكل مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الالكتروني مطلوب"),
  ssn: civilIdValidationSchema().test(
    "client-ssn",
    "الرقم المدني يجب أن يكون من 12",
    (value) => isValidCivilId(value),
  ),
  nationality: Yup.string(),
  country: Yup.string(),
  address: Yup.string(),
  countryCode: Yup.string().required("كود الدولة مطلوب"),
  phone: phoneValidationSchema("countryCode").test(
    "client-phone",
    "رقم الهاتف غير صحيح",
    function (value) {
      return isValidPhoneNumber(value, this.parent.countryCode);
    },
  ),
  client_type: Yup.string().oneOf(
    CLIENT_TYPES_OPTIONS.map((option) => option.value),
    "نوع الموكل غير صالح",
  ),
  notes: Yup.string(),
  has_contract: Yup.boolean(),
  contracts: Yup.array()
    .of(
      Yup.object({
        contract_start_date: Yup.string().required("تاريخ بداية العقد مطلوب"),
        contract_value: Yup.string().required("القيمة المتفق عليها مطلوبة"),
        contract_duration: Yup.string().required("مدة العقد مطلوبة"),
        contract_file: Yup.mixed().nullable(),
      }),
    )
    .when("has_contract", {
      is: true,
      then: (schema) => schema.min(1, "يجب إضافة عقد واحد على الأقل"),
      otherwise: (schema) => schema.notRequired(),
    }),
  add_clients: Yup.boolean(),
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
  confirmation_password: Yup.string()
    .nullable()
    .when(["password", "add_clients"], {
      is: (password: string | undefined, add_clients: boolean | undefined) =>
        add_clients === true && !!password && password.length > 0,
      then: (schema) =>
        schema
          .required("تأكيد كلمة المرور مطلوب")
          .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة"),
      otherwise: (schema) => schema.notRequired(),
    }),
  user_status: Yup.string().notRequired(),
  civil_id_photo: Yup.mixed().nullable().notRequired(),
  expired_civil_id: Yup.string().notRequired(),
  authorization_photo: Yup.string().nullable(),
} satisfies Record<keyof FormValues, Yup.AnySchema>;

export const validationSchema = Yup.object(validationFields);
