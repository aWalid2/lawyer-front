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
import { useAddUser } from "../api/hooks/useAddUser";
import { useUpdateUser } from "../api/hooks/useUpdateUser";
import { toast } from "sonner";
import type { RoleT } from "../types/addUserRequest";
import { useGetAllRoles } from "../../permissions/api";

interface UserFormDialogProps {
  user?: UserT;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUserUpdated?: () => void;
  trigger?: React.ReactNode;
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
  user,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);
  const isEditMode = !!user;

  const { data: rolesData } = useGetAllRoles(open);

  const { mutate: addUser, isPending: isAddingUser } = useAddUser();
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  const roleOptions = React.useMemo(() => {
    if (!rolesData) return [];
    return rolesData.map((role: RoleT) => ({
      value: role.id.toString(),
      label: role.role_name,
    }));
  }, [rolesData]);

  const initialValues: UserFormValues = {
    first_name: user?.first_name || user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    hire_date: user?.hire_date || user?.created_at || "",
    ssn: user?.ssn || "",
    role_name: user?.role_id?.toString() || "",
    role_id: user?.role_id,
    password: user?.password || "",
    address: user?.address || "",
    nationality: user?.nationality || "",
    user_status: user?.user_status || "active",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("اسم المستخدم مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string().required("رقم التليفون مطلوب"),
    hire_date: Yup.string().required("تاريخ التعيين مطلوب"),

    ssn: !isEditMode
      ? Yup.string().required("الرقم المدني مطلوب")
      : Yup.string(),
    role_name: Yup.string().required("الدور مطلوب"),
    password: !isEditMode
      ? Yup.string().required("كلمة المرور مطلوبة")
      : Yup.string(),
    user_status: Yup.string().required("الحالة مطلوبة"),
  });

  const handleSubmit = (values: UserFormValues) => {
    if (isEditMode && user?.id) {
      updateUser(
        {
          employeeId: user.id,
          userData: {
            nationality: values.nationality,
            address: values.address,
            first_name: values.first_name,
            email: values.email,
            phone: values.phone,
            hire_date: values.hire_date,
            ssn: values.ssn,
            role: values.role_id || parseInt(values.role_name),
            status: values.user_status === "active" ? "ACTIVE" : "INACTIVE",
            // password: values.password || undefined,
          },
        },
        {
          onSuccess: () => {
            toast.success("تم تحديث المستخدم بنجاح");
            setOpen(false);
          },
          onError: (error: unknown) => {
            const err = error as Record<string, unknown>;
            const message =
              ((err?.response as Record<string, unknown>)?.data as Record<
                string,
                unknown
              >) || {};
            const errorMessage =
              (message?.message as string) || "حدث خطأ أثناء تحديث المستخدم";
            toast.error(errorMessage);
          },
        },
      );
    } else {
      addUser(
        {
          nationality: values.nationality || "",
          address: values.address || "",
          username: values.first_name,
          email: values.email,
          phone: values.phone,
          ssn: values.ssn || "",
          password: values.password,
          role: values.role_id || parseInt(values.role_name),
          status: values.user_status === "active" ? "ACTIVE" : "INACTIVE",
          hire_date: values.hire_date,
        },
        {
          onSuccess: () => {
            toast.success("تم إضافة المستخدم بنجاح");
            setOpen(false);
          },
          onError: (error: unknown) => {
            const err = error as Record<string, unknown>;
            const message =
              ((err?.response as Record<string, unknown>)?.data as Record<
                string,
                unknown
              >) || {};
            const errorMessage =
              (message?.message as string) || "حدث خطأ أثناء إضافة المستخدم";
            toast.error(errorMessage);
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

                <InputForm
                  name="phone"
                  label="رقم التليفون"
                  type="text"
                  placeholder="97123456"
                  dir="ltr"
                />
                <InputForm name="hire_date" label="تاريخ التعيين" type="date" />

                <InputForm
                  name="ssn"
                  label="الرقم المدني"
                  type="text"
                  placeholder="أدخل الرقم المدني"
                />
                <InputForm
                  name="nationality"
                  label="الجنسية"
                  type="text"
                  placeholder="أدخل الجنسية"
                />
                <InputForm
                  name="address"
                  label="العنوان"
                  type="text"
                  placeholder="أدخل العنوان"
                />

                <InputForm
                  name="password"
                  label={
                    isEditMode
                      ? "كلمة المرور (اتركها فارغة إذا لم تغيرها)"
                      : "كلمة المرور"
                  }
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  dir="ltr"
                />

                <SelectForm
                  name="role_name"
                  label="الدور"
                  options={roleOptions}
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
                disabled={isAddingUser || isUpdatingUser}
                className="bg-primary-gradient rounded-main mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAddingUser || isUpdatingUser
                  ? "جاري المعالجة..."
                  : isEditMode
                    ? "حفظ التغييرات"
                    : "إضافة مستخدم"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
