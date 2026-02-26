import React from "react";
import { ArrowRightIcon } from "../icons/ArrowRight";

interface HeaderTitleProps {
  title: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-2 text-secondary">
      <ArrowRightIcon className="text-secondary" />
      <h2 className="text-[20px] font-semibold">{title}</h2>
    </div>
  );
};
