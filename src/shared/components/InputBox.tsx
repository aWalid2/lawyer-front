import React from "react";

interface InputBoxProps {
  label: string;
  text: string | number;
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
    <div className={`flex w-full flex-col ${className} `}>
      <label className="mb-4 block text-sm font-normal dark:text-white/40">
        {label}
      </label>
      <div className="dark:bg-backgroundDark flex min-h-12.5 w-full items-center justify-between rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] p-3 text-base font-normal text-[#464646] disabled:opacity-70 dark:border-white/40 dark:text-white/40">
        <span>{text}</span>
        <span className="dark:text-white">{icon}</span>
      </div>
    </div>
  );
};
