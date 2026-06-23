import { Formik, Form } from "formik";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { validationSchema } from "./ProfileValidation";

type ProfileFormValues = {
  firstName: string;
  email: string;
  phoneNumber: string;
  civilId: string;
  nationality: string;
  address: string;
  password: string;
};

interface ProfileFormProps {
  onSubmit: (values: ProfileFormValues) => void | Promise<void>;
  initialValues: ProfileFormValues;
  isEditing: boolean;
  isSubmitting: boolean;
  onStartEdit: () => void;
}

const ProfileForm = ({
  onSubmit,
  initialValues,
  isEditing,
  isSubmitting,
  onStartEdit,
}: ProfileFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validateOnBlur={isEditing}
      validateOnChange={isEditing}
      validationSchema={isEditing ? validationSchema : undefined}
      onSubmit={async (values) => {
        if (!isEditing) {
          return;
        }

        await onSubmit(values);
      }}
    >
      {() => (
        <>
          <Form>
            <div className="flex-1">
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  label="الاسم "
                  name="firstName"
                  type="text"
                  placeholder="أدخل الاسم "
                  disabled={!isEditing}
                />
                <InputForm
                  name="email"
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="أدخل البريد الإلكتروني"
                  disabled={!isEditing}
                />

                <InputForm
                  name="phoneNumber"
                  label="رقم الهاتف"
                  type="tel"
                  placeholder="أدخل رقم الهاتف"
                  disabled={!isEditing}
                />

                <InputForm
                  label="الرقم المدني"
                  name="civilId"
                  type="text"
                  placeholder="أدخل الرقم المدني"
                  disabled={!isEditing}
                />

                <InputForm
                  label="الجنسية"
                  name="nationality"
                  type="text"
                  placeholder="أدخل الجنسية"
                  disabled={!isEditing}
                />
                <InputForm
                  label="العنوان"
                  name="address"
                  type="text"
                  placeholder="أدخل العنوان"
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-start">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12.5 w-60.25 rounded-lg bg-[#CBA462] px-6 py-2 text-white transition-colors hover:bg-[#E3C086] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
                  </button>
                </div>
              )}
            </div>
          </Form>

          {!isEditing && (
            <div className="mt-6 flex justify-start">
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  onStartEdit();
                }}
                className="h-12.5 w-60.25 rounded-lg bg-[#CBA462] px-6 py-2 text-white transition-colors hover:bg-[#E3C086] disabled:cursor-not-allowed disabled:opacity-70"
              >
                تعديل البيانات
              </button>
            </div>
          )}
        </>
      )}
    </Formik>
  );
};

export default ProfileForm;
