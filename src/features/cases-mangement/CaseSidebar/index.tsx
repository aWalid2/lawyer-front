import React from "react";
import { CaseSummaryCard } from "./Components/CaseSummaryCard";
import { NavigationMenu } from "./Components/NavigationMenu";

const caseData = {
  caseTitle: "قضية سرقة",
  autoNumber: "543257",
  clientName: "علي العتيبي",
  clientCode: "543257",
};

export const CaseSidebar: React.FC = () => {
  return (
    <aside className="w-full sm:w-[273px] bg-white rounded-[12px] shadow-primary py-6 px-4 flex flex-col gap-6 h-fit">
      <CaseSummaryCard caseData={caseData} />

      <NavigationMenu />
    </aside>
  );
};
