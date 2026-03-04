import * as Yup from "yup";


export const validationSchema = Yup.object({
  caseNumberInProsecution: Yup.string().required("رقم القضية في النيابة مطلوب"),
  prosecutionName: Yup.string().required("اسم النيابة مطلوب"),
  prosecutionRegistrationDate: Yup.string().required("تاريخ تسجيل القضية في النيابة مطلوب"),
  policeStation: Yup.string().required("المخفر التابع له القضية مطلوب"),
});