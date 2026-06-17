import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateProsecutionSession } from "../../../api/hooks/useCreateProsecutionSession";
import { useUpdateProsecutionSession } from "../../../api/hooks/useUpdateProsecutionSession";
import type { FormValues } from "../../../types/typseProsecution";
import { useFetchProsecutions } from "@/features/settings/public-prosecutions/api/hooks/useGetProsecutions";
import { SelectForm } from "@/shared/components/SelectForm";
import * as Yup from "yup";

interface EditModelProps {
  initialValues: FormValues;
  onClose: () => void;
  onSave: (values: FormValues) => void;
  mode?: "add" | "edit";
}

const validationSchema = Yup.object({
  case_number_at_Presecution: Yup.string().required(
    "رقم القضية في النيابة مطلوب",
  ),
  prosecution_id: Yup.number().required("اسم النيابة مطلوب"),
  case_regestration_date_at_presecution: Yup.string().required(
    "تاريخ تسجيل القضية في النيابة مطلوب",
  ),
});

function ProsecutionInfoModel({
  initialValues,
  onClose,
  onSave,
  mode = "add",
}: EditModelProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: createProsecution, isPending: isCreating } =
    useCreateProsecutionSession();
  const { mutateAsync: updateProsecution, isPending: isUpdating } =
    useUpdateProsecutionSession();
  const isPending = isCreating || isUpdating;
  const { data: prosecutions } = useFetchProsecutions();

  const prosecutionOptions = useMemo(() => {
    return (
      prosecutions?.data?.map((prosecution: any) => ({
        value: prosecution.id,
        label: prosecution.name,
      })) || []
    );
  }, [prosecutions]);

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
            case_number_at_Presecution: Number(
              values.case_number_at_Presecution,
            ),
            prosecution_id: Number(values.prosecution_id),
            Prosecutor_Name: values.Prosecutor_Name,
            case_regestration_date_at_presecution:
              values.case_regestration_date_at_presecution,
          },
        });
      } else {
        await updateProsecution({
          caseId,
          data: {
            case_number_at_Presecution: Number(
              values.case_number_at_Presecution,
            ),
            prosecution_id: Number(values.prosecution_id),
            case_regestration_date_at_presecution:
              values.case_regestration_date_at_presecution,
            Prosecutor_Name: values.Prosecutor_Name,
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
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-[715px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={handleCloseModal}>
          <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {mode === "add" ? "إضافة بيانات النيابة" : "تعديل بيانات النيابة"}
          </DialogTitle>
        </DialogHeader>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSaveChanges}
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-4">
                <SelectForm
                  name="prosecution_id"
                  label="النيابة"
                  options={prosecutionOptions}
                  placeholder="اختر النيابة"
                />
                <InputForm
                  name="case_number_at_Presecution"
                  label="رقم القضية في النيابة"
                  type="text"
                  placeholder="رقم القضية في النيابة"
                />
                <InputForm
                  name="Prosecutor_Name"
                  label="وكيل النيابة"
                  type="text"
                  placeholder="وكيل النيابة"
                />

                <InputForm
                  name="case_regestration_date_at_presecution"
                  label="تاريخ تسجيل القضية داخل النيابة"
                  type="date"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="bg-primary-gradient rounded-main mt-4 flex w-full items-center justify-center gap-2 px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-70"
              >
                {isPending && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                )}
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
