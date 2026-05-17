import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import type { UserFormValues, UserT } from "../types/userT";

interface UserFormDialogProps {
  user?: UserT;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUserUpdated?: (values?: UserFormValues, userId?: number) => void;
  trigger?: React.ReactNode;
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
  user,
  open,
  onOpenChange,
  onUserUpdated,
  trigger,
}) => {
  const isEditMode = !!user;

  const initialValues: UserFormValues = {
    first_name: user?.first_name || user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    hire_date: user?.hire_date || user?.created_at || "",
    civil_id: user?.civil_id || "",
    role_name: user?.role?.role_name || "",
    password: user?.password || "",
    user_status: user?.user_status || "active",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("اسم المستخدم مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string().required("رقم التليفون مطلوب"),
    hire_date: Yup.string().required("تاريخ التعيين مطلوب"),
    civil_id: Yup.string().required("الرقم المدني مطلوب"),
    role_name: Yup.string().required("الدور مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
    user_status: Yup.string().required("الحالة مطلوبة"),
  });

  const handleSubmit = (values: UserFormValues) => {
    if (onUserUpdated) onUserUpdated(values, user?.id);
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-150 sm:rounded-[24px] sm:px-16 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {isEditMode ? "تعديل بيانات المستخدم" : "اضافة مستخدم جديد"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-6 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputForm
                  name="first_name"
                  label="اسم المستخدم"
                  type="text"
                  placeholder="محمد علي"
                />
                <InputForm
                  name="email"
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="mohalia7@gmail.com"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputForm
                  name="phone"
                  label="رقم التليفون"
                  type="text"
                  placeholder="97123456"
                  dir="ltr"
                />
                <InputForm name="hire_date" label="تاريخ التعيين" type="date" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputForm
                  name="civil_id"
                  label="الرقم المدني"
                  type="text"
                  placeholder="أدخل الرقم المدني"
                />
                <InputForm
                  name="password"
                  label="كلمة المرور"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectForm
                  name="role_name"
                  label="الدور"
                  options={[
                    { value: "محاسب", label: "محاسب" },
                    { value: "سكرتير", label: "سكرتير" },
                    { value: "مدير", label: "مدير" },
                  ]}
                />
                <SelectForm
                  name="user_status"
                  label="الحالة"
                  options={[
                    { value: "active", label: "نشط" },
                    { value: "inactive", label: "غير نشط" },
                  ]}
                />
              </div>

              <button
                type="submit"
                className="bg-primary-gradient rounded-main mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
              >
                {isEditMode ? "حفظ التغييرات" : "إضافة مستخدم"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
