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
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import type { UserT } from "../userT";

interface UserFormDialogProps {
  user?: UserT;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUserUpdated?: () => void;
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

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    userType: user?.userType || "محامي",
    role: user?.role || "",
    notes: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم المستخدم مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    userType: Yup.string().required("نوع المستخدم مطلوب"),
    role: Yup.string().required("الدور مطلوب"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(isEditMode ? "تحديث المستخدم:" : "إضافة مستخدم جديد:", values);
    if (onUserUpdated) onUserUpdated();
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-[600px] sm:rounded-[24px] sm:px-16 sm:py-10"
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
              <InputForm
                name="name"
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

              <div className="grid grid-cols-2 gap-4">
                <SelectForm
                  name="userType"
                  label="نوع المستخدم"
                  options={[
                    { value: "محامي", label: "محامي" },
                    { value: "موظف", label: "موظف" },
                    { value: "موكل", label: "موكل" },
                  ]}
                />
                <SelectForm
                  name="role"
                  label="الدور"
                  options={[
                    { value: "محاسب", label: "محاسب" },
                    { value: "سكرتير", label: "سكرتير" },
                    { value: "مدير", label: "مدير" },
                  ]}
                />
              </div>

              <TextAreaForm name="notes" label="ملاحظات" placeholder="..." />

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
