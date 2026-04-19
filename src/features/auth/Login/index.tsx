import { InputForm } from '@/shared/components/InputForm';
import { Form, Formik } from 'formik';
import { useLogin } from './api/hooks/useLogin';

import useCustomLogin from './hooks/useCustomlogin';
import { SubmitButton } from '@/shared/components/SubmitButton';

const Login = () => {
  const { initialValues, validationSchema } = useCustomLogin();
  const { mutate: login, isPending } = useLogin();

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


            <SubmitButton isPending={isPending} loadingText='جاري تسجيل الدخول...'>تسجيل الدخول</SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login