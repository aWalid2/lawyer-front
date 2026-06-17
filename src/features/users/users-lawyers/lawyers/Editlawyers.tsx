import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff, XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import * as Yup from "yup";
import { useUpdateLawyer } from "../api/hooks/useLawyersUpdate";
import { useAddLawyer } from "../api/hooks/useLawyers";
import type { Lawyer } from "../lawyers/types";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";
import parsePhoneNumberFromString from "libphonenumber-js";

interface EditLawyersProps {
  lawyer?: Lawyer;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLawyerUpdated?: () => void;
}

export const Editlawyers: React.FC<EditLawyersProps> = ({
  lawyer,
  open,
  onOpenChange,
  onLawyerUpdated,
}) => {
  const isEditMode = !!lawyer;
  const [showPassword, setShowPassword] = useState(false);
  const phoneData = lawyer?.user?.phone
    ? parsePhoneNumberFromString(lawyer.user.phone)
    : null;

  const initialValues = {
    first_name: lawyer?.user?.first_name || "",
    phone: phoneData ? phoneData.nationalNumber : lawyer?.user?.phone || "",
    countryCode: phoneData ? `+${phoneData.countryCallingCode}` : "+966",
    email: lawyer?.user?.email || "",
    specialization: lawyer?.specialization || "",
    license_number: lawyer?.license_number || "",
    password: "",
    nationality: "",
    country: "",
    address: "",
    role: "lawyer",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("اسم المحامي مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .test("is-valid-phone", "رقم الهاتف غير صحيح", function (value) {
        const { countryCode } = this.parent;
        if (!value) return false;

        const country = COUNTRY_OPTIONS.find(
          (opt) => opt.value === countryCode,
        );
        const iso = (country as any)?.iso;

        try {
          const phoneNumber = parsePhoneNumberFromString(value, iso);
          return phoneNumber?.isValid() || false;
        } catch {
          return false;
        }
      }),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    specialization: Yup.string().required("التخصص مطلوب"),
    license_number: Yup.string(),
    password: !isEditMode
      ? Yup.string()
          .required("كلمة المرور مطلوبة")
          .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      : Yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    nationality: Yup.string(),
    country: Yup.string(),
    address: Yup.string(),
  });

  const { mutateAsync: updateLawyer, isPending: isUpdating } =
    useUpdateLawyer();
  const { mutateAsync: addLawyer, isPending: isAdding } = useAddLawyer();

  const isLoading = isEditMode ? isUpdating : isAdding;

  const handleSubmit = async (values: typeof initialValues) => {
    if (isEditMode && lawyer?.user_id) {
      await updateLawyer({
        id: lawyer.user_id.toString(),
        data: {
          first_name: values.first_name,
          email: values.email,
          phone: values.phone
            ? `${values.countryCode}${values.phone}`
            : undefined,
          nationality: values.nationality,
          password: values.password || undefined,
          country: values.country,
          address: values.address,
          license_number: values.license_number,
          specialization: values.specialization,
          role: values.role,
        },
      });
    } else {
      await addLawyer({
        ...values,
        phone: values.phone
          ? `${values.countryCode}${values.phone}`
          : undefined,
      });
    }
    onLawyerUpdated?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-[12px] border-none px-6 py-6 sm:max-w-[715px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-[12px] px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {isEditMode ? "تعديل بيانات المحامي" : "إضافة محامي جديد"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="first_name"
                  label="اسم المحامي"
                  type="text"
                  placeholder="أدخل اسم المحامي كاملاً"
                />

                <InputForm
                  name="specialization"
                  label="التخصص"
                  type="text"
                  placeholder="أدخل التخصص"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-7">
                    <InputForm
                      name="phone"
                      label="رقم الهاتف"
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
                    />
                  </div>
                  <div className="col-span-5">
                    <SelectForm
                      name="countryCode"
                      label="كود الدولة"
                      options={COUNTRY_OPTIONS}
                      showSearch={true}
                    />
                  </div>
                </div>

                <InputForm
                  name="email"
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="example@domain.com"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="license_number"
                  label="رقم الترخيص"
                  type="text"
                  placeholder="أدخل رقم الترخيص"
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

              <div className="relative">
                <InputForm
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="كلمة المرور"
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  className="absolute top-[60px] left-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></span>
                    {isEditMode ? "جاري الحفظ..." : "جاري الإضافة..."}
                  </span>
                ) : isEditMode ? (
                  "حفظ التغييرات"
                ) : (
                  "إضافة محامي"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
