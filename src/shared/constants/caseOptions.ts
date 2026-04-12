export const CASE_TITLE_OPTIONS = [
    { label: "مدعي", value: "plaintiff" },
    { label: "مدعي عليه", value: "defendant" },
    { label: "مستأنف", value: "appellant" },
    { label: "مستأنف ضده", value: "appellee" },
];

export const LITIGATION_LEVEL_OPTIONS = [
    { label: "أول درجة", value: "first_instance" },
    { label: "استئناف", value: "appeal" },
    { label: "نقض", value: "cassation" },
];

export const CASE_SITUATION_OPTIONS = [
    { value: "AT_PROSECUTOR_OFFICE", label: "في النيابة" },
    { value: "PUBLIC_PROSECUTION", label: "الادعاء العام" },
    { value: "UNDER_APPEAL", label: "تحت الرفع " },
    { value: "ACTIVE", label: "نشط" },
    { value: "OTHER", label: "أخرى" },
];
