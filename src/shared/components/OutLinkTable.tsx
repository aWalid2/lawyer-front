import { Link } from "react-router-dom";
import { SearchIcon } from "../icons/Search";

export const OutLinkTable: React.FC<{
  to: string;
  title?: string;
  className?: string;
}> = ({ to, title }) => {
  return (
    <Link
      to={to}
      onClick={(e) => e.stopPropagation()}
      title={title || "عرض التفاصيل"}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FEEFE2]"
    >
      <SearchIcon className="size-3.5 text-[#F38630]" />
    </Link>
  );
};
