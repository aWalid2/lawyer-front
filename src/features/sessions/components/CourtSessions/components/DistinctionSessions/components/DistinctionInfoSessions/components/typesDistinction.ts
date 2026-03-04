export interface DistinctionValues {
  courtName: string;
  courtRole: string;
  courtRoomNumber: string;
  courtCircleNumber: string;
  courtType: string;
  courtJudge: string;
  courtSecretary: string;
  courtSecretaryRole: string;
  courtSecretaryNumber: string;
  caseRegistrationDate: string;
  nextSessionDate: string;
}

export interface DistinctionInfProps {
  distinctionData: DistinctionValues;
}
