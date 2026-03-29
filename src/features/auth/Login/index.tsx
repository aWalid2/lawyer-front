import { InputForm } from '@/shared/components/InputForm';
import { Form, Formik } from 'formik';
import { useLogin } from './hooks/useLogin';
import * as yup from "yup";

const Login = () => {
  const validationSchema = yup.object({
    email: yup.string().email("البريد الالكتروني غير صحيح").required("البريد الالكتروني مطلوب"),
    password: yup.string().required("كلمة المرور مطلوبة").min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const { mutate: login } = useLogin();
  return (
    <div className="flex justify-center items-center h-screen bg-secondary bg-[url('/images/backgroundAuth.png')] bg-cover bg-center">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          login(values);
        }}
      >
        {() => (
          <Form className="space-y-4 max-w-md w-full shadow-lg bg-secondary/60 backdrop-blur-md p-10 rounded-main">
            <h1 className="text-2xl font-bold text-center text-white">تسجيل الدخول</h1>
            <InputForm name="email" label="البريد الالكتروني" type="text" labelColor="text-white!" />
            <InputForm
              name="password"
              label="كلمة المرور"
              type="password"
              labelColor="text-white!"
            />


            <button
              type="submit"
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity"
            >
              تسجيل الدخول
            </button>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login