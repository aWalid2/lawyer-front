import { Formik, Form, Field } from "formik";
import { useState } from "react";
import x from "@/public/images/x.svg";
import type { FormValues } from "./types/typseCase";
import { validationSchema } from "./components/ValidationSchema";
import { Switch } from "@/components/ui/switch";
import { UnderTheRift } from "./components/Undertheift";
import { PublicProsecution } from "./components/PublicProsecution";
import { InProsecution } from "./components/InProsecution";
import { initialValues } from "./hooks/initialValues";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { SelectForm } from "@/shared/components/SelectForm";
import { InputForm } from "@/shared/components/InputForm";

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
        <div className="w-full pt-6">
          <HeaderTitle title="إضافة قضية جديدة" />
          <div className={CLASSES.formSection}>
            <Form>

              <div className="mb-4">
                <SelectForm
                  label="وضع القضية عند الاستلام"
                  name="caseStatusReceived"
                  options={[
                    { value: "pending", label: "تحت الرفع" },
                    { value: "inProgress", label: "الادعاء العام" },
                    { value: "review", label: "في النيابة" },
                  ]}
                  placeholder="اختر وضع القضية"
                  onChange={(value) => {
                    setFieldValue("caseStatusReceived", value);
                    setCaseType(value);
                  }}
                />
              </div>

              {caseType === "pending" && (<UnderTheRift />)}

              {(caseType === "inProgress") && (<PublicProsecution />)}

              {(caseType === "review") && (<InProsecution />)}
              <div
                className={`${CLASSES.flexBetween} ${CLASSES.extraLargeSectionPadding}`}
              >
                <h1 className="text-sm font-medium p-6">إضافة خصم </h1>
                <Switch
                  checked={Discount}
                  onCheckedChange={setHasDiscount}
                />
              </div>

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
                        <InputForm label="الاسم" name="secondName" type="text" placeholder="أحمد" />
                      </div>
                      <div className="flex-1">
                        <InputForm label="الصفة القانونية" name="legalStatus" type="text" placeholder="صفة1" />
                      </div>
                    </div>
                    <div className={CLASSES.flexRow}>
                      <div className="flex-1">
                        <InputForm label="الرقم القومي" name="civilId" type="text" placeholder="5xxxxxxxxxxxx" />
                      </div>
                      <div className="flex-1">
                        <InputForm label="رقم الهاتف" name="phone" type="text" placeholder="5xxxxxxxxxxxx" />
                      </div>
                    </div>
                    <div className={CLASSES.flexRow}>
                      <div className="flex-1">
                        <InputForm label="الرقم القومي" name="civilId" type="text" placeholder="5xxxxxxxxxxxx" />
                      </div>
                      <div className="flex-1">
                        <InputForm label="رقم الهاتف" name="phone" type="text" placeholder="5xxxxxxxxxxxx" />
                      </div>
                      <div className="w-full md:w-28">
                        <SelectForm
                          label="الكود"
                          name="countryCode"
                          options={[
                            { value: "+20", label: "🇪🇬 +20" },
                            { value: "+966", label: "🇸🇦 +966" },
                            { value: "+971", label: "🇦🇪 +971" },
                            { value: "+1", label: "🇺🇸 +1" },
                          ]}
                          placeholder="الكود"
                          onChange={(value) => {
                            setFieldValue("countryCode", value);
                          }}
                        />
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

              {feeType === "contract" && null}

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