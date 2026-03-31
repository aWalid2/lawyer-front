import * as yup from "yup";

export default function useCustomLogin(){
      const validationSchema = yup.object({
        email: yup.string().email("البريد الالكتروني غير صحيح").required("البريد الالكتروني مطلوب"),
        password: yup.string().required("كلمة المرور مطلوبة").min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
      });
    
      const initialValues = {
        email: "",
        password: "",
      };
    return{validationSchema, initialValues}
}