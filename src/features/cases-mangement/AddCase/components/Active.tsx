import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SharedFormField } from "./SharedFormField";
import { useGetCourts } from "@/shared/api/hooks/useGetCourts";

export function Active() {
  const [courtSearch, setCourtSearch] = useState("");
  const debouncedCourtSearch = useDebounce(courtSearch, 500);

  const { data: courts } = useGetCourts(undefined, undefined, debouncedCourtSearch);

  const courtOptions = courts?.data?.map((court: any) => ({
    label: court.name,
    value: String(court.id)
  })) || [];

  const degreeOptions = [
    { label: "أول درجة", value: "أول درجة" },
    { label: "استئناف", value: "استئناف" },
    { label: "تميز", value: "تميز" },
  ];

  return (
    <>
      <InputForm
        label="الرقم الالي للقضية"
        name="case_sequence"
        type="number"
        placeholder="الرقم الالي للقضية"
      />

      <InputForm label="رقم الشكوي" name="Complaint_Number" type="number" placeholder="رقم الشكوي" />

      <SharedFormField />

      <SelectForm
        label="المحكمة"
        name="court_id"
        options={courtOptions}
        placeholder="اختر المحكمة"
        showSearch={true}
        onSearchChange={setCourtSearch}
      />
      <SelectForm
        label="درجة التقاضي الحالية"
        name="Current_court_degree"
        options={degreeOptions}
        placeholder="اختر درجة التقاضي الحالية"
        showSearch={true}
      />

    </>
  );
}