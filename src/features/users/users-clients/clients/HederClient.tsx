import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { Link } from "react-router-dom";

interface HeaderClientProps {
  onSearch: (value: string) => void;
  searchTerm: string;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  onSearch,
  searchTerm,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title=" الموكلين " />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        className="lg:ms-0 lg:mr-25"
      />

      <div className="order-3 flex items-center gap-3">
        <Link
          to="/dashboard/clients/add-client"
          className="font-cairo md:rounded-main relative flex h-9 shrink-0 items-center justify-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-xs whitespace-nowrap text-white transition-all sm:h-10 sm:px-4 sm:py-2.5 md:h-[50px] md:px-6 md:py-3 md:text-base"
          style={{
            background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
          }}
        >
          <span>+ موكل جديد</span>
        </Link>
      </div>
    </HeaderPageLayout>
  );
};
