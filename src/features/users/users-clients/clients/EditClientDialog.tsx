import React from "react";
import { Formik, Form } from "formik";
import { InputForm } from "@/shared/components/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { SelectForm } from "@/shared/components/SelectForm";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { useUpdateClient } from "../api/hooks/useUpdateClients";
import {
  civilIdValidationSchema,
  countryValidationSchema,
  phoneValidationSchema,
} from "@/shared/utils/validators";

type ClientType = "individual" | "company" | "government";

interface EditableClient {
  user_id: string;
  client_type?: ClientType;
  authorization_photo?: string | File | FileList | null;
  user?: {
    first_name?: string;
    last_name?: string;
    ssn?: string;
    phone?: string;
    email?: string;
    nationality?: string;
    country?: string;
    address?: string;
    notes?: string;
    user_status?: string;
  };
}

interface EditClientFormValues {
  client_type: ClientType;
  first_name: string;
  ssn: string;
  phone: string;
  country_code: string;
  email: string;
  authorization_photo: string | File | FileList | null;
  nationality: string;
  country: string;
  address: string;
  notes: string;
  user_status: string;
}

interface EditClientDialogProps {
  client: EditableClient;
  trigger: React.ReactNode;
  onSave?: (client: EditClientFormValues) => void;
}

export const EditClientDialog: React.FC<EditClientDialogProps> = ({
  client,
  trigger,
  onSave,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: updateClient, isPending } = useUpdateClient();

  const phoneData = client?.user?.phone
    ? parsePhoneNumberFromString(client.user.phone)
    : null;

  const initialValues: EditClientFormValues = {
    client_type: client?.client_type || "individual",
    first_name: client?.user?.first_name || "",
    ssn: client?.user?.ssn || "",
    phone: phoneData ? phoneData.nationalNumber : client?.user?.phone || "",
    country_code: phoneData ? `+${phoneData.countryCallingCode}` : "+966",
    email: client?.user?.email || "",
    authorization_photo: client?.authorization_photo || null,
    nationality: client?.user?.nationality || "",
    country: client?.user?.country || "",
    address: client?.user?.address || "",
    notes: client?.user?.notes || "",
    user_status: client?.user?.user_status || "",
  };

  const validationSchema = Yup.object().shape({
    client_type: Yup.string().required("نوع الموكل مطلوب"),
    first_name: Yup.string(),
    ssn: civilIdValidationSchema(),
    phone: phoneValidationSchema("country_code"),
    country_code: Yup.string().required("كود الدولة مطلوب"),
    email: Yup.string().email("البريد الإلكتروني غير صالح"),
    nationality: Yup.string().nullable(),
    country: countryValidationSchema(),
    address: Yup.string().nullable(),
    authorization_photo: Yup.mixed().nullable(),
    user_status: Yup.string().required("حالة المستخدم مطلوبة"),
  });

  return (
    <LayoutDialog
      title="تعديل بيانات الموكل"
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      size="lg"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const country = COUNTRY_OPTIONS.find(
              (opt) => opt.value === values.country_code,
            );
            const iso = country?.iso as CountryCode | undefined;
            const phoneNumber = parsePhoneNumberFromString(values.phone, iso);

            const formattedValues: EditClientFormValues = {
              ...values,
              phone: phoneNumber
                ? phoneNumber.format("E.164")
                : `${values.country_code}${values.phone}`,
            };
            await updateClient({
              id: client.user_id,
              data: formattedValues,
            });
            onSave?.(formattedValues);
            setOpen(false);
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectForm
                name="client_type"
                label="نوع الموكل"
                options={[
                  { value: "individual", label: "فرد" },
                  { value: "company", label: "شركة" },
                  { value: "government", label: "جهة حكومية" },
                ]}
                showSearch={true}
              />

              <InputForm
                name="first_name"
                label="الاسم"
                type="text"
                placeholder="أدخل الاسم كاملاً"
              />
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputForm
                name="ssn"
                label="الرقم المدني"
                type="text"
                placeholder="أدخل الرقم المدني"
              />

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-8">
                  <InputForm
                    name="phone"
                    label="رقم الهاتف"
                    type="tel"
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>
                <div className="col-span-4">
                  <SelectForm
                    name="country_code"
                    label="كود الدولة"
                    showSearch={true}
                    options={COUNTRY_OPTIONS}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputForm
                name="email"
                label="البريد الإلكتروني"
                type="email"
                placeholder="example@domain.com"
              />

              <InputForm
                name="nationality"
                label="الجنسية"
                type="text"
                placeholder="أدخل الجنسية"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputForm
                name="country"
                label="الدولة"
                type="text"
                placeholder="أدخل الدولة"
              />

              <InputForm
                name="address"
                label="العنوان"
                type="text"
                placeholder="أدخل العنوان بالتفصيل"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectForm
                name="user_status"
                label="حالة المستخدم"
                placeholder="أدخل حالة المستخدم"
                options={[
                  { value: "active", label: "نشط" },
                  { value: "inactive", label: "غير نشط" },
                ]}
              />
            </div>

            <div className="mb-16 h-24.75 w-30.25">
              <FileUpload name="authorization_photo" label="صورة التوكيل" />
            </div>

            <SubmitButton
              isPending={isPending}
              loadingText="جاري التعديل..."
              className="mt-6"
            >
              حفظ التغييرات
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
