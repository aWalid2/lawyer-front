import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFormikContext } from "formik";
import type { FormValues } from "../utils/mapToApiPayload";
import { SharedFormField } from "./SharedFormField";
import { useFetchProsecutions } from "@/shared/api/hooks/useGetProsecutions";
import { useFetchPoliceStations } from "@/shared/api/hooks/useGetStation";

interface PoliceStationEntity {
  id: string;
  name: string;
}

interface PoliceStationsResponse {
  data: PoliceStationEntity[];
}
export function InProsecution() {
  const { setFieldValue } = useFormikContext<FormValues>();
  const { data } = useFetchProsecutions();
  const prosecutions = data?.data || [];
  const prosecutionOptions = prosecutions.map((prosecution: any) => ({
    label: prosecution.name,
    value: prosecution.id,
  }));

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
        label="النيابة"
        name="case_prosecution_id"
        options={prosecutionOptions}
        onChange={(value) => setFieldValue("case_police_station_id", value)}
      />

      <InputForm
        label="تاريخ تسجيل القضية في النيابة"
        name="regestration_date_of_case_at_prosecution"
        type="date"
      />
      <InputForm
        label="رقم القضية في النيابة"
        name="case_number_at_police_station"
        type="number"
        placeholder="رقم القضية في النيابة"
      />

      <InputForm
        label="وكيل النيابة"
        name="deputy_prosecutor_name"
        type="text"
        placeholder="وكيل النيابة"
      />
      <SelectForm
        showSearch={true}
        label="المخفر التابع له القضية"
        name="case_police_station_id"
        options={policeStationsOptions}
        placeholder="اختر المخفر"
      />
      <InputForm
        label="رقم القضية في المخفر"
        name="case_number_at_prosecution"
        type="text"
      />
      <InputForm
        label="تاريخ ورود القضية في المخفر "
        name="case_arrival_date_at_police_station"
        type="date"
      />

      <InputForm
        label="جهة التحقيق"
        name="investigation_name"
        type="text"
        placeholder="جهة التحقيق"
      />

      <InputForm
        label="اسم المحقق"
        name="detective_name"
        type="text"
        placeholder="اسم المحقق"
      />
    </>
  );
}
