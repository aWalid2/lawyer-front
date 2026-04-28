import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { InputBox } from "@/shared/components/InputBox";
import { useState } from "react";
import { EditModelExpenses } from "./components/EditModelExpenses";

export const ExpensesCaseFeature = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    caseReceiptDate: "",
    receiptStatus: "",
    caseType: "",
    caseStatus: "",
    currentDegree: "",
    fees: "",
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveChanges = (values: any) => {
    console.log("تم الحفظ:", values);
    setFormValues({
      caseReceiptDate: values.caseReceiptDate,
      receiptStatus: values.receiptStatus,
      caseType: values.caseType,
      caseStatus: values.caseStatus,
      currentDegree: values.currentDegree,
      fees: values.fees,
    });
  };

  const documentForModal = {
    id: "1",
    caseReceiptDate: formValues.caseReceiptDate,
    receiptStatus: formValues.receiptStatus,
    caseType: formValues.caseType,
    caseStatus: formValues.caseStatus,
    currentDegree: formValues.currentDegree,
    fees: formValues.fees,
    type: "cases",
  };

  return (
    <CustomLayoutBorder>
      <div className="flex items-center justify-between pb-8">
        <h1 className="font-cairo text-xl">بيانات المصاريف</h1>

        <ButtonUpdateInfo onEdit={handleEditClick} />
      </div>

      <div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputBox label="تاريخ ورود القضية" text={"10/10/2023"} />
          <InputBox label="وضع القضية عند الاستلام" text={"قيد الانتظار"} />

          <InputBox label="نوع القضية" text={"جنائي"} />
          <InputBox label="حالة القضية" text={"قيد الانتظار"} />

          <InputBox label="درجة التقاضي الحالية" text={"الاستئناف"} />
          <InputBox label="الاتعاب" text={"1000"} />

          <InputBox
            label="ملاحظات"
            text={
              "هذه ملاحظة تجريبية لعرض كيفية ظهور الملاحظات في حالة وجود نص طويل. هذه الملاحظة تحتوي على معلومات إضافية حول القضية ويمكن أن تمتد لأكثر من سطر واحد لعرض كيف يتم التعامل مع النصوص الطويلة داخل الصندوق."
            }
            className="md:col-span-2"
          />
        </div>

        <EditModelExpenses
          document={documentForModal}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSave={handleSaveChanges}
        />
      </div>
    </CustomLayoutBorder>
  );
};
