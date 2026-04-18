import React from "react";

interface FirstDegreeBoxProps {
  label: string;
  text: string | number | null;
  icon?: React.ReactNode;
}

export const FirstDegreeBox: React.FC<FirstDegreeBoxProps> = ({ label, text, icon }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-4 text-sm font-normal ">{label}</label>
      <div className="w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] h-12.5 text-[#464646] text-base font-normal  disabled:opacity-70 flex justify-between">
        {text}
        {icon}
      </div>
    </div>
  );
};
