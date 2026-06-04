import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import type { UserT } from "../types/userT";

interface UserResetPSWProps {
  user?: UserT;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUserUpdated?: () => void;
  trigger?: React.ReactNode;
}

export const UserResetPSW: React.FC<UserResetPSWProps> = ({
  user,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);

  const initialValues = {
    password: user?.password || "",
    new_password: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("كلمة المرور مطلوبة"),
    new_password: Yup.string().required("كلمة المرور الجديدة مطلوبة"),
  });

  const handleSubmit = () => {};

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
            إعادة تعيين كلمة المرور
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
              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="password"
                  label={"كلمة المرور الجديده"}
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                className="bg-primary-gradient rounded-main mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                تأكيد إعادة التعيين
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
