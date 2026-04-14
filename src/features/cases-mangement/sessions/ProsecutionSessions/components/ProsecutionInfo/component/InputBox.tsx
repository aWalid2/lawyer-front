import React from "react";

interface InputBoxProps {
  label: string;
  text?: string;
}

export const InputBox: React.FC<InputBoxProps> = ({ label, text }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-4 text-sm font-normal ">{label}</label>
      <div className="w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] h-12.5 text-[#464646] text-base font-normal  disabled:opacity-70">
        {text}
      </div>
    </div>
  );
};
