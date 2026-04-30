import React from "react";
import { ViewIcon } from "../icons/View";

type ButtonViewTableProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonViewTable = ({
  className,
  type = "button",
  ...props
}: ButtonViewTableProps) => {
  return (
    <button
      type={type}
      title="عرض التفاصيل"
      className={[
        "flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F6FF]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <ViewIcon className="size-4 text-[#63A4F9]" />
    </button>
  );
};
