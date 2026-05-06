import React from "react";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { COUNTRY_OPTIONS } from "@/shared/constants/countryOptions";
import { FieldArray, useFormikContext } from "formik";
import type { FormValues } from "../utils/mapToApiPayload";

const emptyOpponent = {
  name: "",
  legal_status: "",
  country_code: "+20",
  phone: "",
  ssn: "",
};

export function OpponentForm() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const previousHasOpponent = React.useRef(values.has_opponent);

  React.useEffect(() => {
    if (
      !previousHasOpponent.current &&
      values.has_opponent &&
      values.opponents.length === 0
    ) {
      setFieldValue("opponents", [{ ...emptyOpponent }]);
    }
    previousHasOpponent.current = values.has_opponent;
  }, [setFieldValue, values.has_opponent, values.opponents.length]);

  return (
    <FieldArray name="opponents">
      {({ push, remove }) => (
        <div className="mt-4 space-y-4">
          {values.opponents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-[#FBFBFB] p-6">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-[#CBA462]">بيانات الخصم</h4>
                <button
                  type="button"
                  onClick={() => push({ ...emptyOpponent })}
                  className="rounded-md border border-[#CBA462]/30 bg-[#CBA462]/10 px-3 py-1 text-sm text-[#CBA462]"
                >
                  إضافة
                </button>
              </div>
            </div>
          ) : (
            values.opponents.map((_, index) => {
              const isLastOpponent = index === values.opponents.length - 1;

              return (
                <div
                  key={index}
                  className="space-y-4 rounded-xl border border-dashed border-gray-200 bg-[#FBFBFB] p-6"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold text-[#CBA462]">
                      بيانات الخصم
                    </h4>
                    <div className="flex items-center gap-2">
                      {isLastOpponent && (
                        <button
                          type="button"
                          onClick={() => push({ ...emptyOpponent })}
                          className="flex h-9 items-center rounded-md border border-[#CBA462]/30 bg-[#CBA462]/10 px-3 text-sm text-[#CBA462]"
                        >
                          إضافة
                        </button>
                      )}

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
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row">
                    <InputForm
                      label="الاسم"
                      name={`opponents.${index}.name`}
                      type="text"
                      placeholder="بدر"
                      className="w-full"
                    />

                    <InputForm
                      label="الصفة القانونية"
                      name={`opponents.${index}.legal_status`}
                      type="text"
                      placeholder="صفة1"
                      className="w-full"
                    />
                  </div>

                  <div className="mt-6 flex flex-col gap-3 md:flex-row">
                    <InputForm
                      label="الرقم القومي"
                      name={`opponents.${index}.ssn`}
                      type="text"
                      placeholder=""
                      className="h-full!"
                    />
                    <div className="flex h-full! w-full gap-2">
                      <div className="h-full! w-2/3">
                        <InputForm
                          label="رقم الهاتف"
                          name={`opponents.${index}.phone`}
                          type="text"
                          placeholder="5xxxxxxxxxxxx"
                        />
                      </div>
                      <div className="h-full! w-1/3">
                        <SelectForm
                          label="الكود"
                          name={`opponents.${index}.country_code`}
                          showSearch={true}
                          options={COUNTRY_OPTIONS}
                          placeholder="الكود"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </FieldArray>
  );
}
