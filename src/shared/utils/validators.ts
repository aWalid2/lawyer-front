import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";

const CIVIL_ID_REGEX = /^\d{12,14}$/;

export const isValidCivilId = (value?: string | null) => {
    if (!value) {
        return false;
    }

    return CIVIL_ID_REGEX.test(value.trim());
};

export const formatPhoneNumber = (
    value?: string | null,
    countryCode?: string | null,
) => {
    if (!value) {
        return null;
    }

    const country = COUNTRY_OPTIONS.find((option) => option.value === countryCode);
    const iso = (country as { iso?: string } | undefined)?.iso;

    try {
        const phoneNumber = iso
            ? parsePhoneNumberFromString(value, iso)
            : parsePhoneNumberFromString(value);

        if (phoneNumber?.isValid()) {
            return phoneNumber.format("E.164");
        }
    } catch {
        return null;
    }

    try {
        const fallbackPhoneNumber = parsePhoneNumberFromString(value);
        if (fallbackPhoneNumber?.isValid()) {
            return fallbackPhoneNumber.format("E.164");
        }
    } catch {
        return null;
    }

    return null;
};

export const isValidPhoneNumber = (
    value?: string | null,
    countryCode?: string | null,
) => Boolean(formatPhoneNumber(value, countryCode));

export const phoneValidationSchema = (countryCodeFieldName: string = "country_code") => {
    return Yup.string()
        .required("رقم الهاتف مطلوب")
        .test("is-valid-phone", "رقم الهاتف غير صحيح", function (value) {
            const countryCode = this.parent[countryCodeFieldName];
            return isValidPhoneNumber(value, countryCode);
        });
};

export const civilIdValidationSchema = () => {
    return Yup.string()
        .required("الرقم المدني مطلوب")
        .test(
            "is-valid-civil-id",
            "الرقم المدني يجب أن يكون من 12 إلى 14 رقماً",
            (value) => isValidCivilId(value),
        );
};
