import { useFormikContext } from "formik";
import type { FormValues } from "../types/typseCase";
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
          name="clientId"
          options={[
            { label: "احمد", value: "1" },
            { label: "محمد", value: "2" },
            { label: "علي", value: "3" },
            { label: "خالد", value: "4" }
          ]}
          placeholder="اختر الموكل"
        />




        <SelectForm
          label="حالة القضية"
          name="caseStatus"
          options={[
            { label: "متداولة", value: "pending" },
            { label: "تحت التنفيذ", value: "inProgress" },
            { label: "تحت النظر", value: "review" }
          ]}
          placeholder="اختر حالة القضية"
        />

        <SelectForm
          label="صفة الموكل"
          name="clientType"
          options={[
            { label: "مدعي", value: "individual" },
            { label: "شركة", value: "company" }
          ]}
          placeholder="اختر صفة الموكل"
        />

        <SelectForm
          label="نوع القضية"
          name="caseType"
          options={[
            { label: "جنائي", value: "criminal" },
            { label: "مدني", value: "civil" },
            { label: "تجاري", value: "commercial" }
          ]}
          placeholder="اختر نوع القضية"
        />

        <SelectForm
          label="المخفر التابع له القضية"
          name="policeStation"
          options={[
            { label: "مخفر الأزاريطة", value: "police1" },
            { label: "مخفر سيدي جابر", value: "police2" },
            { label: "مخفر محرم بك", value: "police3" },
            { label: "مخفر كرموز", value: "police4" }
          ]}
          placeholder="اختر المخفر"
        />


        <InputForm label="رقم القضية في المخفر" name="numberInPoliceStation" type="text" placeholder="رقم القضية في المخفر" />

        <InputForm label="تاريخ ورود القضية في المخفر" name="dateInPoliceStation" type="date" />

        <InputForm label="اسم المحقق" name="investigatorName" type="text" placeholder="اسم المحقق" />

        <InputForm label="جهة التحقيق" name="investigativeAuthority" type="text" placeholder="جهة التحقيق" />


        <InputForm label="تاريخ تسجيل القضية في الادعاء العام" name="dateInProsecution" type="date" />
        <InputForm label="تاريخ ورود القضية في المكتب" name="dateInOffice" type="date" />

      </div>

      <TextAreaForm label="ملاحظات" name="notes" placeholder="أضف ملاحظات..." />
    </>
  );
}