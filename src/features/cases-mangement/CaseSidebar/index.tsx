import React from "react";
import { CaseSummaryCard } from "./Components/CaseSummaryCard";
import { NavigationMenu } from "./Components/NavigationMenu";
import { useGetCaseInfo } from "../CaseInfo/api/hooks/useGetCaseInfo";
import { useParams } from "react-router-dom";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

export const CaseSidebar: React.FC = () => {
  const { id } = useParams();
  const {
    data: caseInfo,
    isPending,
    isError,
    isSuccess,
  } = useGetCaseInfo(id!) || {};
  return (
    <aside className="rounded-main shadow-primary dark:bg-backgroundDark flex h-fit w-full flex-col gap-6 bg-white px-4 py-6 xl:w-68.25">
      {isPending && <LoadingPage />}
      {isError && <Error />}
      {isSuccess && <CaseSummaryCard caseData={caseInfo} />}

      <NavigationMenu />
    </aside>
  );
};
