import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/components/shared/components/LayoutDialog";
import { InputForm } from "@/components/shared/components/InputForm";
import { Button } from "@/components/ui/button";
import type { RoleT } from "../types";

interface RoleFormDialogProps {
  role?: RoleT;
  onSave: (values: Partial<RoleT>) => void;
  trigger: React.ReactNode;
}

const RoleSchema = Yup.object().shape({
  name: Yup.string().required("اسم الدور مطلوب"),
});

export const RoleFormDialog: React.FC<RoleFormDialogProps> = ({
  role,
  onSave,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <LayoutDialog
      open={open}
      onOpenChange={setOpen}
      title={role ? "تعديل دور" : "إضافة دور جديد"}
      trigger={trigger}
    >
      <Formik
        initialValues={{
          name: role?.name || "",
        }}
        validationSchema={RoleSchema}
        onSubmit={(values) => {
          onSave(values);
          setOpen(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <InputForm
              type="text"
              name="name"
              label="اسم الدور"
              placeholder="أدخل اسم الدور"
            />

            <div className="flex justify-end gap-3 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-main h-12 px-6"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold hover:bg-gold/90 text-white rounded-main h-12 px-8"
              >
                {role ? "تعديل الدور" : "إضافة دور جديد"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
