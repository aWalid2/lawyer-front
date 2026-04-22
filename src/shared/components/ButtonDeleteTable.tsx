import React from "react";
import { TrashIcon } from "../icons/Trash";

type ButtonDeleteTableProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonDeleteTable = ({
  className,
  type = "button",
  ...props
}: ButtonDeleteTableProps) => {
  return (
    <button
      type={type}
      title="حذف"
      className={[
        "flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#C60000]/8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <TrashIcon className="size-3.5 text-[#C60000]" />
    </button>
  );
};
