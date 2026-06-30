export interface CaseFormValues {
  autoNumber: string;
  complaintNumber: string;
  clientName: string;
  caseTitle: string;
  court: string;
  litigationLevel: string;
  status: string;
  caseType: string;
  clientRelation: string;
  statusOnReceipt: string;
  creationDate: string;
  receiptDate: string;
  notes: string;
  policeStation?: string;
  policeStationCaseNumber?: string;
  policeStationArrivalDate?: string;
  prosecution?: string;
  prosecutionCaseNumber?: string;
  prosecutionRegistrationDate?: string;
  prosecutorName?: string;
  detectiveName?: string;
  investigationName?: string;
  expertReportNumber?: string;
  assigningAuthority?: string;
  expertOfficeName?: string;
  subjectOfExpertise?: string;
  finalOpinion?: string;
  authorityArrivalDate?: string;
  caseFeesType?: string;
  contractNumber?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  contractValue?: string;
  contractDuration?: string;
  contractDocumentFile?: string;
  contractCreatedAt?: string;
  contractClientName?: string;
  contractClientType?: string;
  currentCourtDegree?:string;
  caseSequence?:string;
  referenceNumber?:string;

}

export interface DetailField {
  label: string;
  text?: string;
  className?: string;
}

export interface FormCaseDetailsProps {
  caseData: CaseFormValues;

}
