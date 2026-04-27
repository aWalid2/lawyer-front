import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { CourtT } from "../types/courtTypes";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { useCreateCourt } from "../api/hooks/useCreateCourt";
import { useUpdateCourt } from "../api/hooks/useUpdateCourt";

interface CourtFormDialogProps {
  court?: CourtT;
  onSave: (values: { name: string; address: string }) => void;
  trigger: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم المحكمة مطلوب"),
  address: Yup.string().required("العنوان مطلوب"),
});

export const CourtFormDialog: React.FC<CourtFormDialogProps> = ({
  court,
  trigger,
}) => {
  const initialValues = {
    name: court?.name || "",
    address: court?.address || "",
  };
  const { mutateAsync: createCourt, isPending } = useCreateCourt();
  const { mutateAsync: updateCourt, isPending: isUpdating } = useUpdateCourt();
  const [open, setOpen] = React.useState(false);

  return (
    <LayoutDialog
      title={court ? "تعديل محكمة" : "اضافة محكمة جديدة"}
      trigger={trigger}
      size="lg"
      onOpenChange={setOpen}
      open={open}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (court) {
            await updateCourt({ id: Number(court.id), data: values });
          } else {
            await createCourt(values);
          }
          setOpen(false);
        }}
        enableReinitialize
      >
        {() => (
          <Form className="space-y-4 py-4">
            <InputForm
              label="اسم المحكمة"
              name="name"
              type="text"
              placeholder="محكمة الجيزة"
            />
            <InputForm
              label="العنوان"
              name="address"
              type="text"
              placeholder="شارع فؤاد"
            />
            <SubmitButton isPending={isPending || isUpdating}>
              {court ? "تعديل محكمة" : "إضافة محكمة"}
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
