import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useCreateProsecutionSession } from "../../../api/hooks/useCreateProsecutionSession";
import { useUpdateProsecutionSession } from "../../../api/hooks/useUpdateProsecutionSession";
import type { FormValues } from "../../../types/typseProsecution";

interface EditModelProps {
  initialValues: FormValues;
  onClose: () => void;
  onSave: (values: FormValues) => void;
  mode?: "add" | "edit";
}

const validationSchema = Yup.object({
  caseNumberInProsecution: Yup.string().required("رقم القضية في النيابة مطلوب"),
  prosecutionName: Yup.string().required("اسم النيابة مطلوب"),
  prosecutionRegistrationDate: Yup.string().required("تاريخ تسجيل القضية في النيابة مطلوب"),
  policeStation: Yup.string().required("المخفر التابع له القضية مطلوب"),
});

function ProsecutionInfoModel({ initialValues, onClose, onSave, mode = "add" }: EditModelProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: createProsecution, isPending: isCreating } = useCreateProsecutionSession();
  const { mutateAsync: updateProsecution, isPending: isUpdating } = useUpdateProsecutionSession();
  const isPending = isCreating || isUpdating;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSaveChanges = async (values: FormValues) => {
    const caseId = Number(id);
    try {
      if (mode === "add") {
        await createProsecution({
          caseId,
          data: {
            caseNumberInProsecution: values.caseNumberInProsecution,
            prosecutionName: values.prosecutionName,
            prosecutionRegistrationDate: values.prosecutionRegistrationDate,
            policeStation: values.policeStation,
          },
        });
      } else {
        await updateProsecution({
          caseId,
          data: {
            caseNumberInProsecution: values.caseNumberInProsecution,
            prosecutionName: values.prosecutionName,
            prosecutionRegistrationDate: values.prosecutionRegistrationDate,
            policeStation: values.policeStation,
          },
        });
      }
      setIsModalOpen(false);
      onSave(values);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={true} onOpenChange={handleCloseModal}>
      <DialogContent
        className="sm:max-w-[715px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={handleCloseModal}>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            {mode === "add" ? "إضافة بيانات النيابة" : "تعديل بيانات النيابة"}
          </DialogTitle>
        </DialogHeader>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSaveChanges}
        >
          {() => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="prosecutionName"
                  label="النيابة"
                  type="text"
                  placeholder="النيابة"
                />
                <InputForm
                  name="caseNumberInProsecution"
                  label="رقم القضية في النيابة"
                  type="text"
                  placeholder="رقم القضية في النيابة"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="prosecutionRegistrationDate"
                  label="تاريخ تسجيل القضية داخل النيابة"
                  type="date"
                />
                <InputForm
                  name="policeStation"
                  label="المخفر التابع له القضية"
                  type="text"
                  placeholder="المخفر التابع له القضية"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isPending && <span className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></span>}
                {mode === "add" ? "إضافة" : "حفظ التعديلات"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default ProsecutionInfoModel;