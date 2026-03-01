import { Field, Form, useFormikContext } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormEditProps {
  errors: any;
  touched: any;
  isSubmitting: boolean;
}

function FormEdit({ isSubmitting }: FormEditProps) {
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <Form className="grid grid-cols-1 md:grid-cols-2 gap-5" dir="rtl">
      {/* الصف الأول: نوع الموكل + الاسم */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm md:text-base mb-5">نوع الموكل</label>
          <Select
            value={values.clientType}
            onValueChange={(value) => setFieldValue("clientType", value)}
          >
            <SelectTrigger className="w-full p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] h-10 md:h-[45px]">
              <SelectValue placeholder="اختر نوع الموكل" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50 w-full">
              <SelectItem value="individual">أفراد</SelectItem>
              <SelectItem value="company">شركات</SelectItem>
              <SelectItem value="lawyer">محامي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm md:text-base mb-5">الاسم</label>
          <Field
            name="name"
            className="w-full p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] text-xs sm:text-sm md:text-base h-10 md:h-[45px]"
          />
        </div>
      </div>

      {/* الصف الثاني: الرقم المدني + رقم الهاتف والكود */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm md:text-base mb-5">الرقم المدني</label>
          <Field
            name="nationalId"
            className="w-full p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] text-xs sm:text-sm md:text-base h-10 md:h-[45px]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm md:text-base mb-5">رقم الهاتف</label>
          <div className="flex flex-row gap-2">
            <Field
              name="phone"
              className="flex-1 p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] text-xs sm:text-sm md:text-base h-10 md:h-[45px]"
              placeholder="5xxxxxxxx"
            />
            <Select
              value={values.countryCode || "+966"}
              onValueChange={(value) => setFieldValue("countryCode", value)}
            >
              <SelectTrigger className="w-28 p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] h-10 md:h-[45px] flex items-center gap-1">
                <SelectValue placeholder="+966" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="+966">🇸🇦 +966</SelectItem>
                <SelectItem value="+20">🇪🇬 +20</SelectItem>
                <SelectItem value="+971">🇦🇪 +971</SelectItem>
                <SelectItem value="+1">🇺🇸 +1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* الصف الثالث: البريد الإلكتروني + الجنسية */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm md:text-base mb-5">البريد الإلكتروني</label>
          <Field
            name="email"
            type="email"
            className="w-full p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] text-xs sm:text-sm md:text-base h-10 md:h-[45px]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm md:text-base mb-5">الجنسية</label>
          <Select
            value={values.nationality}
            onValueChange={(value) => setFieldValue("nationality", value)}
          >
            <SelectTrigger className="w-full p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] h-10 md:h-[45px]">
              <SelectValue placeholder="اختر الجنسية" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50 w-full">
              <SelectItem value="سعودي">🇸🇦 سعودي</SelectItem>
              <SelectItem value="مصري">🇪🇬 مصري</SelectItem>
              <SelectItem value="أردني">🇯🇴 أردني</SelectItem>
              <SelectItem value="كويتي">🇰🇼 كويتي</SelectItem>
              <SelectItem value="إماراتي">🇦🇪 إماراتي</SelectItem>
              <SelectItem value="قطري">🇶🇦 قطري</SelectItem>
              <SelectItem value="بحريني">🇧🇭 بحريني</SelectItem>
              <SelectItem value="عماني">🇴🇲 عماني</SelectItem>
              <SelectItem value="أجنبي">أجنبي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* الصف الرابع: الدولة + العنوان */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm md:text-base mb-5">الدولة</label>
          <Select
            value={values.country}
            onValueChange={(value) => setFieldValue("country", value)}
          >
            <SelectTrigger className="w-full p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] h-10 md:h-[45px]">
              <SelectValue placeholder="اختر الدولة" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50 w-full">
              <SelectItem value="المملكة العربية السعودية">🇸🇦 المملكة العربية السعودية</SelectItem>
              <SelectItem value="مصر">🇪🇬 مصر</SelectItem>
              <SelectItem value="الإمارات">🇦🇪 الإمارات</SelectItem>
              <SelectItem value="الكويت">🇰🇼 الكويت</SelectItem>
              <SelectItem value="قطر">🇶🇦 قطر</SelectItem>
              <SelectItem value="البحرين">🇧🇭 البحرين</SelectItem>
              <SelectItem value="عمان">🇴🇲 عمان</SelectItem>
              <SelectItem value="الأردن">🇯🇴 الأردن</SelectItem>
              <SelectItem value="الولايات المتحدة">🇺🇸 الولايات المتحدة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm md:text-base mb-5">العنوان</label>
          <Field
            name="address"
            className="w-full p-1 sm:p-1.5 md:p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A473] text-xs sm:text-sm md:text-base h-10 md:h-[45px]"
          />
        </div>
      </div>

      {/* صورة الموكل - تمتد على عمودين */}
      <div className="col-span-1 md:col-span-2 flex flex-col items-center sm:items-start pt-2 sm:pt-3 md:pt-4">
        <label className="text-xs md:text-sm font-bold text-[#1A3352] text-center sm:text-right mb-5">
          صورة الموكل
        </label>

        <div className="flex justify-center sm:justify-start w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-lg md:rounded-2xl border-2 md:border-3 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors shadow-sm bg-gray-50 hover:bg-gray-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="clientImage"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFieldValue("clientImage", e.target.files[0]);
                }
              }}
            />
            <label htmlFor="clientImage" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
              <span className="text-center px-1.5 font-medium text-xs">
                {values.clientImage ? values.clientImage.name : "اسحب أو اضغط"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* زر الحفظ - تمتد على عمودين */}
      <div className="col-span-1 md:col-span-2 bottom-0 bg-white pt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#D4B37D] hover:bg-[#c4a169] text-white font-bold py-2 sm:py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all shadow-md active:scale-[0.98] text-xs sm:text-sm md:text-base disabled:opacity-60"
        >
          {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>
    </Form>
  );
}

export default FormEdit;