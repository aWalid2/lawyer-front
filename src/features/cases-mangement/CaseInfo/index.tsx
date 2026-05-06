import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { CaseDetailsInfo } from "./components/CaseDetailsInfo";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { FormCaseDialog } from "./components/FormCaseDialog";
import { useParams } from "react-router-dom";
import { useGetCaseInfo } from "./api/hooks/useGetCaseInfo";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

const CaseInfo: React.FC = () => {
  const { id } = useParams();
  const {
    data: caseInfo,
    isPending,
    isError,
    isSuccess,
  } = useGetCaseInfo(id!) || {};

  return (
    <PageLayout innerPage>
      <div className="mb-6 flex items-center justify-between">
        <HeaderTitle title="معلومات القضية" to="/dashboard/case-management" />
        <FormCaseDialog />
      </div>
      {isPending && <LoadingPage />}
      {isError && <Error />}
      {isSuccess && (
        <CaseDetailsInfo
          caseData={{
            autoNumber: String(caseInfo?.case_sequence || ""),
            complaintNumber: String(caseInfo?.Complaint_Number || ""),
            clientName:
              caseInfo?.client?.name || caseInfo?.client?.first_name || "",
            caseTitle: caseInfo?.case_title,
            court: caseInfo?.court?.name || caseInfo?.court,
            litigationLevel: caseInfo?.Current_court_degree,
            status: caseInfo?.caseStatus?.name,
            caseType: caseInfo?.case_type?.name,
            clientRelation: caseInfo?.client_type,
            statusOnReceipt: caseInfo?.case_situation,
            creationDate: formatDateToYYYYMMDD(caseInfo?.created_at),
            receiptDate: formatDateToYYYYMMDD(caseInfo?.case_entry_date),
            notes: caseInfo?.notes,
            policeStation:
              caseInfo?.police_station?.name ||
              caseInfo?.case_police_station?.name ||
              caseInfo?.case_police_station,
            policeStationCaseNumber: String(
              caseInfo?.case_number_at_police_station || "",
            ),
            policeStationArrivalDate: formatDateToYYYYMMDD(
              caseInfo?.case_arrival_date_at_police_station,
            ),
            prosecution:
              caseInfo?.prosecution?.name || caseInfo?.public_prosecution?.name,
            prosecutionCaseNumber: String(
              caseInfo?.case_number_at_prosecution || "",
            ),
            prosecutionRegistrationDate: formatDateToYYYYMMDD(
              caseInfo?.regestration_date_of_case_at_prosecution,
            ),
            prosecutorName: caseInfo?.Prosecutor_Name,
            detectiveName: caseInfo?.detective_name,
            investigationName: caseInfo?.investigation_name,
            expertReportNumber: caseInfo?.expert_report_number,
            assigningAuthority: caseInfo?.assigning_authority,
            expertOfficeName: caseInfo?.expert_office_name,
            subjectOfExpertise: caseInfo?.subject_of_expertise,
            finalOpinion: caseInfo?.final_opinion,
            authorityArrivalDate: formatDateToYYYYMMDD(
              caseInfo?.Case_Arrival_Date_at_the_Authority,
            ),
          }}
        />
      )}
    </PageLayout>
  );
};

export default CaseInfo;
