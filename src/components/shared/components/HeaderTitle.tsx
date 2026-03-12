import React from "react";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { useNavigate } from "react-router-dom";

interface HeaderTitleProps {
  title: string;
  to?: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, to }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="flex items-center gap-2 text-secondary cursor-pointer"
    >
      <ArrowRightIcon className="text-secondary" />
      <h2 className="text-[20px] font-semibold">{title}</h2>
    </div>
  );
};
