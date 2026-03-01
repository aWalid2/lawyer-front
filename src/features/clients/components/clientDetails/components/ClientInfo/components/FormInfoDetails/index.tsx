import { Form, Formik } from "formik";

import type {
  FormDetailsProps,
  FormValues,
} from "./components/typesClientsInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputForm } from "./components/InputForm";
import ImageFormDetails from "./components/ImageFormDetails";
import { validationSchema } from "./components/ValidationSchema";
import { ButtonSubmit } from "./components/ButtonSubmit";

const FormDetails: React.FC<FormDetailsProps> = ({ isEditing, clientData }) => {
  const validationSchem = validationSchema;

  const initialValues: FormValues = clientData || {
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
    image: "",
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchem}
      onSubmit={(values) => {
        console.log("Form submitted:", values);
      }}
      enableReinitialize={true}
    >
      <div className="border border-[#E8E8E8] p-4 rounded-xl  ">
        <Form>
          <div className="mb-4 ">
            <InputForm
              name="clientCode"
              placeholder="#123456789"
              disabled={true}
              label="كود الموكل"
              type="text"
            />
          </div>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <InputForm
                name="clientName"
                placeholder="أحمد"
                disabled={!isEditing}
                label="اسم الموكل"
                type="text"
              />
            </div>
            <div className="flex-1">
              <InputForm
                dir="ltr"
                name="phone"
                placeholder="5xxxxxxxxxxxx"
                disabled={!isEditing}
                label="رقم الهاتف"
                type="text"
              />
            </div>
            <div className="w-28">
              <Select
                dir="rtl"
                disabled={!isEditing}
                defaultValue={initialValues.countryCode}
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
                disabled={!isEditing}
                label="الرقم المدني"
                type="text"
              />
            </div>
            <div className="flex-1">
              <InputForm
                name="nationality"
                placeholder="سعودي"
                disabled={!isEditing}
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
                disabled={!isEditing}
                label="الدولة"
                type="text"
              />
            </div>

            <div className="flex-1">
              <InputForm
                name="address"
                placeholder="عنوان1"
                disabled={!isEditing}
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
                disabled={!isEditing}
                label="البريد الإلكتروني"
                type="text"
              />
            </div>

            <div className="flex-1">
              <InputForm
                name="registrationDate"
                disabled={!isEditing}
                label="تاريخ التسجيل"
                type="date"
              />
            </div>
          </div>
          <ImageFormDetails isEditing={isEditing} />
          {isEditing && <ButtonSubmit />}
        </Form>
      </div>
    </Formik>
  );
};

export default FormDetails;
