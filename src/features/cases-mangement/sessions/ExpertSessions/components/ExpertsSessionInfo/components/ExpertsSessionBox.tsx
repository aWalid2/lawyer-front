import React from "react";

interface AppealBoxProps {
  label: string;
  text: string | number | null;
  icon?: React.ReactNode;
}

export const ExpertsSessionBox: React.FC<AppealBoxProps> = ({
  label,
  text,
  icon,
}) => {
  return (
    <div className="flex w-full flex-col">
      <label className="mb-4 block text-sm font-normal">{label}</label>
      <div className="flex min-h-12.5 w-full items-start justify-between rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] p-3 text-base font-normal wrap-break-word text-[#464646] disabled:opacity-70">
        {text || "لا يوجد"}
        {icon}
      </div>
    </div>
  );
};
