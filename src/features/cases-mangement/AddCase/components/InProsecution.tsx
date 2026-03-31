import { useFormikContext } from "formik";
import type { FormValues } from "../types/typseCase";
import { SelectForm } from "@/shared/components/SelectForm";
import { InputForm } from "@/shared/components/InputForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";


export function InProsecution() {
  const { setFieldValue } = useFormikContext<FormValues>();

  return (
    <>

      <div className={" grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <InputForm label="عنوان القضية" name="caseTitle" type="text" placeholder="عنوان القضية" />


        <SelectForm
          label="اسم الموكل"
          name="clientName"
          options={[
            { label: "احمد", value: "Ahmed" },
            { label: "محمد", value: "Mohammed" },
            { label: "علي", value: "Ali" },
            { label: "خالد", value: "Khalid" },
          ]}
          placeholder="اختر الموكل"
        />


        <SelectForm
          label="حالة القضية"
          name="caseStatus"
          options={[
            { label: "متداولة", value: "pending" },
            { label: "تحت التنفيذ", value: "inProgress" },
            { label: "تحت النظر", value: "review" },
          ]}
          placeholder="اختر حالة القضية"
        />

        <SelectForm
          label="صفة الموكل"
          name="clientType"
          options={[
            { label: "مدعي", value: "individual" },
            { label: "شركة", value: "company" },
          ]}
          placeholder="اختر صفة الموكل"
        />


        <SelectForm
          label="نوع القضية"
          name="caseType"
          options={[
            { label: "جنائي", value: "criminal" },
            { label: "مدني", value: "civil" },
            { label: "تجاري", value: "commercial" },
          ]}
          placeholder="اختر نوع القضية"
        />



        <SelectForm
          label="النيابة"
          name="prosecution"
          options={[
            { label: "نيابة شرق الإسكندرية", value: "prosecution1" },
            { label: "نيابة غرب الإسكندرية", value: "prosecution2" },
            { label: "نيابة وسط الإسكندرية", value: "prosecution3" },
            { label: "نيابة المنتزه", value: "prosecution4" },
          ]}
          onChange={(value) => setFieldValue("prosecution", value)}
        />



        <InputForm label="رقم القضية في النيابة" name="numberInProsecution" type="text" placeholder="رقم القضية في النيابة" />

        <InputForm label="تاريخ تسجيل القضية في النيابة" name="dateInProsecution" type="date" />


        <InputForm label="اسم المحقق" name="investigatorName" type="text" placeholder="اسم المحقق" />
        <InputForm label="جهة التحقيق" name="investigativeAuthority" type="text" placeholder="جهة التحقيق" />


        <InputForm label="رقم القضية في المخفر" name="numberInPoliceStation" type="text" />
        <InputForm label="تاريخ ورود القضية في المكتب" name="dateInOffice" type="date" />
      </div>
      <TextAreaForm label="ملاحظات" name="notes" />
    </>
  );
}