import { useState } from "react";
import { useFormikContext } from "formik";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import { InputForm } from "@/shared/components/inputs/InputForm";
import type { FormValues } from "../types/addClientT";

export const ClientAccountCreation = () => {
  const { values, setFieldValue, validateForm } =
    useFormikContext<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between pt-12">
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
        <div className="pt-8 md:pt-14">
          <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 p-3 md:gap-7 md:p-5">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <div className="relative">
                  <InputForm
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="*************"
                    label="كلمة المرور"
                  />
                  <button
                    type="button"
                    className="absolute top-[60px] left-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="relative flex-1">
                <InputForm
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmation_password"
                  placeholder="*************"
                  label="تأكيد كلمة المرور"
                />
                <button
                  type="button"
                  className="absolute top-[60px] left-3 flex -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
    </>
  );
};
