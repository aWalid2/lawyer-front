import React from "react";
import { CaseSummaryCard } from "./Components/CaseSummaryCard";
import { NavigationMenu } from "./Components/NavigationMenu";
import { useGetCaseInfo } from "../CaseInfo/api/hooks/useGetCaseInfo";
import { useParams } from "react-router-dom";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";



export const CaseSidebar: React.FC = () => {
  const { id } = useParams();
  const { data: caseInfo, isPending, isError, isSuccess } = useGetCaseInfo(id!) || {};
  return (
    <aside className="w-full xl:w-[273px] bg-white rounded-main shadow-primary py-6 px-4 flex flex-col gap-6 h-fit">
      {isPending && <LoadingPage />}
      {isError && <Error />}
      {isSuccess && <CaseSummaryCard caseData={caseInfo} />}

      <NavigationMenu />
    </aside>
  );
};
