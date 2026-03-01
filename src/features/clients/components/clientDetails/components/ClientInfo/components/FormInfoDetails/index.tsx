import { Form, Formik } from "formik";

import type { FormValues } from "./components/typesClientsInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputForm } from "./components/InputForm";
import ImageFormDetails from "./components/ImageFormDetails";
import { validationSchema } from "../ValidationSchema";
import { ButtonSubmit } from "./components/ButtonSubmit";

const FormDetails = () => {
  const validationSchem = validationSchema;

  const initialValues: FormValues = {
    clientCode: "",
    clientName: "",
    phone: "",
    countryCode: "+20",
    civilId: "",
    nationality: "",
    country: "",
    address: "",
    email: "",
    registrationDate: "",
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchem}
      onSubmit={() => {}}
    >
      <div className="border border-[#E8E8E8] p-4 rounded-xl ">
        <Form>
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
                  name="civilId"
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
                <InputForm
                  name="email"
                  placeholder="example@gmail.com"
                  disabled={false}
                  label="البريد الإلكتروني"
                  type="text"
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
          <ImageFormDetails />
          <ButtonSubmit />
        </Form>
      </div>
    </Formik>
  );
};

export default FormDetails;
