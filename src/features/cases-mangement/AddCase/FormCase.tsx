import { Formik, Form, Field } from "formik";
import { useState } from "react";
import x from "@/public/images/x.svg";
import type { FormValues } from "./typseCase";
import { validationSchema } from "./ValidationSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UnderTheRift } from "./Undertheift";
import { PublicProsecution } from "./PublicProsecution";
import { InProsecution } from "./InProsecution";
import { initialValues } from "./initialValues";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";

// ثوابت الكلاسات (بدون تغيير)
const CLASSES = {
  inputBase: "w-full border rounded-md p-2 bg-[#FBFBFB]",
  inputMedium: "h-10 md:h-[50px]",
  inputLarge: "h-[50px]",
  inputField: "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px]",
  inputFieldLarge: "w-full border rounded-md p-2 bg-[#FBFBFB] h-[50px]",
  selectTrigger:
    "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] flex items-center justify-between",
  selectContent: "bg-white z-50 w-full",
  uploadContainer:
    "border border-gray-300 border-dashed border-2 rounded-xl bg-[#FBFBFB] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition",
  uploadBox: "w-[150px] h-[125px]",
  uploadBoxSmall: "w-24 md:w-[150px] h-24 md:h-[125px]",
  uploadText: "text-sm text-gray-400 flex flex-col gap-2",
  uploadTextSmall:
    "text-xs md:text-sm text-gray-400 flex flex-col gap-1 md:gap-2 px-2",
  fieldWithIcon:
    "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] pr-10",
  formSection: "border border-gray-300 p-4 rounded-xl mt-6",
  flexRow: "flex flex-col md:flex-row gap-3",
  flexBetween: "flex justify-between items-center",
  sectionPadding: "pt-3 md:pt-5",
  largeSectionPadding: "pt-8 md:pt-14",
  extraLargeSectionPadding: "pt-16",
  labelText: "block mb-5 text-sm",
  sectionTitle: "text-base md:text-lg",
  submitButton:
    "w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden",
};

