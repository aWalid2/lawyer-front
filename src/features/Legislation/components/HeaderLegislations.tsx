import React from "react";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";

interface HeaderLegislationsProps {
    onSearch: (value: string) => void;
    searchTerm: string;
    onAddClick: () => void;
}

export const HeaderLegislations: React.FC<HeaderLegislationsProps> = ({
    onSearch,
    searchTerm,
    onAddClick
}) => {
    return (
        <HeaderPageLayout>
            <HeaderTitle innerPage title="التشريعات والأحكام" />

            <HeaderSearch value={searchTerm} onChange={onSearch} className=" lg:mr-7 lg:ms-0" />

            <div className="flex items-center gap-3 order-3">
                <button
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-white text-xs md:text-base font-cairo rounded-lg md:rounded-[12px] transition-all whitespace-nowrap h-9 sm:h-10 md:h-[50px] relative overflow-hidden flex-shrink-0 cursor-pointer"
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