import React from "react";

interface InputBoxProps {
  label: string;
  text: string;
  className?: string;
  icon?: React.ReactNode;
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  text,
  className,
  icon,
}) => {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      <label className="mb-4 block text-sm font-normal">{label}</label>
      <div className="flex min-h-12.5 w-full items-center justify-between rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] p-3 text-base font-normal text-[#464646] disabled:opacity-70">
        <span>{text}</span>
        {icon}
      </div>
    </div>
  );
};
