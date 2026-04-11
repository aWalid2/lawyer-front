import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
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
    <HeaderPageLayout >

      <HeaderTitle innerPage title=" الموكلين " />



      <HeaderSearch value={searchTerm} onChange={onSearch} className="lg:mr-25 lg:ms-0" />

      <div className="flex items-center gap-3 order-3">
        <Link
          to="/dashboard/clients/add-client"
          className="flex items-center justify-center gap-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-white text-xs md:text-base font-cairo rounded-lg md:rounded-main transition-all whitespace-nowrap h-9 sm:h-10 md:h-[50px] relative overflow-hidden shrink-0"
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