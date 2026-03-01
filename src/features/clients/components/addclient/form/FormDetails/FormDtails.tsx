import { Formik, Form, Field } from "formik";
import { useState } from "react";

import type { FormValues } from "../../../table/componnents/typesClients";
import { validationSchema } from "../ValidationSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import arrow from "../../../../../../../public/images/arrow.svg";
import { Eye, EyeOff } from "lucide-react"; 

// ثوابت الكلاسات
const CLASSES = {
  // كلاسات الحقول الأساسية
  inputBase: "w-full border rounded-md p-2 bg-gray-50",
  inputMedium: "h-10 md:h-[50px]",
  inputLarge: "h-[50px]",

  // كلاسات الحقول المدمجة
  inputField: "w-full border rounded-md p-2 bg-gray-50 h-10 md:h-[50px]",
  inputFieldLarge: "w-full border rounded-md p-2 bg-gray-50 h-[50px]",

  // كلاسات الـ Select
  selectTrigger: "w-full border rounded-md p-2 bg-gray-50 h-10 md:h-[50px] flex items-center justify-between ", selectContent: "bg-white z-50 ",

  // كلاسات حاويات رفع الصور
  uploadContainer: "border border-gray-300 border-dashed border-2 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition",
  uploadBox: "w-[150px] h-[125px]",
  uploadBoxSmall: "w-24 md:w-[150px] h-24 md:h-[125px]",

  // كلاسات نصوص رفع الصور
  uploadText: "text-sm text-gray-400 flex flex-col gap-2",
  uploadTextSmall: "text-xs md:text-sm text-gray-400 flex flex-col gap-1 md:gap-2 px-2",

  // كلاسات الحقول مع أيقونة
  fieldWithIcon: "w-full border rounded-md p-2 bg-gray-50 h-10 md:h-[50px] pr-10",

  // كلاسات الحاويات
  formSection: "border border-gray-300 p-4 rounded-xl",
  flexRow: "flex flex-col md:flex-row gap-3",
  flexBetween: "flex justify-between items-center",

  // كلاسات التباعد
  sectionPadding: "pt-3 md:pt-5",
  largeSectionPadding: "pt-8 md:pt-14",
  extraLargeSectionPadding: "pt-16",

  // كلاسات النصوص
  labelText: "block mb-5 text-sm",
  sectionTitle: "text-base md:text-lg",

  // كلاسات الزر
  submitButton: "w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden",
};

