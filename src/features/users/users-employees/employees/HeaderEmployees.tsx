import React from "react";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";

interface HeaderEmployeesProps {
  onAddClick: () => void;
}

export const HeaderEmployees: React.FC<HeaderEmployeesProps> = ({
  onAddClick,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="الموظفين" />
      <div className="order-3 flex items-center gap-3">
        <button
          onClick={onAddClick}
          className="font-cairo relative flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-xs whitespace-nowrap text-white transition-all sm:h-10 sm:px-4 sm:py-2.5 md:h-12.5 md:rounded-[12px] md:px-6 md:py-3 md:text-base"
          style={{
            background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
          }}
        >
          <span>+ موظف جديد</span>
        </button>
      </div>
    </HeaderPageLayout>
  );
};
