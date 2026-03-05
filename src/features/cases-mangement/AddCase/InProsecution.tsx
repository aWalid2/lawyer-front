import { Field, useFormikContext } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormValues } from "./typseCase";

// ثوابت الكلاسات
const CLASSES = {
  flexRow: "flex flex-col md:flex-row gap-3",
  inputField: "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px]",
  selectTrigger: "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] flex items-center justify-between",
  selectContent: "bg-white z-50 w-full",
  sectionTitle: "text-base md:text-lg",
  labelText: "block mb-5 text-sm",
};

export function InProsecution() {
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

      {/* نوع القضية + النيابة */}
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
          <label className={CLASSES.labelText}>النيابة</label>
          <Select
            value={values.prosecution}
            onValueChange={(value) => setFieldValue("prosecution", value)}
            dir="rtl"
          >
            <SelectTrigger className={CLASSES.selectTrigger}>
              <SelectValue placeholder="اختر النيابة" />
            </SelectTrigger>
            <SelectContent
              className={`${CLASSES.selectContent} lg:w-[447px] sm:w-[250px] md:w-[300px] w-full`}
            >
              <SelectItem value="prosecution1">نيابة شرق الإسكندرية</SelectItem>
              <SelectItem value="prosecution2">نيابة غرب الإسكندرية</SelectItem>
              <SelectItem value="prosecution3">نيابة وسط الإسكندرية</SelectItem>
              <SelectItem value="prosecution4">نيابة المنتزه</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* رقم القضية في النيابة + تاريخ تسجيل القضية في النيابة */}
      <div className={CLASSES.flexRow + " mb-4"}>
        <div className="flex-1">
          <label className={CLASSES.labelText}>رقم القضية في النيابة</label>
          <Field
            name="numberInProsecution"
            type="text"
            className={CLASSES.inputField}
            placeholder="رقم القضية في النيابة"
          />
        </div>
        <div className="flex-1">
          <label className={CLASSES.labelText}>تاريخ تسجيل القضية في النيابة</label>
          <Field
            name="dateInProsecution"
            type="date"
            className={`${CLASSES.inputField} appearance-none text-left`}
          />
        </div>
      </div>

      {/* اسم المحقق + جهة التحقيق */}
      <div className={CLASSES.flexRow + " mb-4"}>
        <div className="flex-1">
          <label className={CLASSES.labelText}>اسم المحقق</label>
          <Field
            name="investigatorName"
            type="text"
            className={CLASSES.inputField}
            placeholder="اسم المحقق"
          />
        </div>
        <div className="flex-1">
          <label className={CLASSES.labelText}>جهة التحقيق</label>
          <Field
            name="investigativeAuthority"
            type="text"
            className={CLASSES.inputField}
            placeholder="جهة التحقيق"
          />
        </div>
      </div>

      {/* رقم القضية في المخفر + تاريخ ورود القضية في المكتب */}
      <div className={CLASSES.flexRow + " mb-4"}>
        <div className="flex-1">
          <label className={CLASSES.labelText}>رقم القضية في المخفر</label>
          <Field
            name="numberInPoliceStation"
            type="text"
            className={CLASSES.inputField}
            placeholder="رقم القضية في المخفر"
          />
        </div>
        <div className="flex-1">
          <label className={CLASSES.labelText}>تاريخ ورود القضية في المكتب</label>
          <Field
            name="dateInOffice"
            type="date"
            className={CLASSES.inputField}
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