const FormCase = () => {
  const validationSchem = validationSchema;

  const [Discount, setHasDiscount] = useState(false);
  const [feeType, setFeeType] = useState<string>("");
  const [caseType, setCaseType] = useState<string>("");

  // مصفوفة الخيارات
  const feeOptions = [
    { value: "fixed", label: "أتعاب ثابتة" },
    { value: "profit", label: "نسبة من الأرباح" },
    { value: "contract", label: "تابعة للعقد" },
  ];


 

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchem}
      onSubmit={(values) => {
        console.log("Form Values:", values);
      }}
    >
      {({ values, setFieldValue }) => (
        <div >
          <HeaderTitle title="إضافة قضية جديدة" />
          <div className={CLASSES.formSection}>
            <Form>
              {/* وضع القضية */}
              <div className="mb-4">
                <label className={CLASSES.labelText}>
                  وضع القضية عند الاستلام
                </label>
                <Select
                  value={values.caseStatusReceived}
                  onValueChange={(value) => {
                    setFieldValue("caseStatusReceived", value);
                    setCaseType(value);
                  }}
                  dir="rtl"
                >
                  <SelectTrigger className={CLASSES.selectTrigger}>
                    <SelectValue placeholder="اختر وضع القضية" />
                  </SelectTrigger>
                  <SelectContent
                    className={`${CLASSES.selectContent} lg:w-[907px] sm:w-[400px] md:w-[500px] w-full`}
                  >
                    <SelectItem value="pending">تحت الرفع</SelectItem>
                    <SelectItem value="inProgress"> الادعاء العام</SelectItem>
                    <SelectItem value="review"> في النيابة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* الحقول التي تظهر فقط عند اختيار "تحت الرفع" */}
              {caseType === "pending" && (<UnderTheRift /> )}

              {/* الحقول التي تظهر عند اختيار "الادعاء العام" أو "في النيابة" */}
              {(caseType === "inProgress") && ( <PublicProsecution />)}

              {/* باقي الحقل (الخصم، الأتعاب، زر الإرسال) - تظهر في جميع الحالات */}
              {(caseType === "review") && ( <InProsecution/> )}
              {/* Switch الخصم */}
              <div
                className={`${CLASSES.flexBetween} ${CLASSES.extraLargeSectionPadding}`}
              >
                <h1 className="text-sm font-medium p-6">إضافة خصم </h1>
                <Switch
                  checked={Discount}
                  onCheckedChange={setHasDiscount}
                />
              </div>

              {/* بيانات الخصم - تظهر فقط إذا Discount = true */}
              {Discount && (
                <div className="pt-6">
                  <div className={CLASSES.formSection}>
                    <div className="flex items-center justify-between">
                      <h1 className="pb-7">بيانات الخصم</h1>
                      <button className="bg-[#C600001A] p-2 w-[85px] rounded-[20px] text-[#C60000] flex shrink-0 items-center justify-center gap-1">
                        <img src={x} alt="إزالة" className="ml-1" />
                        إزالة
                      </button>
                    </div>
                    <div className={CLASSES.flexRow + " mb-4"}>
                      <div className="flex-1">
                        <label className={CLASSES.labelText}>الاسم</label>
                        <Field
                          name="secondName"
                          type="text"
                          className={CLASSES.inputField}
                          placeholder="أحمد"
                        />
                      </div>
                      <div className="flex-1">
                        <label className={CLASSES.labelText}>
                          الصفة القانونية
                        </label>
                        <Field
                          name="legalStatus"
                          type="text"
                          className={CLASSES.inputField}
                          placeholder="صفة1"
                        />
                      </div>
                    </div>
                    <div className={CLASSES.flexRow}>
                      <div className="flex-1">
                        <label className={CLASSES.labelText}>
                          الرقم القومي{" "}
                        </label>
                        <Field
                          name="civilId"
                          type="text"
                          className={CLASSES.inputField}
                          placeholder="5xxxxxxxxxxxx"
                        />
                      </div>
                      <div className="flex-1">
                        <label className={CLASSES.labelText}>رقم الهاتف</label>
                        <Field
                          name="phone"
                          type="text"
                          className={CLASSES.inputField}
                          placeholder="5xxxxxxxxxxxx"
                        />
                      </div>
                      <div className="w-full md:w-28">
                        <label className={CLASSES.labelText}>الكود</label>
                        <Select
                          value={values.countryCode}
                          onValueChange={(value) =>
                            setFieldValue("countryCode", value)
                          }
                        >
                          <SelectTrigger className={CLASSES.selectTrigger}>
                            <SelectValue placeholder="الكود" />
                          </SelectTrigger>
                          <SelectContent className={CLASSES.selectContent}>
                            <SelectItem value="+20">🇪🇬 +20</SelectItem>
                            <SelectItem value="+966">🇸🇦 +966</SelectItem>
                            <SelectItem value="+971">🇦🇪 +971</SelectItem>
                            <SelectItem value="+1">🇺🇸 +1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-7">
                <label className="px-5 max-sm:text-sm flex shrink-0">
                  هل الاتعاب رقم أم نسبة من الأرباح أم تابعة للعقد ؟
                </label>
                <div className="flex justify-between pt-7 px-5 max-sm:text-sm shrink-0 max-sm:flex-col max-sm:gap-4">
                  {feeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="feeType"
                        value={option.value}
                        checked={feeType === option.value}
                        onChange={(e) => setFeeType(e.target.value)}
                        className="hidden"
                      />
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all max-sm:w-5 max-sm:h-5 shrink-0 ${feeType === option.value
                          ? "border-[#DBDBDB]/32"
                          : "border-[#DBDBDB]"
                          }`}
                      >
                        {feeType === option.value && (
                          <div className="w-5 h-5 rounded-full bg-primary max-sm:w-4 max-sm:h-4 shrink-0"></div>
                        )}
                      </div>
                      <span className="max-sm:text-[12px] shrink-0">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* أتعاب ثابتة - يظهر input رقمي */}
              {feeType === "fixed" && (
                <div className="pt-7 px-3 ">
                  <label className={CLASSES.labelText}> الأتعاب </label>
                  <Field
                    name="fixedFees"
                    type="number"
                    className="w-full border rounded-md p-2 bg-[#FBFBFB] text-black h-10 md:h-[50px]"
                    placeholder="أدخل القيمة"
                  />
                </div>
              )}

              {/* نسبة من الأرباح - يظهر input مع علامة % */}
              {feeType === "profit" && (
                <div className="pt-7 px-3">
                  <label className={CLASSES.labelText}>النسبة</label>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Field
                        name="profitPercentage"
                        type="number"
                        className={`${CLASSES.inputField} w-full`}
                        placeholder="أدخل النسبة"
                      />
                    </div>
                    <span className="text-4xl text-black">%</span>
                  </div>
                </div>
              )}

              {/* تابعة للعقد - لا يظهر شيء */}
              {feeType === "contract" && null}

              {/* زر الإرسال - داخل Form لكي يعمل */}
              <div className="w-full pt-8">
                <button
                  type="submit"
                  className={CLASSES.submitButton}
                  style={{
                    background:
                      "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
                  }}
                >
                  <span className="relative z-10">إضافة قضية</span>
                  <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-black"></div>
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FormCase;