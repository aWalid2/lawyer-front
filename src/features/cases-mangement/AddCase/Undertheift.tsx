import { Field, useFormikContext } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormValues } from "./typseCase";

// ثوابت الكلاسات (يمكن استيرادها من ملف منفصل)
const CLASSES = {
  flexRow: "flex flex-col md:flex-row gap-3",
  inputField: "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px]",
  selectTrigger: "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] flex items-center justify-between",
  selectContent: "bg-white z-50 w-full",
  sectionTitle: "text-base md:text-lg",
  labelText: "block mb-5 text-sm",
};

export function UnderTheRift() {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  return (
    <>
      {/* عنوان القضية + اسم الموكل */}
      <div className={CLASSES.flexRow + " mb-4"}>
        <div className="flex-1">
          <label className={CLASSES.labelText}>عنوان القضية</label>
          <Field
            name="caseTitle"
            type="text"
            className={CLASSES.inputField}
            placeholder="عنوان القضية"
          />
        </div>
        <div className="flex-1">
          <label className={CLASSES.labelText}>اسم الموكل</label>
          <Select
            value={values.clientName}
            onValueChange={(value) => setFieldValue("clientName", value)}
          >
            <SelectTrigger className={CLASSES.selectTrigger}>
              <SelectValue placeholder="اختر الموكل" />
            </SelectTrigger>
            <SelectContent
              className={`${CLASSES.selectContent} lg:w-[447px] sm:w-[250px] md:w-[300px] w-full`}
            >
              <SelectItem value="Ahmed">احمد</SelectItem>
              <SelectItem value="Mohammed">محمد</SelectItem>
              <SelectItem value="Ali">علي</SelectItem>
              <SelectItem value="Khalid">خالد</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* حالة القضية + صفة الموكل */}
      <div className={CLASSES.flexRow + " mb-4"}>
        <div className="flex-1">
          <label className={CLASSES.labelText}>حالة القضية</label>
          <Select
            value={values.caseStatus}
            onValueChange={(value) => setFieldValue("caseStatus", value)}
            dir="rtl"
          >
            <SelectTrigger className={CLASSES.selectTrigger}>
              <SelectValue placeholder="اختر حالة القضية" />
            </SelectTrigger>
            <SelectContent
              className={`${CLASSES.selectContent} lg:w-[447px] sm:w-[250px] md:w-[300px] w-full`}
            >
              <SelectItem value="pending">متداولة</SelectItem>
              <SelectItem value="inProgress">تحت التنفيذ</SelectItem>
              <SelectItem value="review">تحت النظر</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className={CLASSES.labelText}>صفة الموكل</label>
          <Select
            value={values.clientType}
            onValueChange={(value) => setFieldValue("clientType", value)}
            dir="rtl"
          >
            <SelectTrigger className={CLASSES.selectTrigger}>
              <SelectValue placeholder="اختر صفة الموكل" />
            </SelectTrigger>
            <SelectContent
              className={`${CLASSES.selectContent} lg:w-[447px] sm:w-[250px] md:w-[300px] w-full`}
            >
              <SelectItem value="individual">مدعي</SelectItem>
              <SelectItem value="company">شركة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* نوع القضية + تاريخ ورود القضية داخل المكتب */}
      <div className={CLASSES.flexRow + " mb-4"}>
        <div className="flex-1">
          <label className={CLASSES.labelText}>نوع القضية</label>
          <Select
            value={values.caseType}
            onValueChange={(value) => setFieldValue("caseType", value)}
            dir="rtl"
          >
            <SelectTrigger className={CLASSES.selectTrigger}>
              <SelectValue placeholder="اختر نوع القضية" />
            </SelectTrigger>
            <SelectContent
              className={`${CLASSES.selectContent} lg:w-[447px] sm:w-[250px] md:w-[300px] w-full`}
            >
              <SelectItem value="criminal">جنائي</SelectItem>
              <SelectItem value="civil">مدني</SelectItem>
              <SelectItem value="commercial">تجاري</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className={CLASSES.labelText}>
            تاريخ ورود القضية داخل المكتب
          </label>
          <Field
            name="caseReceiptDate"
            type="date"
            className={`${CLASSES.inputField} appearance-none text-left`}
          />
        </div>
      </div>

      {/* ملاحظات */}
      <div className="flex flex-col" dir="rtl">
        <h1 className={`${CLASSES.sectionTitle} pb-3 md:pb-5 text-right`}>
          ملاحظات
        </h1>
        <Field
          name="notes"
          as="textarea"
          className="w-full border rounded-md p-2 text-sm bg-[#FBFBFB] h-20 md:h-[102px] resize-none text-right"
          placeholder="أضف ملاحظات..."
        />
      </div>
    </>
  );
}