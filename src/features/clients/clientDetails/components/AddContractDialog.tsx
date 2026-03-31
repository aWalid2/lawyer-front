import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, XIcon } from "lucide-react";
import { InputForm } from "./ClientInfo/components/FormInfoDetails/components/InputForm";
import ImageFormDetails from "./ClientInfo/components/FormInfoDetails/components/ImageFormDetails";
import { ButtonSubmit } from "./ClientInfo/components/FormInfoDetails/components/ButtonSubmit";

interface AddContractFormValues {
  startDate: string;
  agreedValue: string;
  duration: string;
  contractImage: string | File;
}

export const AddContractDialog: React.FC = () => {
  const initialValues: AddContractFormValues = {
    startDate: "",
    agreedValue: "",
    duration: "",
    contractImage: "",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary-gradient text-white px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 shadow-lg h-12.5 hover:shadow-xl transition-all">
          <Plus size={20} />
          اضافة عقد
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none custom-scrollbar"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
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
          onSubmit={(values) => {
            console.log("Adding contract:", values);
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div className="space-y-3">
                <InputForm
                  name="startDate"
                  label="تاريخ بداية العقد"
                  placeholder="2024-01-01"
                  type="date"
                  disabled={false}
                />

                <InputForm
                  name="agreedValue"
                  label="القيمة المتفق عليها"
                  placeholder="مثال: 5000"
                  type="text"
                  disabled={false}
                />

                <InputForm
                  name="duration"
                  label="مدة العقد"
                  placeholder="مثال: 6 أشهر"
                  type="text"
                  disabled={false}
                />

                <ImageFormDetails
                  isEditing={true}
                  title="صورة العقد"
                  name="contractImage"
                />
              </div>

              <div className="pt-2">
                <ButtonSubmit label="حفظ التغييرات" />
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
