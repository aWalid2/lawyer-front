import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";

export const phoneValidationSchema = (countryCodeFieldName: string = "country_code") => {
    return Yup.string()
        .required("رقم الهاتف مطلوب")
        .test("is-valid-phone", "رقم الهاتف غير صحيح", function (value) {
            const countryCode = this.parent[countryCodeFieldName];
            if (!value) return false;

            const country = COUNTRY_OPTIONS.find(opt => opt.value === countryCode);
            const iso = (country as any)?.iso;

            try {
                const phoneNumber = parsePhoneNumberFromString(value, iso);
                return phoneNumber?.isValid() || false;
            } catch {
                return false;
            }
        });
};

export const civilIdValidationSchema = () => {
    return Yup.string()
        .required("الرقم المدني مطلوب")
        .matches(/^\d{12,14}$/, "الرقم المدني يجب أن يكون من 12 إلى 14 رقماً");
};
