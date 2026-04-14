import * as Yup from "yup";


export const validationSchema = Yup.object({
  case_number_at_Presecution: Yup.string().required("رقم القضية في النيابة مطلوب"),
  prosecution_id: Yup.number().required("اسم النيابة مطلوب"),
  case_regestration_date_at_presecution: Yup.string().required("تاريخ تسجيل القضية في النيابة مطلوب"),
});