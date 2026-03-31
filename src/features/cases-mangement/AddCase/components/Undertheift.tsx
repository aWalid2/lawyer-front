import { useFormikContext } from "formik";
import type { FormValues } from "../types/typseCase";
import { SelectForm } from "@/shared/components/SelectForm";
import { InputForm } from "@/shared/components/InputForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";


export function UnderTheRift() {
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
            { label: "خالد", value: "Khalid" }
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

        <InputForm label="تاريخ ورود القضية داخل المكتب" name="caseReceiptDate" type="date" />
      </div>

      <TextAreaForm label="ملاحظات" name="notes" placeholder="أضف ملاحظات..." />
    </>
  );
}