import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { FormCaseDetails } from "./components/FormCaseDetails";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { EditIcon } from "@/components/shared/icons/Edit";

const CaseInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="معلومات القضية" />

        <button
          type="button"
          className="flex items-center gap-2 bg-primary-gradient text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium h-12.5 hover:opacity-90"
          onClick={() => setIsEditing(!isEditing)}
        >
          <EditIcon />
          تعديل
        </button>
      </div>
      <FormCaseDetails
        isEditing={isEditing}
        setIsEditing={setIsEditing}
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
