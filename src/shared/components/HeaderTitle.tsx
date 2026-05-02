import React from "react";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { useNavigate } from "react-router-dom";

interface HeaderTitleProps {
  title: string;
  to?: string;
  innerPage?: boolean;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  to,
  innerPage,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {!innerPage ? (
        <div
          onClick={() => (to ? navigate(to) : navigate(-1))}
          className="text-secondary flex cursor-pointer flex-nowrap items-center gap-2 dark:text-white/70"
        >
          <ArrowRightIcon className="text-secondary dark:text-white/70" />
          <h2 className="text-[20px] font-semibold">{title}</h2>
        </div>
      ) : (
        <h1 className="text-secondary font-cairo self-start text-[18px] font-semibold whitespace-nowrap md:self-center dark:text-white/70">
          {title}
        </h1>
      )}
    </>
  );
};
