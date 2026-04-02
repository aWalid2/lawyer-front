import { SelectForm } from "@/shared/components/SelectForm";
import { InputForm } from "@/shared/components/InputForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";


export function UnderTheRift() {
  return (
    <>
      <div className={" grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <InputForm label="عنوان القضية" name="case_title" type="text" placeholder="عنوان القضية" />


        <SelectForm
          label="اسم الموكل"
          name="client_name"
          options={[
            { label: "احمد", value: "Ahmed" },
            { label: "محمد", value: "Mohamed" },
            { label: "علي", value: "Ali" },
            { label: "خالد", value: "Khaled" }
          ]}
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
            { label: "تجاري", value: "commercial" }
          ]}
          placeholder="اختر نوع القضية"
        />

        <InputForm label="تاريخ ورود القضية داخل المكتب" name="case_receipt_date" type="date" />
      </div>

      <TextAreaForm label="ملاحظات" name="notes" placeholder="أضف ملاحظات..." />
    </>
  );
}