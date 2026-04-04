import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFormikContext } from "formik";

export function OpponentForm() {

  const { setFieldValue } = useFormikContext();
  return (
    <div className="mt-4 p-6 border border-dashed  border-gray-200 rounded-xl bg-[#FBFBFB] space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-[#CBA462]">بيانات الخصم</h4>
        <button
          type="button"
          onClick={() => setFieldValue("has_discount", false)}
          className="text-red-500 text-sm flex items-center gap-1 hover:underline bg-red-500/10 px-2 py-1 rounded-md"
        >
          <span className="text-red-500 text-xl">x</span>
          إزالة
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">

        <InputForm label="الاسم" name="name" type="text" placeholder="بدر" className="w-full" />

        <InputForm label="الصفة القانونية" name="legal_status" type="text" placeholder="صفة1" className="w-full" />
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-6 ">
        <InputForm label="الرقم القومي" name="ssn" type="text" placeholder="5xxxxxxxxxxxx" className="h-full!" />
        <div className="w-full flex gap-2  h-full!">
          <div className="w-1/3 h-full!">
            <SelectForm
              label="الكود"
              name="country_code"
              options={[
                { value: "+20", label: "🇪🇬 +20" },
                { value: "+966", label: "🇸🇦 +966" },
                { value: "+971", label: "🇦🇪 +971" },
                { value: "+1", label: "🇺🇸 +1" },
              ]}
              placeholder="الكود"

            />
          </div>
          <div className="w-2/3 h-full!">
            <InputForm label="رقم الهاتف" name="phone" type="text" placeholder="5xxxxxxxxxxxx" />
          </div>
        </div>
      </div>
    </div>
  );
}