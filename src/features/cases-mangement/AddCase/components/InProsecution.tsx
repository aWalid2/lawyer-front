import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFormikContext } from "formik";
import type { FormValues } from "../utils/mapToApiPayload";
import { SharedFormField } from "./SharedFormField";
import { useFetchProsecutions } from "@/shared/api/hooks/useGetProsecutions";


export function InProsecution() {
  const { setFieldValue } = useFormikContext<FormValues>();
  const { data } = useFetchProsecutions();
  const prosecutions = data?.data || [];
  const prosecutionOptions = prosecutions.map((prosecution: any) => ({
    label: prosecution.name,
    value: prosecution.id,
  }));
  return (
    <>

      <SharedFormField />
      <SelectForm
        showSearch={true}
        label="النيابة"
        name="case_police_station"
        options={prosecutionOptions}
        onChange={(value) => setFieldValue("case_police_station", value)}
      />



      <InputForm label="رقم القضية في النيابة" name="case_number_at_police_station" type="number" placeholder="رقم القضية في النيابة" />

      <InputForm label="تاريخ تسجيل القضية في النيابة" name="regestration_date_of_case_at_prosecution" type="date" />



      <InputForm label="اسم المحقق" name="detective_name" type="text" placeholder="اسم المحقق" />
      <InputForm label="جهة التحقيق" name="investigation_name" type="text" placeholder="جهة التحقيق" />


      <InputForm label="رقم القضية في المخفر" name="case_number_at_prosecution" type="text" />
    </>
  );
}