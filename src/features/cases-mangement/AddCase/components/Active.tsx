import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SharedFormField } from "./SharedFormField";
import { useGetCourts } from "@/shared/api/hooks/useGetCourts";
import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";

export function Active() {
  const [courtSearch, setCourtSearch] = useState("");
  const debouncedCourtSearch = useDebounce(courtSearch, 500);

  const { data: courts } = useGetCourts(
    undefined,
    undefined,
    debouncedCourtSearch,
  );

  interface Court {
    id: string | number;
    name: string;
  }

  const courtOptions =
    courts?.data?.map((court: Court) => ({
      label: court.name,
      value: String(court.id),
    })) || [];

  return (
    <>
      <InputForm
        label="الرقم الالي للقضية"
        name="reference_number"
        type="number"
        placeholder="الرقم الالي للقضية"
      />

      <InputForm
        label="رقم الشكوي"
        name="Complaint_Number"
        type="number"
        placeholder="رقم الشكوي"
      />

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
        options={LITIGATION_LEVEL_OPTIONS}
        placeholder="اختر درجة التقاضي الحالية"
        showSearch={true}
      />
    </>
  );
}
