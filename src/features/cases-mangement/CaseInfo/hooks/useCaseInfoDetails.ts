import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { getOptionLabel } from "@/shared/utils/getOptionLabel";
import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";
import type { CaseFormValues } from "../components/CaseDetailsInfo/components/typesCaseInfo";
import { useGetPoliceSessionInfo } from "../../sessions/PoliceSessions/api/hooks/useGetPoliceSessionInfo";
import { useGetProsecutionSessionInfo } from "../../sessions/ProsecutionSessions/api/hooks/useGetProsecutionSessionInfo";
import { useGetLastExpertSession } from "../../sessions/ExpertSessions/api/hooks/useGetLastExpertSession";
import { useGetCourtSessionData } from "../../sessions/CourtSessions/api/hooks/useGetCourtSessionData";
import { useGetCaseInfo } from "../api/hooks/useGetCaseInfo";
import { useGetCaseRelatedContract } from "../api/hooks/useGetCaseRelatedContract";

const normalizeCourtLevel = (level?: string) => {
  if (!level) {
    return undefined;
  }

  const matchedLevel = LITIGATION_LEVEL_OPTIONS.find(
    (option) => option.value === level || option.label === level,
  );

  return matchedLevel?.value || level;
};

type CourtLevel = "first_instance" | "appeal" | "cassation";

