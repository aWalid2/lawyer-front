import { Button } from "@/components/ui/button";
import { LayoutDialog } from "@/shared/components/dialogs/LayoutDialog";
import { EditIcon } from "@/shared/icons/Edit";
import { Form, Formik } from "formik";
import React, { useState } from "react";

import type { FirstDegreeFormValues } from "./typesCaseInfo";

import { useGetCircles } from "@/shared/api/hooks/useGetCircles";
import { useGetCourts } from "@/shared/api/hooks/useGetCourts";

import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";

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
    <LayoutDialog
      title={title}
      trigger={
        <Button className="h-12.5 bg-[#f1f1f3] text-base font-semibold text-[#3D3C48] hover:text-white">
          {buttonTitle === "إضافة" ? null : <EditIcon className="h-4 w-4" />}{" "}
          {buttonTitle}
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
      showCloseButton={true}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmit(values);
          setOpen(false);
        }}
      >
        {({ values }) => {
          const selectedCourtId = Number(values.court_id) || undefined;
          const { data: circles } = useGetCircles(
            selectedCourtId,
            open && !!selectedCourtId,
          );
          const circlesOptions =
            circles?.map((circle: any) => ({
              value: String(circle.id),
              label: circle.name,
            })) || [];
          return (
            <Form>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  name="district_type"
                  label="نوع الدائرة"
                  type="text"
                />
                <SelectForm
                  name="district_number"
                  label=" الدائرة بالمحكمة"
                  options={circlesOptions}
                />
                <InputForm
                  name="floor_number"
                  label="رقم الدور في المحكمة"
                  type="number"
                />
                <InputForm
                  name="hall_number"
                  label="رقم القاعة في المحكمة"
                  type="number"
                />
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
          );
        }}
      </Formik>
    </LayoutDialog>
  );
};
