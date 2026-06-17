import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchPoliceStations } from "@/shared/api/hooks/useGetPubliceProsectution";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useCreatePoliceDepartment } from "../../../api/hooks/useCreatePoliceDepartment";
import { useUpdatePoliceDepartment } from "../../../api/hooks/useUpdatePoliceDepartment";
import type { FormValues } from "../../../types/typsePolice";

interface EditModelProps {
  initialValues: FormValues;
  onClose: () => void;
  onSave: (values: FormValues) => void;
  mode?: "add" | "edit";
}

const validationSchema = Yup.object({
  case_number: Yup.number().required("رقم القضية في المخفر مطلوب"),
  station_id: Yup.number().required("المخفر التابع له القضية مطلوب"),
  judge_name: Yup.string().required("اسم المحقق مطلوب"),
  investigation_authirity_transferd_from: Yup.string().required(
    "جهة التحقيق المحول منها مطلوبة",
  ),
  case_entry: Yup.string().required("تاريخ ورود القضية مطلوب"),
});

function PoliceStationInfoModel({
  initialValues,
  onClose,
  onSave,
  mode = "add",
}: EditModelProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: createDepartment, isPending: isCreating } =
    useCreatePoliceDepartment();
  const { mutateAsync: updateDepartment, isPending: isUpdating } =
    useUpdatePoliceDepartment();
  const isPending = isCreating || isUpdating;
  const { data: policeStations } = useFetchPoliceStations();

  const policeStationsOptions =
    policeStations?.data?.map((station: any) => ({
      value: station.id,
      label: station.name,
    })) || [];
  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSaveChanges = async (values: FormValues) => {
    const caseId = Number(id);
    try {
      if (mode === "add") {
        await createDepartment({
          caseId,
          data: {
            case_number: Number(values.case_number),
            station_id: Number(values.station_id),
            judge_name: values.judge_name,
            investigation_authirity_transferd_from:
              values.investigation_authirity_transferd_from,
            case_entry: values.case_entry,
          },
        });
      } else {
        await updateDepartment({
          caseId,
          data: {
            case_number: Number(values.case_number),
            station_id: Number(values.station_id),
            judge_name: values.judge_name,
            investigation_authirity_transferd_from:
              values.investigation_authirity_transferd_from,
            case_entry: values.case_entry,
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
            {mode === "add" ? "إضافة بيانات مخفر" : "تعديل بيانات المخفر"}
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
                <InputForm
                  name="case_number"
                  label="رقم القضية في المخفر"
                  type="text"
                  placeholder="رقم القضية في المخفر"
                />
                <InputForm
                  name="judge_name"
                  label="اسم المحقق"
                  type="text"
                  placeholder="اسم المحقق"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <SelectForm
                  name="station_id"
                  label="المخفر التابع له القضية"
                  placeholder="المخفر التابع له القضية"
                  options={policeStationsOptions}
                />

                <InputForm
                  name="investigation_authirity_transferd_from"
                  label="جهة التحقيق المحول منها"
                  type="text"
                  placeholder="جهة التحقيق المحول منها"
                />
              </div>

              <InputForm
                name="case_entry"
                label="تاريخ ورود القضية داخل المكتب"
                type="date"
              />

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

export default PoliceStationInfoModel;
