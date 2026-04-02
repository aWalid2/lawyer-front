import { useFormikContext } from "formik";
import type { FormValues } from "../utils/mapToApiPayload";
import { SelectForm } from "@/shared/components/SelectForm";
import { InputForm } from "@/shared/components/InputForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";



export function PublicProsecution() {
  const { } = useFormikContext<FormValues>();

  return (
    <>
      <div className={" grid grid-cols-1 md:grid-cols-2 gap-4"}>

        <InputForm label="عنوان القضية" name="caseTitle" type="text" placeholder="عنوان القضية" />

        <SelectForm
          label="اسم الموكل"
          name="client_name"
          options={[
            { label: "احمد", value: "ahmed" },
            { label: "محمد", value: "mohamed" },
            { label: "علي", value: "ali" },
            { label: "خالد", value: "khalid" }
          ]}
          placeholder="اختر الموكل"
        />




        <SelectForm
          label="حالة القضية"
          name="case_title"
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

        <SelectForm
          label="المخفر التابع له القضية"
          name="case_police_station"
          options={[
            { label: "مخفر الأزاريطة", value: "police1" },
            { label: "مخفر سيدي جابر", value: "police2" },
            { label: "مخفر محرم بك", value: "police3" },
            { label: "مخفر كرموز", value: "police4" }
          ]}
          placeholder="اختر المخفر"
        />


        <InputForm label="رقم القضية في المخفر" name="case_number_at_police_station" type="number" placeholder="رقم القضية في المخفر" />

        <InputForm label="تاريخ ورود القضية في المخفر" name="regestration_date_of_case_at_prosecution" type="date" />

        <InputForm label="اسم المحقق" name="detective_name" type="text" placeholder="اسم المحقق" />

        <InputForm label="جهة التحقيق" name="investigation_name" type="text" placeholder="جهة التحقيق" />


        <InputForm label="تاريخ تسجيل القضية في الادعاء العام" name="registration_at_public_prosecution" type="date" />
        <InputForm label="تاريخ ورود القضية في المكتب" name="case_entry_date" type="date" />
        <InputForm label="رقم القضية في الادعاء العام" name="case_number_at_prosecution" type="number" placeholder="رقم القضية في الادعاء العام" />
      </div>

      <TextAreaForm label="ملاحظات" name="notes" placeholder="أضف ملاحظات..." />
    </>
  );
}