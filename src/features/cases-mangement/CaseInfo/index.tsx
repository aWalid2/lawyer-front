import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { CaseDetailsInfo } from "./components/CaseDetailsInfo";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { FormCaseDialog } from "./components/FormCaseDialog";

const CaseInfo: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="معلومات القضية" to="/dashboard/case-management" />
        <FormCaseDialog />
      </div>
      <CaseDetailsInfo
        caseData={{
          autoNumber: "7363",
          complaintNumber: "234234",
          clientName: "محمد",
          caseTitle: "قضية سرقة",
          court: "sdfsdf",
          litigationLevel: "sdfsdf",
          status: "sdfsdf",
          caseType: "جناية",
          clientRelation: "sdfsdf",
          statusOnReceipt: "sdfsdf",
          creationDate: "2024-01-01",
          receiptDate: "2024-12-31",
          notes: "قضية سرقة",
        }}
      />
    </PageLayout>
  );
};

export default CaseInfo;
