import React from "react";

interface OtherBoxProps {
  label: string;
  text: string;
  icon?: React.ReactNode;
}

export const OtherBox: React.FC<OtherBoxProps> = ({ label, text, icon }) => {
  return (
    <div className="flex w-full flex-col">
      <label className="text-secondary mb-4 block pr-2 text-sm font-normal">
        {label}
      </label>
      <div className="flex min-h-12.5 w-full items-center justify-between rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] p-3 text-base font-normal text-[#464646]">
        <span>{text}</span>
        {icon}
      </div>
    </div>
  );
};
