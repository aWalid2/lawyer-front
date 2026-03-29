import { Formik, Form } from "formik";
import { useState } from "react";

import type { FormValues } from "../types";
import { validationSchema } from "../ValidationSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { InputForm } from "@/shared/components/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { TextAreaForm } from "@/shared/components/TextAreaForm";

// ثوابت الكلاسات
const CLASSES = {
  selectTrigger: "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] flex items-center justify-between ", selectContent: "bg-[#FBFBFB] z-50 ",
  fieldWithIcon: "w-full border rounded-md p-2 bg-gray-50 h-10 md:h-[50px] pr-10",
  formSection: "border border-gray-300 p-4 rounded-xl",
  flexRow: "flex flex-col md:flex-row gap-3",
  flexBetween: "flex justify-between items-center",
  sectionPadding: "pt-3 md:pt-5",
  largeSectionPadding: "pt-8 md:pt-14",
  extraLargeSectionPadding: "pt-16",
  labelText: "block mb-5 text-sm",
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
            <HeaderTitle title="إضافة موكل جديد" />
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
                    <InputForm
                      name="secondName"
                      type="string"
                      placeholder="أحمد"
                      label="اسم الموكل"
                    />
                  </div>
                  <div className="flex-1">
                    <InputForm
                      name="phone"
                      type="string"
                      placeholder="5xxxxxxxxxxxx"
                      label="رقم الهاتف"
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
                  <InputForm
                    name="civilId"
                    type="string"
                    placeholder="019389384"
                    label="الرقم المدني"
                  />
                </div>
                <div className="flex-1">
                  <InputForm
                    name="nationality"
                    type="string"
                    label="الجنسية"
                    placeholder="سعودي"
                  />
                </div>
                <div className="flex-1">
                  <InputForm
                    name="country"
                    type="string"
                    label="الدولة"
                    placeholder="المملكة العربية السعودية"
                  />
                </div>
              </div>

              <div className={`${CLASSES.flexRow} ${CLASSES.sectionPadding}`}>
                <div className="flex-1">
                  <InputForm
                    name="address"
                    type="string"
                    label="العنوان"
                    placeholder="عنوان1"
                  />
                </div>
                <div className="flex-1">
                  <InputForm
                    name="email"
                    type="email"
                    label="البريد الإلكتروني"
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
                      <InputForm
                        name="contractStartDate"
                        type="date"
                        label="تاريخ بداية العقد"
                      />

                    </div>
                    <div className="pb-7">
                      <InputForm
                        name="contractValue"
                        type="string"
                        label="القيمة المتفق عليها"
                        placeholder="50 ألف ريال سعودي"
                      />
                    </div>
                    <div className="pb-7">
                      <InputForm
                        name="contractDuration"
                        type="string"
                        label="مدة العقد"
                        placeholder=" سنتين"
                      />
                    </div>
                    <h1 className="pb-7">صورة العقد</h1>
                    <div className="flex">
                      <div className="h-[99px] w-[121px] mb-8">
                        <FileUpload
                          name="contractImage"
                          label=""
                          placeholder="انقر هنا لتحميل الصوره او سحبها وإفلاتها"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className={CLASSES.largeSectionPadding}>
                <div className="flex flex-col gap-4 md:gap-7">
                  <h1 >صورة التوكيل</h1>
                  <div className="flex">
                    <div className="h-[99px] w-[121px]">
                      <FileUpload
                        name="powerOfAttorneyImage"
                        label=""
                        placeholder="انقر هنا لتحميل الصوره او سحبها وإفلاتها"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col pt-8" >
                    <TextAreaForm
                      name="notes"
                      label=" ملاحظات"
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
                        <div className="relative">
                          <InputForm type={showPassword ? "text" : "password"} name="password" placeholder="*************" label="كلمة المرور" />
                          <button
                            type="button"
                            className="absolute left-3 top-[60px] -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <InputForm type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="*************" label="تأكيد كلمة المرور" />
                        <button
                          type="button"
                          className="absolute left-3 top-[60px] -translate-y-1/2 flex   text-gray-500 hover:text-gray-700"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FormDetails;