const FormDetails = () => {
  const validationSchem = validationSchema;

  const [hasContract, setHasContract] = useState(false);
  const [addClients, setAddClients] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: FormValues = {
    clientType: "individual",
    firstName: "",
    secondName: "",
    countryCode: "+20",
    phone: "",
    civilId: "",
    nationality: "",
    country: "",
    address: "",
    email: "",
    contractStartDate: "",
    contractValue: "",
    contractDuration: "",
    contractImage: null,
    powerOfAttorneyImage: null,
    notes: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchem}
      onSubmit={(values) => {
        console.log("Form Values:", values);
      }}
    >
      {({ values, setFieldValue }) => (
        <div className="p-6 shadow-gray-400 shadow-2xl">
          <div className="flex items-center gap-2 pb-8">
            <img src={arrow} alt="arrow" />
            <h1 className="text-xl font-cairo">إضافة موكل جديد</h1>
          </div>
          <div className={CLASSES.formSection}>
            <Form>
              <div>
                <div className="mb-4">
                  <label className={CLASSES.labelText}>نوع الموكل</label>
                  <Select
                    value={values.clientType}
                    onValueChange={(value) => setFieldValue("clientType", value)}
                    dir="rtl"
                  >
                    <SelectTrigger className={CLASSES.selectTrigger}>
                      <SelectValue placeholder="اختر نوع الموكل" />
                    </SelectTrigger>
                    <SelectContent className={`${CLASSES.selectContent} lg:w-[907px] sm:w-[400px] md:w-[500px] w-full`}>
                      <SelectItem value="individual">أفراد</SelectItem>
                      <SelectItem value="company">شركة</SelectItem>
                      <SelectItem value="lawyer">محامي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={CLASSES.flexRow}>
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
                      onValueChange={(value) => setFieldValue("countryCode", value)}
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

              <div className={`${CLASSES.flexRow} ${CLASSES.sectionPadding}`}>
                <div className="flex-1">
                  <label className={CLASSES.labelText}>الرقم المدني</label>
                  <Field
                    name="civilId"
                    type="text"
                    className={CLASSES.inputField}
                    placeholder="019389384"
                  />
                </div>
                <div className="flex-1">
                  <label className={CLASSES.labelText}>الجنسية</label>
                  <Field
                    name="nationality"
                    type="text"
                    className={CLASSES.inputField}
                    placeholder="سعودي"
                  />
                </div>
                <div className="flex-1">
                  <label className={CLASSES.labelText}>الدولة</label>
                  <Field
                    name="country"
                    type="text"
                    className={CLASSES.inputField}
                    placeholder="المملكة العربية السعودية"
                  />
                </div>
              </div>

              <div className={`${CLASSES.flexRow} ${CLASSES.sectionPadding}`}>
                <div className="flex-1">
                  <label className={CLASSES.labelText}>العنوان</label>
                  <Field
                    name="address"
                    type="text"
                    className={CLASSES.inputField}
                    placeholder="عنوان1"
                  />
                </div>
                <div className="flex-1">
                  <label className={CLASSES.labelText}>البريد الإلكتروني</label>
                  <Field
                    name="email"
                    type="email"
                    className={CLASSES.inputField}
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className={`${CLASSES.flexBetween} ${CLASSES.extraLargeSectionPadding}`}>
                <h1 className="text-sm font-medium p-6">هل لديك عقد</h1>
                <Switch
                  checked={hasContract}
                  onCheckedChange={setHasContract}
                />
              </div>

              {hasContract && (
                <div className="pt-6">
                  <div className={CLASSES.formSection}>
                    <h1 className="pb-7">بيانات العقد</h1>
                    <div className="pb-7">
                      <label className={CLASSES.labelText}>تاريخ بداية العقد</label>
                      <Field
                        name="contractStartDate"
                        type="date"
                        className={CLASSES.inputFieldLarge}
                      />
                    </div>
                    <div className="pb-7">
                      <label className={CLASSES.labelText}>القيمة المتفق عليها</label>
                      <Field
                        name="contractValue"
                        type="text"
                        className={CLASSES.inputFieldLarge}
                        placeholder="50 ألف ريال سعودي"
                      />
                    </div>
                    <div className="pb-7">
                      <label className={CLASSES.labelText}>مدة العقد</label>
                      <Field
                        name="contractDuration"
                        type="text"
                        className={CLASSES.inputFieldLarge}
                        placeholder=" سنتين"
                      />
                    </div>
                    <h1 className="pb-7">صورة العقد</h1>
                    <div className="flex">
                      <div className={`${CLASSES.uploadContainer} ${CLASSES.uploadBox}`}>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="contractImage"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setFieldValue("contractImage", e.target.files[0]);
                            }
                          }}
                        />
                        <label htmlFor="contractImage" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                          <p className={CLASSES.uploadText}>
                            {values.contractImage ? values.contractImage.name : "انقر هنا لتحميل الصوره او سحبها وإفلاتها"}
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className={CLASSES.largeSectionPadding}>
                <div className="flex flex-col gap-4 md:gap-7">
                  <h1 className={CLASSES.sectionTitle}>صورة التوكيل</h1>
                  <div className="flex">
                    <div className={`${CLASSES.uploadContainer} ${CLASSES.uploadBoxSmall}`}>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="powerOfAttorneyImage"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFieldValue("powerOfAttorneyImage", e.target.files[0]);
                          }
                        }}
                      />
                      <label htmlFor="powerOfAttorneyImage" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                        <p className={CLASSES.uploadTextSmall}>
                          {values.powerOfAttorneyImage ? values.powerOfAttorneyImage.name : "انقر هنا لتحميل الصوره او سحبها وإفلاتها"}
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col" dir="rtl">
                    <h1 className={`${CLASSES.sectionTitle} pb-3 md:pb-5 text-right`}>
                      ملاحظات
                    </h1>
                    <Field
                      name="notes"
                      as="textarea"
                      className="w-full border rounded-md p-2 text-sm bg-gray-50 h-20 md:h-[102px] resize-none text-right"
                    />
                  </div>
                </div>
              </div>

              <div className={`${CLASSES.flexBetween} pt-12`}>
                <h1 className="text-sm font-medium">إنشاء حساب للموكل؟</h1>
                <Switch
                  checked={addClients}
                  onCheckedChange={setAddClients}
                />
              </div>

              {addClients && (
                <div className={CLASSES.largeSectionPadding}>
                  <div className="flex flex-col gap-4 md:gap-7 border border-gray-300 rounded-2xl p-3 md:p-5">
                    <div className={`${CLASSES.flexRow} ${CLASSES.sectionPadding}`}>
                      <div className="flex-1 relative">
                        <label className={CLASSES.labelText}>كلمة المرور</label>
                        <div className="relative">
                          <Field
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className={CLASSES.fieldWithIcon}
                            placeholder="*************"
                          />
                          <button
                            type="button"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <label className={CLASSES.labelText}>تأكيد كلمة المرور</label>
                        <div className="relative">
                          <Field
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className={CLASSES.fieldWithIcon}
                            placeholder="**************"
                          />
                          <button
                            type="button"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Form>

            <div className="w-full pt-8">
              <button
                type="submit"
                className={CLASSES.submitButton}
                style={{
                  background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
                }}
              >
                <span className="relative z-10">إضافة الموكل</span>
                <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-black"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FormDetails;