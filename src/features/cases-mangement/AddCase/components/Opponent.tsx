import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useFormikContext } from "formik";

const CLASSES = {
  formSection: "border border-gray-300 p-4 rounded-xl mt-6",
  flexRow: "flex flex-col md:flex-row gap-3",
  submitButton: "w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden",
};


export function OpponentForm() {

  const { setFieldValue } = useFormikContext();
  return (
    <div className="mt-4 p-6 border border-dashed border-gray-200 rounded-xl bg-[#FBFBFB] space-y-4">
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

      <div className={CLASSES.flexRow}>
        <div className="flex-1">
          <InputForm label="الاسم" name="name" type="text" placeholder="بدر" />
        </div>
        <div className="flex-1">
          <InputForm label="الصفة القانونية" name="legal_status" type="text" placeholder="صفة1" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <InputForm label="الرقم القومي" name="ssn" type="text" placeholder="5xxxxxxxxxxxx" />
        <div className="lg:col-span-2 flex gap-2 items-end">
          <div className="w-1/3">
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
          <div className="w-2/3">
            <InputForm label="رقم الهاتف" name="phone" type="text" placeholder="5xxxxxxxxxxxx" />
          </div>
        </div>
      </div>
    </div>
  );
}