export const useCaseInfoDetails = (id?: string) => {
  const caseId = Number(id);
  const caseInfoQuery = useGetCaseInfo(id!);

  const { data: contractData } = useGetCaseRelatedContract(id);

  const currentCourtLevel = caseInfoQuery.data?.Current_court_degree;
  const normalizedCourtLevel = normalizeCourtLevel(currentCourtLevel);

  const { data: policeSessionInfo } = useGetPoliceSessionInfo(caseId);
  const { data: prosecutionSessionInfo } = useGetProsecutionSessionInfo(caseId);
  const { data: lastExpertSession } = useGetLastExpertSession(id);
  const { data: firstInstanceCourtSessionInfo } = useGetCourtSessionData(
    id,
    "first_instance",
  );
  const { data: appealCourtSessionInfo } = useGetCourtSessionData(id, "appeal");
  const { data: cassationCourtSessionInfo } = useGetCourtSessionData(
    id,
    "cassation",
  );

  const courtSessionsByLevel: Record<CourtLevel, unknown> = {
    first_instance: firstInstanceCourtSessionInfo,
    appeal: appealCourtSessionInfo,
    cassation: cassationCourtSessionInfo,
  };

  const fallbackCourtLevel = ([
    "cassation",
    "appeal",
    "first_instance",
  ] as const).find((level) => Boolean(courtSessionsByLevel[level]));

  const selectedCourtLevel =
    (normalizedCourtLevel &&
    courtSessionsByLevel[normalizedCourtLevel as CourtLevel]
      ? normalizedCourtLevel
      : fallbackCourtLevel) || normalizedCourtLevel;

  const selectedCourtSessionInfo = selectedCourtLevel
    ? (courtSessionsByLevel[selectedCourtLevel as CourtLevel] as {
        court?: { name?: string };
      } | null)
    : undefined;

  const caseData: CaseFormValues | undefined = caseInfoQuery.data
    ? {
        autoNumber: String(caseInfoQuery.data?.case_sequence || ""),
        complaintNumber: String(caseInfoQuery.data?.Complaint_Number || ""),
        clientName:
          caseInfoQuery.data?.client?.name ||
          caseInfoQuery.data?.client?.first_name ||
          "",
        caseTitle: caseInfoQuery.data?.case_title,
        court:
          selectedCourtSessionInfo?.court?.name ||
          caseInfoQuery.data?.court?.name ||
          caseInfoQuery.data?.court ||
          "",
        litigationLevel:
          getOptionLabel(selectedCourtLevel, LITIGATION_LEVEL_OPTIONS) ||
          currentCourtLevel ||
          "",
        status: caseInfoQuery.data?.caseStatus?.name || "",
        caseType: caseInfoQuery.data?.case_type?.name || "",
        clientRelation: caseInfoQuery.data?.client_type || "",
        statusOnReceipt: caseInfoQuery.data?.case_situation || "",
        creationDate: formatDateToYYYYMMDD(caseInfoQuery.data?.created_at),
        receiptDate: formatDateToYYYYMMDD(caseInfoQuery.data?.case_entry_date),
        notes: caseInfoQuery.data?.notes || "",
        policeStation:
          policeSessionInfo?.station?.name ||
          caseInfoQuery.data?.police_station?.name ||
          caseInfoQuery.data?.case_police_station?.name ||
          caseInfoQuery.data?.case_police_station ||
          "",
        policeStationCaseNumber: String(
          policeSessionInfo?.case_number ||
            caseInfoQuery.data?.case_number_at_police_station ||
            "",
        ),
        policeStationArrivalDate: formatDateToYYYYMMDD(
          policeSessionInfo?.case_entry ||
            caseInfoQuery.data?.case_arrival_date_at_police_station,
        ),
        prosecution:
          prosecutionSessionInfo?.prosecution?.name ||
          caseInfoQuery.data?.prosecution?.name ||
          caseInfoQuery.data?.public_prosecution?.name ||
          "",
        prosecutionCaseNumber: String(
          prosecutionSessionInfo?.case_number_at_Presecution ||
            caseInfoQuery.data?.case_number_at_prosecution ||
            "",
        ),
        prosecutionRegistrationDate: formatDateToYYYYMMDD(
          prosecutionSessionInfo?.case_regestration_date_at_presecution ||
            caseInfoQuery.data?.regestration_date_of_case_at_prosecution,
        ),
        prosecutorName:
          prosecutionSessionInfo?.Prosecutor_Name ||
          caseInfoQuery.data?.Prosecutor_Name ||
          "",
        detectiveName:
          policeSessionInfo?.judge_name ||
          caseInfoQuery.data?.detective_name ||
          "",
        investigationName:
          policeSessionInfo?.investigation_authirity_transferd_from ||
          caseInfoQuery.data?.investigation_name ||
          "",
        expertReportNumber:
          lastExpertSession?.expert_report_number ||
          caseInfoQuery.data?.expert_report_number ||
          "",
        assigningAuthority:
          lastExpertSession?.assigning_authority ||
          caseInfoQuery.data?.assigning_authority ||
          "",
        expertOfficeName:
          lastExpertSession?.expert_office_name ||
          caseInfoQuery.data?.expert_office_name ||
          "",
        subjectOfExpertise:
          lastExpertSession?.subject_of_expertise ||
          caseInfoQuery.data?.subject_of_expertise ||
          "",
        finalOpinion:
          lastExpertSession?.final_opinion ||
          caseInfoQuery.data?.final_opinion ||
          "",
        authorityArrivalDate: formatDateToYYYYMMDD(
          caseInfoQuery.data?.Case_Arrival_Date_at_the_Authority,
        ),
        caseFeesType: caseInfoQuery.data?.case_fees?.case_fees_type || "",
        contractNumber:
          contractData?.id?.toString() ||
          caseInfoQuery.data?.contract?.contract_number ||
          caseInfoQuery.data?.case_fees?.contract_based?.toString() ||
          "",
        contractStartDate:
          contractData?.start_date?.split("T")[0] ||
          caseInfoQuery.data?.contract?.start_date ||
          caseInfoQuery.data?.contract_start_date ||
          "",
        contractEndDate:
          contractData?.end_date?.split("T")[0] ||
          "",
        contractValue:
          contractData?.contract_value ||
          caseInfoQuery.data?.contract?.contract_value ||
          caseInfoQuery.data?.contract_value ||
          "",
        contractDuration:
          contractData?.contract_duration?.toString() ||
          caseInfoQuery.data?.contract?.contract_duration ||
          caseInfoQuery.data?.contract_duration ||
          "",
        contractDocumentFile: contractData?.document_file || "",
        contractCreatedAt:
          contractData?.created_at?.split("T")[0] || "",
        contractClientName: contractData?.client_profile?.name || "",
        contractClientType: contractData?.client_profile?.client_type || "",
      }
    : undefined;

  return {
    caseData,
    isPending: caseInfoQuery.isPending,
    isError: caseInfoQuery.isError,
    isSuccess: caseInfoQuery.isSuccess,
    error: caseInfoQuery.error,
  };
};