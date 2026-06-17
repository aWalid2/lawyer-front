import { InputForm } from "@/shared/components/inputs/InputForm";
import { LayoutDialog } from "@/shared/components/dialogs/LayoutDialog";
import { SubmitButton } from "@/shared/components/buttons/SubmitButton";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import type { ClientStatusT } from "../types/clientStatusT";
import { useCreateClientStatus } from "../api/hooks/useCreateClientStatus";
import { useUpdateClientStatus } from "../api/hooks/useUpdateClientStatus";

interface ClientStatusFormDialogProps {
  clientStatus?: ClientStatusT;
  trigger: React.ReactNode;
}

const ClientStatusSchema = Yup.object().shape({
  name: Yup.string().required("صفة الموكل مطلوبة"),
});

export const ClientStatusFormDialog: React.FC<ClientStatusFormDialogProps> = ({
  clientStatus,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: createClientStatus, isPending: isCreating } =
    useCreateClientStatus();
  const { mutateAsync: updateClientStatus, isPending: isUpdating } =
    useUpdateClientStatus();

  const isPending = isCreating || isUpdating;

  return (
    <LayoutDialog
      open={open}
      onOpenChange={setOpen}
      title={clientStatus ? "تعديل صفة الموكل" : "إضافة صفة موكل جديدة"}
      trigger={trigger}
      size="md"
    >
      <Formik
        initialValues={{
          name: clientStatus?.name || "",
        }}
        validationSchema={ClientStatusSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (clientStatus) {
              await updateClientStatus({ id: clientStatus.id, data: values });
            } else {
              await createClientStatus(values);
            }
            setOpen(false);
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {() => (
          <Form className="space-y-6">
            <InputForm
              type="text"
              name="name"
              label="صفة الموكل"
              placeholder="أدخل صفة الموكل"
            />

            <SubmitButton isPending={isPending} className="w-full">
              {clientStatus ? "تعديل الصفة" : "إضافة صفة جديدة"}
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
