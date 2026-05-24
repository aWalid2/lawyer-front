import { Formik, Form } from "formik";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { validationSchema } from "./ProfileValidation";

type ProfileFormValues = {
  firstName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  civilId: string;
  country: string;
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
      validationSchema={validationSchema}
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
                  readonly={!isEditing}
                />
                <InputForm
                  name="email"
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="أدخل البريد الإلكتروني"
                  readonly={!isEditing}
                />

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-8">
                    <InputForm
                      name="phoneNumber"
                      label="رقم الهاتف"
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
                      readonly={!isEditing}
                    />
                  </div>
                  <div className="col-span-4">
                    <SelectForm
                      disabled={!isEditing}
                      name="countryCode"
                      label="كود الدولة"
                      options={[
                        { value: "+966", label: "🇸🇦 +966" },
                        { value: "+971", label: "🇦🇪 +971" },
                        { value: "+974", label: "🇶🇦 +974" },
                        { value: "+965", label: "🇰🇼 +965" },
                        { value: "+973", label: "🇧🇭 +973" },
                        { value: "+968", label: "🇴🇲 +968" },
                        { value: "+20", label: "🇪🇬 +20" },
                        { value: "+962", label: "🇯🇴 +962" },
                        { value: "+961", label: "🇱🇧 +961" },
                      ]}
                    />
                  </div>
                </div>

                <InputForm
                  label="الرقم المدني"
                  name="civilId"
                  type="text"
                  placeholder="أدخل الرقم المدني"
                  readonly={!isEditing}
                />
                <InputForm
                  label="الدولة"
                  name="country"
                  type="text"
                  placeholder="أدخل الدولة"
                  readonly={!isEditing}
                />

                <InputForm
                  label="الجنسية"
                  name="nationality"
                  type="text"
                  placeholder="أدخل الجنسية"
                  readonly={!isEditing}
                />
                <InputForm
                  label="العنوان"
                  name="address"
                  type="text"
                  placeholder="أدخل العنوان"
                  readonly={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="mb-4">
                  <InputForm
                    label="كلمة المرور"
                    name="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                  />
                </div>
              )}

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
