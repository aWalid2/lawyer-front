import React from "react";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";

interface HeaderLawyersProps {
    onSearch: (value: string) => void;
    searchTerm: string;
    onAddClick: () => void;
}

export const HeaderLawyers: React.FC<HeaderLawyersProps> = ({
    onSearch,
    searchTerm,
    onAddClick
}) => {
    return (
        <HeaderPageLayout>
            <HeaderTitle innerPage title="المحامين" />
            <div className="flex-1 order-2  lg:mr-25  ">
                <HeaderSearch value={searchTerm} onChange={onSearch} className="lg:ms-0" />
            </div>
            <div className="flex items-center gap-3 order-3">
                <button
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-white text-xs md:text-base font-cairo rounded-lg md:rounded-[12px] transition-all whitespace-nowrap h-9 sm:h-10 md:h-[50px] relative overflow-hidden flex-shrink-0 cursor-pointer"
                    style={{
                        background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
                    }}
                >
                    <span>+ محامي جديد</span>
                </button>
            </div>
        </HeaderPageLayout>
    );
};