import { Formik, Form } from "formik";
import { useState } from "react";
import type { FormValues } from "../addclient/types/addClientT";
import { validationSchema } from "../addclient/components/ValidationSchema";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { InputForm } from "@/shared/components/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import PageLayout from "@/shared/components/PageLayout";
import { SelectForm } from "@/shared/components/SelectForm";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { useAddClient } from "./api/hooks/useAddClient";
import parsePhoneNumberFromString from "libphonenumber-js";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";

const CLASSES = {
  fieldWithIcon:
    "w-full border rounded-md p-2 bg-gray-50 h-10 md:h-[50px] pr-10",
  formSection: "border border-gray-300 p-4 rounded-xl",
  flexRow: "flex flex-col md:flex-row gap-3",
  flexBetween: "flex justify-between items-center",
  sectionPadding: "pt-3 md:pt-5",
  largeSectionPadding: "pt-8 md:pt-14",
  extraLargeSectionPadding: "pt-16",
  labelText: "block mb-5 text-sm",
  submitButton:
    "w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden",
};

const FormDetails = () => {
  const { mutate, isPending, isError } = useAddClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: FormValues = {
    first_name: "",
    email: "",
    password: "",
    contract_photo: null,
    authorization_photo: null,
    nationality: "",
    country: "",
    address: "",
    ssn: "",
    phone: "",
    countryCode: "+966",
    has_contract: false,
    add_clients: false,
    client_type: "individual",
    notes: "",
    contract_start_date: "",
    contract_value: "",
    contract_duration: "",
    confirmation_password: "",
    user_status: "",
  };

  const handleSubmit = (values: FormValues) => {
    let formattedPhone = values.phone || "";
    let countryCode = values.countryCode || "+966";
    
    if (values.phone) {
      // البحث عن خيار الدولة للحصول على الـ iso
      const countryOption = COUNTRY_OPTIONS.find(opt => opt.value === values.countryCode);
      const iso = (countryOption as any)?.iso;
      
      if (iso) {
        const phoneNumber = parsePhoneNumberFromString(values.phone, iso);
        if (phoneNumber && phoneNumber.isValid()) {
          formattedPhone = phoneNumber.format("E.164");
        } else {
          // محاولة بدون iso
          const phoneNumberSimple = parsePhoneNumberFromString(values.phone);
          if (phoneNumberSimple && phoneNumberSimple.isValid()) {
            formattedPhone = phoneNumberSimple.format("E.164");
          }
        }
      } else {
        const phoneNumber = parsePhoneNumberFromString(values.phone);
        if (phoneNumber && phoneNumber.isValid()) {
          formattedPhone = phoneNumber.format("E.164");
        }
      }
    }
    
    const dataToSend = {
      first_name: values.first_name,
      email: values.email,
      nationality: values.nationality,
      address: values.address,
      ssn: values.ssn,
      country: values.country,
      phone: formattedPhone,
      countryCode: countryCode,
      notes: values.notes,
      has_contract: values.has_contract,
      contract_start_date: values.contract_start_date,
      contract_value: values.contract_value,
      contract_duration: values.contract_duration,
      add_clients: values.add_clients,
      password: values.password,
      confirmation_password: values.confirmation_password,
      contract_photo: values.contract_photo,
      authorization_photo: values.authorization_photo,
      client_type: values.client_type,
      user_status: values.user_status,
    };
    
    mutate(dataToSend);
  };

  if (isPending) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;



  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ setFieldValue, values, validateForm }) => (
        <PageLayout>
          <div className="flex items-center gap-2 pb-8">
            <HeaderTitle title="إضافة موكل جديد" />
          </div>
          <div className={CLASSES.formSection}>
            <Form>
              <div>
                <div className="mb-4">
                  <SelectForm
                    name="client_type"
                    label="نوع الموكل"
                    placeholder="اختر نوع الموكل"
                    options={[
                      { value: "individual", label: "أفراد" },
                      { value: "company", label: "شركة" },
                      { value: "government", label: "جهة حكومية" },
                    ]}
                  />
                </div>

                <div className={CLASSES.flexRow}>
                  <div className="flex-1">
                    <InputForm
                      name="first_name"
                      type="string"
                      placeholder="أحمد"
                      label="اسم الموكل"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-8">
                        <InputForm
                          name="phone"
                          label="رقم الهاتف"
                          type="tel"
                          placeholder="أدخل رقم الهاتف"
                        />
                      </div>
                      <div className="col-span-4">
                        <SelectForm
                          name="countryCode"
                          label="كود الدولة"
                          options={COUNTRY_OPTIONS}
                          showSearch={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${CLASSES.flexRow} ${CLASSES.sectionPadding}`}>
                <div className="flex-1">
                  <InputForm
                    name="ssn"
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
              <div className={`${CLASSES.flexRow} ${CLASSES.sectionPadding}`}>
                <div className="flex-1">
                  <SelectForm 
                    name="user_status"
                    label="حالة المستخدم"
                    options={[
                      { value: "active", label: "نشط" },
                      { value: "inactive", label: "غير نشط" },
                    ]}
                  />
                </div>
              </div>
              <div
                className={`${CLASSES.flexBetween} ${CLASSES.extraLargeSectionPadding}`}
              >
                <h1 className="text-sm font-medium p-6">هل لديك عقد</h1>
                <Switch
                  checked={values.has_contract}
                  onCheckedChange={(checked) => {
                    setFieldValue("has_contract", checked);
                    if (!checked) {
                      setFieldValue("contract_start_date", "");
                      setFieldValue("contract_value", "");
                      setFieldValue("contract_duration", "");
                    }
                    setTimeout(() => validateForm(), 100);
                  }}
                />
              </div>

              {values.has_contract && (
                <div className="pt-6">
                  <div className={CLASSES.formSection}>
                    <h1 className="pb-7">بيانات العقد</h1>
                    <div className="pb-7">
                      <InputForm
                        name="contract_start_date"
                        type="date"
                        label="تاريخ بداية العقد"
                      />
                    </div>
                    <div className="pb-7">
                      <InputForm
                        name="contract_value"
                        type="string"
                        label="القيمة المتفق عليها"
                        placeholder="50 ألف ريال سعودي"
                      />
                    </div>
                    <div className="pb-7">
                      <InputForm
                        name="contract_duration"
                        type="string"
                        label="مدة العقد"
                        placeholder="سنتين"
                      />
                    </div>
                    <h1 className="pb-7">صورة العقد</h1>
                    <div className="flex">
                      <div className="h-[99px] w-[121px] mb-8">
                        <FileUpload
                          name="contract_photo"
                          label=""
                          placeholder="انقر هنا لتحميل الصورة او سحبها وإفلاتها"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className={CLASSES.largeSectionPadding}>
                <div className="flex flex-col gap-4 md:gap-7">
                  <h1>صورة التوكيل</h1>
                  <div className="flex">
                    <div className="h-[99px] w-[121px]">
                      <FileUpload
                        name="authorization_photo"
                        label=""
                        placeholder="انقر هنا لتحميل الصورة او سحبها وإفلاتها"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col pt-8">
                    <TextAreaForm name="notes" label="ملاحظات" />
                  </div>
                </div>
              </div>

              <div className={`${CLASSES.flexBetween} pt-12`}>
                <h1 className="text-sm font-medium">إنشاء حساب للموكل؟</h1>
                <Switch 
                  checked={values.add_clients} 
                  onCheckedChange={(checked) => {
                    setFieldValue("add_clients", checked);
                    if (!checked) {
                      setFieldValue("password", "");
                      setFieldValue("confirmation_password", "");
                    }
                    setTimeout(() => validateForm(), 100);
                  }} 
                />
              </div>

              {values.add_clients && (
                <div className={CLASSES.largeSectionPadding}>
                  <div className="flex flex-col gap-4 md:gap-7 border border-gray-300 rounded-2xl p-3 md:p-5">
                    <div className={`${CLASSES.flexRow}`}>
                      <div className="flex-1 relative">
                        <div className="relative">
                          <InputForm
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="*************"
                            label="كلمة المرور"
                          />
                          <button
                            type="button"
                            className="absolute left-3 top-[60px] -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <InputForm
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmation_password"
                          placeholder="*************"
                          label="تأكيد كلمة المرور"
                        />
                        <button
                          type="button"
                          className="absolute left-3 top-[60px] -translate-y-1/2 flex text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
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
        </PageLayout>
      )}
    </Formik>
  );
};

export default FormDetails;