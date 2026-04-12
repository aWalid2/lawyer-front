import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { CaseDetailsInfo } from "./components/CaseDetailsInfo";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { FormCaseDialog } from "./components/FormCaseDialog";
import { useParams } from "react-router-dom";
import { useGetCaseInfo } from "./api/hooks/useGetCaseInfo";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

const CaseInfo: React.FC = () => {
  const { id } = useParams();
  const { data: caseInfo, isPending, isError, isSuccess } = useGetCaseInfo(id!) || {};


  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="معلومات القضية" to="/dashboard/case-management" />
        <FormCaseDialog />
      </div>
      {isPending && <LoadingPage />}
      {isError && <Error />}
      {isSuccess && <CaseDetailsInfo
        caseData={{
          autoNumber: caseInfo?.case_sequence,
          complaintNumber: caseInfo?.Complaint_Number,
          clientName: caseInfo?.client.first_name,
          caseTitle: caseInfo?.case_title,
          court: caseInfo?.court,
          litigationLevel: caseInfo?.Current_court_degree,
          status: caseInfo?.caseStatus?.name,
          caseType: caseInfo?.case_type?.name,
          clientRelation: caseInfo?.client_type,
          statusOnReceipt: caseInfo?.case_situation,
          creationDate: caseInfo?.created_at,
          receiptDate: caseInfo?.case_entry_date,
          notes: caseInfo?.notes,
        }}
      />}
    </PageLayout>
  );
};

export default CaseInfo;
