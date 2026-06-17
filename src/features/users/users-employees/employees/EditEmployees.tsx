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
import type { Employee } from "./types";
import * as Yup from "yup";
import { useAddEmployee } from "./api/hooks/useAddEmployee";
import { useUpdateEmployee } from "./api/hooks/useUpdateEmployee";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";
import parsePhoneNumberFromString from "libphonenumber-js";

interface EditemployeesProps {
  employee?: Employee;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onEmployeeUpdated?: () => void;
}

export const Editemployees: React.FC<EditemployeesProps> = ({
  employee,
  open,
  onOpenChange,
  onEmployeeUpdated,
}) => {
  const isEditMode = !!employee;
  const [showPassword, setShowPassword] = useState(false);
  const phoneData = employee?.user?.phone
    ? parsePhoneNumberFromString(employee.user.phone)
    : null;

  const initialValues = {
    first_name: employee?.user?.first_name || "",
    phone: phoneData ? phoneData.nationalNumber : employee?.user?.phone || "",
    countryCode: phoneData ? `+${phoneData.countryCallingCode}` : "+966",
    email: employee?.user?.email || "",
    password: "",
    position: employee?.position || "",
    notes: employee?.profile?.notes || "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("اسم الموظف مطلوب"),
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
    countryCode: Yup.string().required("كود الدولة مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: !isEditMode
      ? Yup.string()
          .required("كلمة المرور مطلوبة")
          .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      : Yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    position: Yup.string().required("الوظيفة مطلوبة"),
    notes: Yup.string(),
  });

  const { mutate: addEmployee, isPending: isAdding } = useAddEmployee();
  const { mutate: updateEmployee, isPending: isUpdating } = useUpdateEmployee();
  const isLoading = isEditMode ? isUpdating : isAdding;

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: any,
  ) => {
    const submitData: any = {
      first_name: values.first_name,
      phone: `${values.countryCode}${values.phone}`,
      email: values.email,
      role: "employee",
      position: values.position,
      notes: values.notes,
    };
    if (!isEditMode) {
      submitData.password = values.password;
    } else if (values.password) {
      submitData.password = values.password;
    }

    if (isEditMode && employee?.user_id) {
      // تعديل موظف
      updateEmployee(
        {
          id: employee.user_id.toString(),
          data: submitData,
        },
        {
          onSuccess: () => {
            onEmployeeUpdated?.();
            onOpenChange?.(false);
            setSubmitting(false);
          },
          onError: () => {
            setSubmitting(false);
          },
        },
      );
    } else {
      // إضافة موظف جديد
      addEmployee(submitData, {
        onSuccess: () => {
          onEmployeeUpdated?.();
          onOpenChange?.(false);
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-[12px] border-none px-6 py-6 sm:max-w-[600px] sm:rounded-[24px] sm:px-16 sm:py-10"
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
            {isEditMode ? "تعديل بيانات الموظف" : "إضافة موظف جديد"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="custom-scrollbar flex-1 space-y-6 overflow-y-auto pb-2 pl-2">
              <InputForm
                name="first_name"
                label="اسم الموظف"
                type="text"
                placeholder="أدخل اسم الموظف كاملاً"
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
                    name="countryCode"
                    label="كود الدولة"
                    options={COUNTRY_OPTIONS}
                  />
                </div>
              </div>

              <InputForm
                name="email"
                label="البريد الإلكتروني"
                type="email"
                placeholder="example@domain.com"
              />

              <InputForm
                name="position"
                label="الوظيفة"
                type="text"
                placeholder="أدخل المسمى الوظيفي"
              />

              <InputForm
                name="notes"
                label="ملاحظات"
                type="text"
                placeholder="أي ملاحظات إضافية..."
              />

              <div className="relative">
                <InputForm
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  label={isEditMode ? "كلمة المرور" : "كلمة المرور"}
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
                disabled={isLoading || isSubmitting}
                className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading || isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></span>
                    {isEditMode ? "جاري الحفظ..." : "جاري الإضافة..."}
                  </span>
                ) : isEditMode ? (
                  "حفظ التغييرات"
                ) : (
                  "إضافة موظف"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
