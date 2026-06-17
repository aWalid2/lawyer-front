import { useEffect, useRef } from "react";
import { FieldArray, useFormikContext } from "formik";
import { Switch } from "@/components/ui/switch";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import type { FormValues, ContractItem } from "../types/addClientT";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";

const emptyContract: ContractItem = {
  contract_start_date: "",
  contract_value: "",
  contract_duration: "",
  contract_file: null,
};

export const ContractDetails = () => {
  const { values, setFieldValue, validateForm } =
    useFormikContext<FormValues>();

  const prevHasContract = useRef(values.has_contract);

  useEffect(() => {
    if (
      !prevHasContract.current &&
      values.has_contract &&
      values.contracts.length === 0
    ) {
      setFieldValue("contracts", [{ ...emptyContract }]);
    }
    prevHasContract.current = values.has_contract;
  }, [values.has_contract, values.contracts.length, setFieldValue]);

  return (
    <>
      <div className="flex items-center justify-between pt-16">
        <h1 className="p-6 text-sm font-medium">هل لديك عقد</h1>
        <Switch
          checked={values.has_contract}
          onCheckedChange={(checked) => {
            setFieldValue("has_contract", checked);
            if (!checked) {
              setFieldValue("contracts", []);
            }
            setTimeout(() => validateForm(), 100);
          }}
        />
      </div>

      {values.has_contract && (
        <div className="pt-6">
          <FieldArray name="contracts">
            {({ push, remove }) => (
              <div className="space-y-6">
                {values.contracts.length === 0 ? (
                  <CustomLayoutBorder>
                    <div className="flex items-center justify-between">
                      <h2 className="pb-7">بيانات العقد</h2>
                      <button
                        type="button"
                        onClick={() => push({ ...emptyContract })}
                        className="rounded-md border border-[#CBA462]/30 bg-[#CBA462]/10 px-3 py-1 text-sm text-[#CBA462]"
                      >
                        إضافة عقد
                      </button>
                    </div>
                  </CustomLayoutBorder>
                ) : (
                  values.contracts.map((_, index) => {
                    const isLast = index === values.contracts.length - 1;

                    return (
                      <CustomLayoutBorder key={index}>
                        <div className="flex items-center justify-between pb-7">
                          <h2 className="text-sm font-semibold text-[#CBA462]">
                            بيانات العقد {index + 1}
                          </h2>
                          <div className="flex items-center gap-2">
                            {isLast && (
                              <button
                                type="button"
                                onClick={() => push({ ...emptyContract })}
                                className="rounded-md border border-[#CBA462]/30 bg-[#CBA462]/10 px-3 py-1 text-sm text-[#CBA462]"
                              >
                                إضافة عقد
                              </button>
                            )}
                            {values.contracts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="flex h-9 items-center gap-1 rounded-md border border-red-500/20 bg-red-500/10 px-3 text-sm text-red-500 hover:underline"
                              >
                                <span className="text-base leading-none text-red-500">
                                  x
                                </span>
                                إزالة
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:gap-7">
                          <InputForm
                            name={`contracts.${index}.contract_start_date`}
                            type="date"
                            label="تاريخ بداية العقد"
                          />

                          <InputForm
                            name={`contracts.${index}.contract_value`}
                            type="number"
                            label="القيمة المتفق عليها"
                            placeholder="1000 دينار كويتي"
                          />

                          <InputForm
                            name={`contracts.${index}.contract_duration`}
                            type="number"
                            label="مدة العقد بالاشهر"
                            placeholder="12"
                          />

                          <div className="col-span-2">
                            <FileUpload
                              name={`contracts.${index}.contract_file`}
                              label={`صورة العقد ${index + 1}`}
                            />
                          </div>
                        </div>
                      </CustomLayoutBorder>
                    );
                  })
                )}
              </div>
            )}
          </FieldArray>
        </div>
      )}
    </>
  );
};
