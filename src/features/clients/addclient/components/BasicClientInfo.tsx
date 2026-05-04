import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";
import {
  CLIENT_STATUS_OPTIONS,
  CLIENT_TYPES_OPTIONS,
} from "@/shared/constants/clientOptions";

export const BasicClientInfo = () => {
  return (
    <div>
      <div className="mb-4">
        <SelectForm
          name="client_type"
          label="نوع الموكل"
          placeholder="اختر نوع الموكل"
          options={CLIENT_TYPES_OPTIONS}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
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

      <div className="flex flex-col gap-3 pt-3 md:flex-row md:pt-5">
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

      <div className="flex flex-col gap-3 pt-3 md:flex-row md:pt-5">
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
      <div className="flex flex-col gap-3 pt-3 md:flex-row md:pt-5">
        <div className="flex-1">
          <SelectForm
            name="user_status"
            label="حالة المستخدم"
            options={CLIENT_STATUS_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
};
