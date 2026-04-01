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

// ثوابت الكلاسات
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
  const [addClients, setAddClients] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasContract, setHasContract] = useState(false);

  const initialValues: FormValues = {
    first_name: "",
    email: "",
    password: "",
    contract_file: {} as File,
    authorization_photo: {} as File,
    nationality: "",
    country: "",
    address: "",
    ssn: "",
    profile: {
      client_type: "individual",
      phone: "",
      notes: "",
      contract: {
        start_date: "",
        contract_value: "",
        contract_duration: "",
      },
      account: {
        confirmation_password: "",
      },
    },
  };

  // ✅ دالة تحويل الـ FormValues لـ FormData
  const convertToFormData = (values: FormValues) => {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("email", values.email);
    formData.append("nationality", values.nationality);
    formData.append("address", values.address);
    formData.append("ssn", values.ssn);
    formData.append("country", values.country);
    if (addClients) {
      formData.append("password", values.password);
      formData.append(
        "profile[account][confirmation_password]",
        values.profile.account.confirmation_password
      );
    }
    formData.append("profile[client_type]", values.profile.client_type);
    formData.append("profile[phone]", values.profile.phone);
    formData.append("profile[notes]", values.profile.notes);
    if (hasContract) {
      if (values.profile.contract.start_date) {
        formData.append("profile[contract][start_date]", values.profile.contract.start_date);
      }
      if (values.profile.contract.contract_value) {
        formData.append("profile[contract][contract_value]", values.profile.contract.contract_value);
      }
      if (values.profile.contract.contract_duration) {
        formData.append("profile[contract][contract_duration]", values.profile.contract.contract_duration);
      }
    }

    // --- الملفات: التحقق من وجود الملف قبل إضافته ---
    if (values.contract_file && values.contract_file instanceof File) {
      formData.append("contract_file", values.contract_file);
    }

    if (values.authorization_photo && values.authorization_photo instanceof File) {
      formData.append("authorization_photo", values.authorization_photo);
    }

    return formData;
  };

  const handleSubmit = (values: FormValues) => {
    console.log("Form Values:", values);

    const formData = convertToFormData(values);

    // ✅ أضف هذا الكود لمعرفة البيانات اللي رايحة
    console.log("📤 Sending FormData:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    mutate(formData);
  };

  if (isPending) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema(addClients)}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ setFieldValue }) => (
        <PageLayout>
          <div className="flex items-center gap-2 pb-8">
            <HeaderTitle title="إضافة موكل جديد" />
          </div>
          <div className={CLASSES.formSection}>
            <Form>
              <div>
                <div className="mb-4">
                  <SelectForm
                    name="profile.client_type"
                    label="نوع الموكل"
                    placeholder="اختر نوع الموكل"
                    options={[
                      { value: "individual", label: "أفراد" },
                      { value: "company", label: "شركة" },
                      { value: "lawyer", label: "محامي" },
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
                    <InputForm
                      name="profile.phone"
                      type="string"
                      placeholder="5xxxxxxxxxxxx"
                      label="رقم الهاتف"
                    />
                  </div>
                  <div className="flex items-end">
                    <SelectForm
                      name="country_code"
                      label=""
                      placeholder=" كود الدولة"
                      options={[
                        { value: "966", label: "+966 (السعودية)" },
                        { value: "971", label: "+971 (الإمارات)" },
                        { value: "974", label: "+974 (قطر)" },
                        { value: "965", label: "+965 (الكويت)" },
                        { value: "968", label: "+968 (عُمان)" },
                        { value: "973", label: "+973 (البحرين)" },
                        { value: "962", label: "+962 (الأردن)" },
                        { value: "961", label: "+961 (لبنان)" },
                        { value: "963", label: "+963 (سوريا)" },
                        { value: "970", label: "+970 (فلسطين)" },
                        { value: "20", label: "+20 (مصر)" },
                        { value: "212", label: "+212 (المغرب)" },
                        { value: "213", label: "+213 (الجزائر)" },
                        { value: "216", label: "+216 (تونس)" },
                        { value: "218", label: "+218 (ليبيا)" },
                        { value: "249", label: "+249 (السودان)" },
                        { value: "967", label: "+967 (اليمن)" },
                        { value: "964", label: "+964 (العراق)" },
                        { value: "90", label: "+90 (تركيا)" },
                        { value: "1", label: "+1 (الولايات المتحدة)" },
                        { value: "44", label: "+44 (المملكة المتحدة)" },
                      ]}
                    />
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

              <div
                className={`${CLASSES.flexBetween} ${CLASSES.extraLargeSectionPadding}`}
              >
                <h1 className="text-sm font-medium p-6">هل لديك عقد</h1>
                <Switch
                  checked={hasContract}
                  onCheckedChange={(checked) => {
                    setHasContract(checked);
                    if (!checked) {
                      setFieldValue("profile.contract.start_date", "");
                      setFieldValue("profile.contract.contract_value", "");
                      setFieldValue("profile.contract.contract_duration", "");
                    }
                  }}
                />
              </div>

              {hasContract && (
                <div className="pt-6">
                  <div className={CLASSES.formSection}>
                    <h1 className="pb-7">بيانات العقد</h1>
                    <div className="pb-7">
                      <InputForm
                        name="profile.contract.start_date"
                        type="date"
                        label="تاريخ بداية العقد (اختياري)"
                      />
                    </div>
                    <div className="pb-7">
                      <InputForm
                        name="profile.contract.contract_value"
                        type="string"
                        label="القيمة المتفق عليها (اختياري)"
                        placeholder="50 ألف ريال سعودي"
                      />
                    </div>
                    <div className="pb-7">
                      <InputForm
                        name="profile.contract.contract_duration"
                        type="string"
                        label="مدة العقد (اختياري)"
                        placeholder=" سنتين"
                      />
                    </div>
                    <h1 className="pb-7">صورة العقد</h1>
                    <div className="flex">
                      <div className="h-[99px] w-[121px] mb-8">
                        <FileUpload
                          name="contract_file"
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
                  <h1>صورة التوكيل</h1>
                  <div className="flex">
                    <div className="h-[99px] w-[121px]">
                      <FileUpload
                        name="authorization_photo"
                        label=""
                        placeholder="انقر هنا لتحميل الصوره او سحبها وإفلاتها"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col pt-8">
                    <TextAreaForm name="profile.notes" label=" ملاحظات" />
                  </div>
                </div>
              </div>

              <div className={`${CLASSES.flexBetween} pt-12`}>
                <h1 className="text-sm font-medium">إنشاء حساب للموكل؟</h1>
                <Switch checked={addClients} onCheckedChange={setAddClients} />
              </div>

              {addClients && (
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
                          name="profile.account.confirmation_password"
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