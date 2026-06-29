import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Plus, Calendar, CalendarX, List, ListX } from "lucide-react";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { ToggleSwitch } from "@/shared/components/ToggleSwitch";
import { SubmitButton } from "@/shared/components/buttons/SubmitButton";
import { FileUpload } from "@/shared/components/FileUpload";
import { LayoutDialog } from "@/shared/components/dialogs/LayoutDialog";
import { useAddContract } from "../api/hooks/useAddContract";
import { buildContractFormData } from "../api/services/buildContractFormData";

interface AddContractFormValues {
  start_date: string;
  contract_value: string;
  contract_title: string;
  contract_duration: string;
  contract_cases: string;
  hasFixedDuration: boolean;
  hasFixedCases: boolean;
  file: string | File;
}

interface AddContractDialogProps {
  clientId: string;
}

export const AddContractDialog: React.FC<AddContractDialogProps> = ({
  clientId,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: addContract, isPending } = useAddContract();

  const initialValues: AddContractFormValues = {
    start_date: "",
    contract_value: "",
    contract_duration: "",
    contract_title: "",
    contract_cases: "",
    hasFixedDuration: true,
    hasFixedCases: true,
    file: "",
  };

  const validationSchema = Yup.object().shape({
    start_date: Yup.string().required("تاريخ بداية العقد مطلوب"),
    contract_value: Yup.string().required("القيمة المتفق عليها مطلوبة"),
    contract_duration: Yup.mixed().when("hasFixedDuration", {
      is: true,
      then: (schema) =>
        schema
          .required("مدة العقد مطلوبة")
          .test(
            "positive",
            "مدة العقد يجب أن تكون رقمًا موجبًا",
            (val: any) => val && !isNaN(Number(val)) && Number(val) > 0,
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
    contract_cases: Yup.string().when("hasFixedCases", {
      is: true,
      then: (schema) => schema.required("عدد القضايا مطلوب"),
      otherwise: (schema) => schema.notRequired(),
    }),
    file: Yup.mixed().required("صورة العقد مطلوبة"),
  });

  return (
    <LayoutDialog
      title="إضافة عقد جديد"
      open={open}
      onOpenChange={setOpen}
      size="md"
      trigger={
        <button className="bg-primary-gradient rounded-main font-outfit flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl">
          <Plus size={20} />
          اضافة عقد
        </button>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addContract({
              clientId,
              data: buildContractFormData(values),
            });
            resetForm();
            setOpen(false);
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="space-y-3">
              <InputForm
                name="contract_title"
                label="عنوان العقد"
                placeholder="عنوان العقد"
                type="text"
              />
              <InputForm
                name="start_date"
                label="تاريخ بداية العقد"
                placeholder="2024-01-01"
                type="date"
              />

              <InputForm
                name="contract_value"
                label="القيمة المتفق عليها"
                placeholder="مثال: 5000"
                type="text"
              />

              <ToggleSwitch
                id="duration-toggle"
                leftLabel="محدد بمدة"
                rightLabel="غير محدد بمدة"
                leftIcon={<Calendar size={18} />}
                rightIcon={<CalendarX size={18} />}
                checked={!values.hasFixedDuration}
                onCheckedChange={(checked) => {
                  setFieldValue("hasFixedDuration", !checked);
                  if (!checked) {
                    setFieldValue("contract_duration", "");
                  }
                }}
              />

              {values.hasFixedDuration && (
                <InputForm
                  name="contract_duration"
                  label="مدة العقد"
                  placeholder="مثال: 6 أشهر"
                  type="text"
                />
              )}

              <ToggleSwitch
                id="cases-toggle"
                leftLabel="مربوط بعدد قضايا ثابت"
                rightLabel="غير مربوط"
                leftIcon={<List size={18} />}
                rightIcon={<ListX size={18} />}
                checked={!values.hasFixedCases}
                onCheckedChange={(checked) => {
                  setFieldValue("hasFixedCases", !checked);
                  if (checked) {
                    setFieldValue("contract_cases", "");
                  }
                }}
              />

              {values.hasFixedCases && (
                <InputForm
                  name="contract_cases"
                  label="عدد القضايا"
                  placeholder="أدخل عدد القضايا"
                  type="number"
                />
              )}
            </div>

            <FileUpload
              name="file"
              label="صورة العقد"
              placeholder="اختر ملف"
              className="w-full"
            />

            <SubmitButton isPending={isPending} className="mt-6">
              حفظ التغييرات
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
