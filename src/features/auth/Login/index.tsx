import { InputForm } from "@/shared/components/inputs/InputForm";
import { Form, Formik } from "formik";
import { useLogin } from "./api/hooks/useLogin";

import useCustomLogin from "./hooks/useCustomlogin";
import { SubmitButton } from "@/shared/components/buttons/SubmitButton";

const Login = () => {
  const { initialValues, validationSchema } = useCustomLogin();
  const { mutate: login, isPending } = useLogin();

  return (
    <div className="bg-secondary flex h-screen items-center justify-center bg-[url('/images/backgroundAuth.png')] bg-cover bg-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          login(values);
        }}
      >
        {() => (
          <Form className="bg-secondary/60 rounded-main w-full max-w-md space-y-4 p-10 shadow-lg backdrop-blur-md">
            <h1 className="text-center text-2xl font-bold text-white">
              تسجيل الدخول
            </h1>
            <InputForm
              name="email"
              label="البريد الالكتروني"
              type="text"
              labelColor="text-white!"
            />
            <InputForm
              name="password"
              label="كلمة المرور"
              type="password"
              labelColor="text-white!"
            />

            <SubmitButton
              isPending={isPending}
              loadingText="جاري تسجيل الدخول..."
            >
              تسجيل الدخول
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
