import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFetchClients } from "@/shared/api/hooks/useGetClients";



export function SharedFormField() {
  const { data: clients } = useFetchClients()
  console.log(clients)
  const options = clients?.map((client: any) => ({
    label: client.name,
    value: String(client.user_id)
  })) || []

  console.log(options)
  return (
    <>
      <InputForm label="عنوان القضية" name="case_title" type="text" placeholder="عنوان القضية" />

      <SelectForm
        label="اسم الموكل"
        name="client_id"
        options={options}
        placeholder="اختر الموكل"
      />


      <SelectForm
        label="حالة القضية"
        name="case_status_id"
        options={[
          { label: "تحت النظر", value: "1" },
          { label: "تم الإحالة", value: "2" },
          { label: "تم الحكم", value: "3" }
        ]}
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
        options={[
          { label: "سرقة", value: "1" },
          { label: "قتل", value: "2" },
          { label: "خطف", value: "3" },
        ]}
        placeholder="اختر نوع القضية"
      />


    </>
  );
}