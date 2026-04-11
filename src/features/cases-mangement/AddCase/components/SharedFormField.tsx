import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFetchClients } from "@/shared/api/hooks/useGetClients";
import { useGetCaseStatus } from "../../MainCases/api/hooks/useGetCaseStatus";
import { useGetCaseType } from "../../MainCases/api/hooks/useGetCaseType";

export function SharedFormField() {
  const [clientSearch, setClientSearch] = useState("");
  const debouncedClientSearch = useDebounce(clientSearch, 500);

  const { data: clients } = useFetchClients(undefined, undefined, debouncedClientSearch);
  const { data: caseStatus } = useGetCaseStatus();
  const { data: caseType } = useGetCaseType();

  const options = clients?.data?.map((client: any) => ({
    label: client.name,
    value: String(client.user_id)
  })) || [];

  const caseStatusOptions = caseStatus?.data?.map((caseStatus: any) => ({
    label: caseStatus.name,
    value: String(caseStatus.id)
  })) || [];

  const caseTypeOptions = caseType?.data?.map((caseType: any) => ({
    label: caseType.name,
    value: String(caseType.id)
  })) || [];

  return (
    <>
      <InputForm label="عنوان القضية" name="case_title" type="text" placeholder="عنوان القضية" />

      <SelectForm
        label="اسم الموكل"
        name="client_id"
        options={options}
        placeholder="اختر الموكل"
        showSearch={true}
        onSearchChange={setClientSearch}
      />

      <SelectForm
        label="حالة القضية"
        name="case_status_id"
        options={caseStatusOptions}
        placeholder="اختر حالة القضية"
      />

      <SelectForm
        label="صفة الموكل"
        name="client_type"
        options={[
          { label: "مدعي", value: "plaintiff" },
          { label: "مدعى عليه", value: "defendant" }
        ]}
        placeholder="اختر صفة الموكل"
      />

      <SelectForm
        label="نوع القضية"
        name="case_type_id"
        options={caseTypeOptions}
        placeholder="اختر نوع القضية"
      />
    </>
  );
}