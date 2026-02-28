import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "formik";
import { InputForm } from "../InputForm";

export default function FirstDetails() {
  return (
    <div>
      <div className="mb-4 ">
        <InputForm
          name="clientCode"
          placeholder="#123456789"
          disabled
          label="كود الموكل"
          type="text"
        />
      </div>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <InputForm
            name="clientName"
            placeholder="أحمد"
            disabled={false}
            label="اسم الموكل"
            type="text"
          />
        </div>
        <div className="flex-1">
          <InputForm
            dir="ltr"
            name="phone"
            placeholder="5xxxxxxxxxxxx"
            disabled={false}
            label="رقم الهاتف"
            type="text"
          />
        </div>
        <div className="w-28">
          <Select
            dir="rtl"
            defaultValue="+20"
            onValueChange={(value) => {
              console.log(value);
            }}
          >
            <SelectTrigger className="w-full border border-[#DBDBDB]/32 rounded-md p-2 bg-[#FBFBFB] h-[50px] text-[#828282]  text-base placeholder:text-[#B5B5B5] ">
              <SelectValue placeholder="الكود" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="+20">🇪🇬 +20</SelectItem>
              <SelectItem value="+966">🇸🇦 +966</SelectItem>
              <SelectItem value="+971">🇦🇪 +971</SelectItem>
              <SelectItem value="+1">🇺🇸 +1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <InputForm
            name="secondName"
            placeholder="019389384"
            disabled={false}
            label="الرقم المدني"
            type="text"
          />
        </div>
        <div className="flex-1">
          <InputForm
            name="nationality"
            placeholder="سعودي"
            disabled={false}
            label="الجنسية"
            type="text"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <InputForm
            name="country"
            placeholder="المملكة العربية السعودية"
            disabled={false}
            label="الدولة"
            type="text"
          />
        </div>

        <div className="flex-1">
          <InputForm
            name="address"
            placeholder="عنوان1"
            disabled={false}
            label="العنوان"
            type="text"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <label className="block mb-5 text-sm">البريد الإلكتروني</label>
          <Field
            name="email"
            type="text"
            className="w-full border border-[#DBDBDB]/32 rounded-md  h-[50px] p-2 bg-[#FBFBFB] text-[#828282] text-base placeholder:text-[#B5B5B5] "
            placeholder="example@gmail.com"
          />
        </div>

        <div className="flex-1">
          <InputForm
            name="registrationDate"
            disabled={false}
            label="تاريخ التسجيل"
            type="date"
            value={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
    </div>
  );
}
