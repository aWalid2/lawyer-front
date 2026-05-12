import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { CaseDetailsInfo } from "./components/CaseDetailsInfo";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { FormCaseDialog } from "./components/FormCaseDialog";
import { useParams } from "react-router-dom";
import { useCaseInfoDetails } from "./hooks/useCaseInfoDetails";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

const CaseInfo: React.FC = () => {
  const { id } = useParams();
  const { caseData, isPending, isError, isSuccess } = useCaseInfoDetails(id);

  return (
    <PageLayout innerPage>
      <div className="mb-6 flex items-center justify-between">
        <HeaderTitle title="معلومات القضية" to="/dashboard/case-management" />
        <FormCaseDialog />
      </div>
      {isPending && <LoadingPage />}
      {isError && <Error />}
      {isSuccess && caseData && <CaseDetailsInfo caseData={caseData} />}
    </PageLayout>
  );
};

export default CaseInfo;
