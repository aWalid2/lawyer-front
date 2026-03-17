import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/components/shared/components/InputForm";
import { SelectForm } from "@/components/shared/components/SelectForm";
import { TextAreaForm } from "@/components/shared/components/TextAreaForm";
import type { UserT } from "../types";

interface UserFormDialogProps {
  user?: UserT;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUserUpdated?: () => void;
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
  user,
  open,
  onOpenChange,
  onUserUpdated,
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
    email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
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
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden sm:px-16 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
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
            <Form className="space-y-6 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
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

              <TextAreaForm
                name="notes"
                label="ملاحظات"
                placeholder="..."
              />

              <button
                type="submit"
                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity"
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
