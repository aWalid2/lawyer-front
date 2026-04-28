import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { EditIcon } from "@/shared/icons/Edit";

import type { FirstDegreeFormValues } from "./typesCaseInfo";
import { Button } from "@/components/ui/button";
import { useGetCourts } from "@/shared/api/hooks/useGetCourts";
import { SelectForm } from "@/shared/components/SelectForm";

import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { InputForm } from "@/shared/components/InputForm";

export const FormSessionDialog: React.FC<{
  title: string;
  buttonTitle?: string;
  initialValues: FirstDegreeFormValues;
  onSubmit: (values: FirstDegreeFormValues) => void;
}> = ({ title, buttonTitle = "تعديل", initialValues, onSubmit }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: courts } = useGetCourts(undefined, undefined, undefined, open);
  const { data: lawyersResponse } = useFetchLawyers(open);

  const courtsOptions =
    courts?.data?.map((court: any) => ({
      value: String(court.id),
      label: court.name,
    })) || [];

  const lawyers = Array.isArray(lawyersResponse)
    ? lawyersResponse
    : (lawyersResponse as any)?.data || [];
  const lawyersOptions =
    lawyers.map((lawyer: any) => ({
      value: String(lawyer?.user_id),
      label: lawyer?.user?.first_name + " " + (lawyer?.user?.last_name || ""),
    })) || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12.5 bg-[#f1f1f3] text-base font-semibold text-[#3D3C48] hover:text-white">
          {buttonTitle === "إضافة" ? null : <EditIcon className="h-4 w-4" />}{" "}
          {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:rounded-main rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-[772px] sm:px-20 sm:py-10"
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
            {title}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit(values);
            setOpen(false);
          }}
        >
          <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
            <div
              className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2"
              dir="rtl"
            >
              <SelectForm
                name="court_id"
                label="اسم المحكمة"
                options={courtsOptions}
              />
              <SelectForm
                name="lawyer_id"
                label="المحامي المسؤول"
                options={lawyersOptions}
              />

              <InputForm
                name="floor_number"
                label="الدور في المحكمة"
                type="text"
              />

              <InputForm
                name="hall_number"
                label="رقم القاعة في المحكمة"
                type="text"
              />
              <InputForm
                name="district_number"
                label="رقم الدائرة"
                type="text"
              />

              <InputForm name="district_type" label="نوع الدائرة" type="text" />
              <InputForm
                name="judge_name"
                label="اسم قاضي الدائرة"
                type="text"
              />

              <InputForm
                name="secretary_name"
                label="اسم سكرتير الدائرة"
                type="text"
              />
              <InputForm
                name="secretary_floor"
                label="دور مكتب السكرتير"
                type="text"
              />

              <InputForm
                name="secretary_office_number"
                label="رقم مكتب السكرتير"
                type="text"
              />

              <InputForm
                name="registration_date"
                label="تاريخ تسجيل القضية بالمحكمة"
                type="date"
              />
              <InputForm
                name="registration_time"
                label="وقت تسجيل القضية بالمحكمة"
                type="time"
              />

              <InputForm
                name="next_session_date"
                label="تاريخ ووقت الجلسة القادمة"
                type="date"
              />
              <InputForm
                name="next_session_time"
                label="وقت الجلسة القادمة"
                type="time"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-gradient rounded-main mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              حفظ التغييرات
            </button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
