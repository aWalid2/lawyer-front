import { InputForm } from "@/shared/components/InputForm";
import { SharedFormField } from "./SharedFormField";



export function Other() {


  return (
    <>
      <SharedFormField />

      <InputForm label="رقم الشكوي" name="Complaint_Number" type="number" placeholder="رقم الشكوي" />


      <InputForm label="اسم المحقق" name="detective_name" type="text" placeholder="اسم المحقق" />
      <InputForm label="جهة التحقيق" name="investigation_name" type="text" placeholder="جهة التحقيق" />


      <InputForm label="تاريخ ورود القضية في الجهة" name="Case_Arrival_Date_at_the_Authority" type="date" />
    </>
  );
}