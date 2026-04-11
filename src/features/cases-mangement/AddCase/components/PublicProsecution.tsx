import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SharedFormField } from "./SharedFormField";
import { useFetchPoliceStations } from "@/shared/api/hooks/useGetStation";

interface PoliceStation {
  id: string;
  name: string;
}

interface PoliceStationsResponse {
  data: PoliceStation[];
}

export function PublicProsecution() {
  const { data: policeStations } = useFetchPoliceStations() as { data: PoliceStationsResponse };

  const policeStationsOptions = policeStations?.data?.map((policeStation: PoliceStation) => ({
    label: policeStation.name,
    value: policeStation.id,
  })) || [];
  return (
    <>
      <SharedFormField />
      <SelectForm
        showSearch={true}
        label="المخفر التابع له القضية"
        name="case_police_station"
        options={policeStationsOptions}
        placeholder="اختر المخفر"
      />


      <InputForm label="رقم القضية في المخفر" name="case_number_at_police_station" type="number" placeholder="رقم القضية في المخفر" />
      <InputForm label="تاريخ ورود القضية في المخفر" name="case_arrival_date_at_police_station" type="date" />



      <InputForm label="اسم المحقق" name="detective_name" type="text" placeholder="اسم المحقق" />

      <InputForm label="جهة التحقيق" name="investigation_name" type="text" placeholder="جهة التحقيق" />


      <InputForm label="تاريخ تسجيل القضية في الادعاء العام" name="regestration_date_of_case_at_prosecution" type="date" />



    </>
  );
}