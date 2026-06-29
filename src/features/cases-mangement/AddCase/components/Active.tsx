import { useState } from "react";
import { useFormikContext } from "formik";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SharedFormField } from "./SharedFormField";
import { useGetCourts } from "@/shared/api/hooks/useGetCourts";
import { useGetCircles } from "@/shared/api/hooks/useGetCircles";
import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";

interface ActiveFormValues {
  court_id?: string | number;
  [key: string]: unknown;
}

export function Active() {
  const [courtSearch, setCourtSearch] = useState("");
  const debouncedCourtSearch = useDebounce(courtSearch, 500);
  const { values } = useFormikContext<ActiveFormValues>();

  const { data: courts } = useGetCourts(
    undefined,
    undefined,
    debouncedCourtSearch,
  );

  const selectedCourtId = Number(values.court_id) || undefined;
  const { data: circles } = useGetCircles(selectedCourtId, !!selectedCourtId);

  interface Court {
    id: string | number;
    name: string;
  }

  const courtOptions =
    courts?.data?.map((court: Court) => ({
      label: court.name,
      value: String(court.id),
    })) || [];

  interface Circle {
    id: number | string;
    name: string;
  }

  const circlesData = Array.isArray(circles)
    ? circles
    : ((circles as { data?: Circle[] })?.data ?? []);
  const circlesOptions =
    circlesData.map((circle: Circle) => ({
      value: String(circle.id),
      label: circle.name,
    })) || [];

  return (
    <>
      <InputForm
        label="الرقم الالي للقضية"
        name="reference_number"
        type="string"
        placeholder="الرقم الالي للقضية"
      />
      <SharedFormField />
      <InputForm
        label="تاريخ تسجيل القضية في المحكمة"
        name="date_case_registered_court"
        type="date"
      />
      <InputForm
        label="رقم القضية في المحكمة"
        name="case_number_court"
        type="string"
        placeholder="رقم القضية في المحكمة"
      />
      <SelectForm
        label="درجة التقاضي الحالية"
        name="Current_court_degree"
        options={LITIGATION_LEVEL_OPTIONS}
        placeholder="اختر درجة التقاضي الحالية"
        showSearch={true}
      />
      <SelectForm
        label=" اسم المحكمة"
        name="court_id"
        options={courtOptions}
        placeholder="اختر المحكمة"
        showSearch={true}
        onSearchChange={setCourtSearch}
      />

      <SelectForm
        label=" اسم الدائرة "
        name="circuit_id"
        options={circlesOptions}
        placeholder="اختر اسم الدائرة"
        showSearch={true}
      />
      <InputForm
        label="تاريخ الجلسة القادم"
        name="session_comming_date"
        type="date"
        placeholder="تاريخ الجلسة القادم"
      />
      <InputForm
        label="وقت الجلسة "
        name="session_comming_time"
        type="time"
        placeholder="وقت الجلسة القادم"
      />
      <InputForm
        label="الدور في المحكمة  "
        name="court_role"
        type="string"
        placeholder="الدور في المحكمة"
      />

      <InputForm
        label="رقم القاعه في المحكمة"
        name="court_hall_number"
        type="string"
        placeholder="رقم القاعة في المحكمة"
      />
      <InputForm
        label="اسم قاضي الدائرة"
        name="circuit_judge_name"
        type="string"
        placeholder="اسم قاضي الدائرة"
      />
      <InputForm
        label="أسم سكرتير الدائرة"
        name="circuit_secretary_name"
        type="string"
        placeholder="أسم سكرتير الدائرة"
      />
      <InputForm
        label="دور مكتب السكرتير الدائرة"
        name="circuit_secretary_office_role"
        type="string"
        placeholder="دور مكتب السكرتير الدائرة"
      />
      <InputForm
        label="رقم مكتب السكرتير الدائرة"
        name="circuit_secretary_office_number"
        type="string"
        placeholder="رقم مكتب السكرتير الدائرة"
      />
    </>
  );
}
