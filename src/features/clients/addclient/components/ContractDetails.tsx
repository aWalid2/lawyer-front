import { useEffect } from "react";
import { useFormikContext } from "formik";
import { Switch } from "@/components/ui/switch";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import type { FormValues } from "../types/addClientT";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";

export const ContractDetails = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  useEffect(() => {
    if (values.has_contract && !values.contract) {
      setFieldValue("contract", {
        contract_start_date: "",
        contract_value: "",
        contract_duration: "",
        contract_file: null,
      });
    }
  }, [values.has_contract, values.contract, setFieldValue]);

  return (
    <>
      <div className="flex items-center justify-between pt-16">
        <h1 className="p-6 text-sm font-medium">هل لديك عقد</h1>
        <Switch
          checked={values.has_contract}
          onCheckedChange={(checked) => {
            setFieldValue("has_contract", checked);
            if (!checked) {
              setFieldValue("contract", null);
            }
          }}
        />
      </div>

      {values.has_contract && values.contract && (
        <div className="pt-6">
          <CustomLayoutBorder>
            <h2 className="pb-7 text-sm font-semibold text-[#CBA462]">
              بيانات العقد
            </h2>

            <div className="grid grid-cols-2 gap-4 md:gap-7">
              <InputForm
                name="contract.contract_start_date"
                type="date"
                label="تاريخ بداية العقد"
              />

              <InputForm
                name="contract.contract_value"
                type="number"
                label="القيمة المتفق عليها"
                placeholder="1000 دينار كويتي"
              />

              <InputForm
                name="contract.contract_duration"
                type="number"
                label="مدة العقد بالاشهر"
                placeholder="12"
              />

              <div className="col-span-2">
                <FileUpload name="contract.contract_file" label="صورة العقد" />
              </div>
            </div>
          </CustomLayoutBorder>
        </div>
      )}
    </>
  );
};
