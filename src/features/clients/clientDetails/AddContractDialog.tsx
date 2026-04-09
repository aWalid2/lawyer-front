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
import { Plus, XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { FileUpload } from "@/shared/components/FileUpload";
import { useAddContract } from "./api/hooks/useAddContract";

interface AddContractFormValues {
  start_date: string;
  contract_value: string;
  contract_duration: string;
  file: string | File;
}

interface AddContractDialogProps {
  clientId: string;
}

export const AddContractDialog: React.FC<AddContractDialogProps> = ({ clientId }) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: addContract, isPending } = useAddContract();

  const initialValues: AddContractFormValues = {
    start_date: "",
    contract_value: "",
    contract_duration: "",
    file: "",
  };

  const validationSchema = Yup.object().shape({
    start_date: Yup.string().required("تاريخ بداية العقد مطلوب"),
    contract_value: Yup.string().required("القيمة المتفق عليها مطلوبة"),
    contract_duration: Yup.string().required("مدة العقد مطلوبة"),
    file: Yup.mixed().required("صورة العقد مطلوبة"),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-primary-gradient text-white px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 shadow-lg h-12.5 hover:shadow-xl transition-all font-outfit">
          <Plus size={20} />
          اضافة عقد
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none custom-scrollbar"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all outline-none">
            <XIcon size={23} className="text-gray-500 " />
          </button>
        </DialogClose>
        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            إضافة عقد جديد
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await addContract({ clientId, data: values });
              resetForm();
              setOpen(false);
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div className="space-y-3">
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

                <InputForm
                  name="contract_duration"
                  label="مدة العقد"
                  placeholder="مثال: 6 أشهر"
                  type="date"
                />
              </div>

              <FileUpload
                name="file"
                label="صورة العقد"
                placeholder="اختر ملف"
              />

              <SubmitButton isPending={isPending} className="mt-6">
                حفظ التغييرات
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
