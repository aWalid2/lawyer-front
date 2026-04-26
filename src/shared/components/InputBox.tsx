import React from "react";

interface InputBoxProps {
  label: string;
  text: string;
  className?: string;
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  text,
  className,
}) => {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      <label className="mb-4 block text-sm font-normal">{label}</label>
      <div className="min-h-12.5 w-full rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] p-3 text-base font-normal text-[#464646] disabled:opacity-70">
        {text}
      </div>
    </div>
  );
};
