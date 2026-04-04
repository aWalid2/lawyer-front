import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";


export function PublicProsecution() {

  return (
    <>
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

      <InputForm label="تاريخ ورود القضية في المخفر" name="case_arrival_date_at_police_station" type="date" />

      <InputForm label="اسم المحقق" name="detective_name" type="text" placeholder="اسم المحقق" />

      <InputForm label="جهة التحقيق" name="investigation_name" type="text" placeholder="جهة التحقيق" />


      <InputForm label="تاريخ تسجيل القضية في الادعاء العام" name="registration_at_public_prosecution" type="date" />
      <InputForm label="تاريخ ورود القضية في الادعاء العام" name="case_arrival_date_at_prosecution" type="date" />
      <InputForm label="تاريخ ورود القضية في المكتب" name="case_entry_date" type="date" />
      <InputForm label="رقم القضية في الادعاء العام" name="case_number_at_prosecution" type="number" placeholder="رقم القضية في الادعاء العام" />
      case_arrival_date_at_police_station
    </>
  );
}