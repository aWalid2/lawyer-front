import React from "react";

interface OtherBoxProps {
  label: string;
  text: string;
  icon?: React.ReactNode;
}

export const OtherBox: React.FC<OtherBoxProps> = ({ label, text, icon }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-4 text-sm font-normal text-secondary pr-2">{label}</label>
      <div className="w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] h-12.5 text-[#464646] text-base font-normal flex justify-between items-center">
        <span>{text}</span>
        {icon}
      </div>
    </div>
  );
};
