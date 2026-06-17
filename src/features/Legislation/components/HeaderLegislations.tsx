import React from "react";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";

interface HeaderLegislationsProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onAddClick: () => void;
}

export const HeaderLegislations: React.FC<HeaderLegislationsProps> = ({
  onSearch,
  searchTerm,
  onAddClick,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="التشريعات والأحكام" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        className="lg:ms-0 lg:mr-7"
      />

      <div className="order-3 flex items-center gap-3">
        <button
          onClick={onAddClick}
          className="font-cairo relative flex h-9 flex-shrink-0 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-xs whitespace-nowrap text-white transition-all sm:h-10 sm:px-4 sm:py-2.5 md:h-[50px] md:rounded-[12px] md:px-6 md:py-3 md:text-base"
          style={{
            background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
          }}
        >
          <span>+ إضافة تشريع / حكم</span>
        </button>
      </div>
    </HeaderPageLayout>
  );
};
