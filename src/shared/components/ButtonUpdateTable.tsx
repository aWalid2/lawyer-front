import React from "react";
import { EditIcon } from "../icons/Edit";

type ButtonUpdateTableProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonUpdateTable = ({
  className,
  type = "button",
  ...props
}: ButtonUpdateTableProps) => {
  return (
    <button
      type={type}
      title="تعديل"
      className={[
        "flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F1F3]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <EditIcon className="size-3.5 text-[#3D3C48]" />
    </button>
  );
};
