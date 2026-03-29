import React from "react";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { useNavigate } from "react-router-dom";

interface HeaderTitleProps {
  title: string;
  to?: string;
  innerPage?: boolean;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, to, innerPage }) => {
  const navigate = useNavigate();
  return (
    <>
      {!innerPage ? <div
        onClick={() => (to ? navigate(to) : navigate(-1))}
        className="flex flex-nowrap items-center gap-2 text-secondary cursor-pointer"
      >
        <ArrowRightIcon className="text-secondary" />
        <h2 className="text-[20px] font-semibold">{title}</h2>
      </div> : <h1 className="text-[18px] font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
        {title}
      </h1>}
    </>
  );
};
