import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFetchClients } from "../api/hooks/useGetClients";



export function SharedFormField() {
  const { data: clients } = useFetchClients()
  const options = clients?.map((client: any) => ({
    label: client.name,
    value: client.name
  })) || []


  return (
    <>
      <InputForm label="عنوان القضية" name="case_title" type="text" placeholder="عنوان القضية" />


      <SelectForm
        label="اسم الموكل"
        name="client_name"
        options={options}
        placeholder="اختر الموكل"
      />


      <SelectForm
        label="حالة القضية"
        name="case_status"
        options={[
          { label: "متداولة", value: "pending" },
          { label: "تحت التنفيذ", value: "inProgress" },
          { label: "تحت النظر", value: "review" }
        ]}
        placeholder="اختر حالة القضية"
      />

      <SelectForm
        label="صفة الموكل"
        name="client_type"
        options={[
          { label: "مدعي", value: "individual" },
          { label: "شركة", value: "company" }
        ]}
        placeholder="اختر صفة الموكل"
      />


      <SelectForm
        label="نوع القضية"
        name="case_type"
        options={[
          { label: "جنائي", value: "criminal" },
          { label: "مدني", value: "civil" },
          { label: "تجاري", value: "commercial" },
        ]}
        placeholder="اختر نوع القضية"
      />


    </>
  );
}