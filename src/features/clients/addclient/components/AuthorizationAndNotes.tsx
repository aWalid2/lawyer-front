import { FileUpload } from "@/shared/components/FileUpload";
import { TextAreaForm } from "@/shared/components/TextAreaForm";

export const AuthorizationAndNotes = () => {
  return (
    <div className="pt-8 md:pt-14">
      <div className="flex flex-col gap-4 md:gap-7">
        <h1>صورة التوكيل</h1>
        <div className="flex">
          <div style={{ height: 99, width: 121 }}>
            <FileUpload
              name="authorization_photo"
              label=""
              placeholder="انقر هنا لتحميل الصورة او سحبها وإفلاتها"
            />
          </div>
        </div>

        <div className="flex flex-col pt-8">
          <TextAreaForm name="notes" label="ملاحظات" />
        </div>
      </div>
    </div>
  );
};
