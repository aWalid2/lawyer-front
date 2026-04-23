import { Link } from "react-router-dom";
import { ViewIcon } from "../icons/View";

export const ViewLinkTablePageDetails = ({ to }: { to: string }) => {
  return (
    <Link
      to={to}
      onClick={(e) => e.stopPropagation()}
      title="عرض التفاصيل"
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F6FF]"
    >
      <ViewIcon className="size-4 text-[#63A4F9]" />
    </Link>
  );
};
