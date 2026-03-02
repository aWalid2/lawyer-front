import { Field } from "formik";
import React from "react";

type InputFormProps = {
  name: string;
  placeholder?: string;
  disabled: boolean;
  label: string;
  type: string;
  dir?: string;
};

export const InputForm: React.FC<InputFormProps> = ({
  name,
  placeholder,
  disabled,
  label,
  type,
  dir,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-4 text-sm font-normal ">{label}</label>
      <Field
        dir={dir}
        name={name}
        type={type}
        className="w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] h-12.5 text-[#464646] text-base font-normal  disabled:opacity-70"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
