import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFetchPoliceStations } from "@/shared/api/hooks/useGetStation";
import { SharedFormField } from "./SharedFormField";

interface PoliceStationEntity {
  id: string;
  name: string;
}

interface PoliceStationsResponse {
  data: PoliceStationEntity[];
}

export function PoliceStationCase() {
  const { data: policeStations } = useFetchPoliceStations() as {
    data: PoliceStationsResponse;
  };

  const policeStationsOptions =
    policeStations?.data?.map((policeStation: PoliceStationEntity) => ({
      label: policeStation.name,
      value: policeStation.id,
    })) || [];

  return (
    <>
      <SharedFormField />
      <SelectForm
        showSearch={true}
        label="المخفر التابع له القضية"
        name="case_police_station_id"
        options={policeStationsOptions}
        placeholder="اختر المخفر"
      />

      <InputForm
        label="رقم القضية في المخفر"
        name="case_number_at_police_station"
        type="number"
        placeholder="رقم القضية في المخفر"
      />

      <InputForm
        label="تاريخ ورود القضية في المخفر"
        name="case_arrival_date_at_police_station"
        type="date"
      />

      <InputForm
        label="اسم المحقق"
        name="detective_name"
        type="text"
        placeholder="اسم المحقق"
      />

      <InputForm
        label="جهة التحقيق"
        name="investigation_name"
        type="text"
        placeholder="جهة التحقيق"
      />
    </>
  );
}
