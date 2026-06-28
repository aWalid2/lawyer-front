import { FileUpload } from "@/shared/components/FileUpload";
import { InputForm } from "@/shared/components/inputs/InputForm";

export const CivilIdContainer = () => {
  return (
    <div className="flex flex-col items-end md:flex-row">
      <FileUpload name="civil_id_photo" label="صورة البطاقة" />
      <InputForm
        name="expired_civil_id"
        type="date"
        label="تاريخ انتهاء البطاقة"
      />
    </div>
  );
};
