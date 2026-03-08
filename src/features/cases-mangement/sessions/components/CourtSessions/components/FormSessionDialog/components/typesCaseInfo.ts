export interface FirstDegreeFormValues {
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

export interface FormFirsDegreeProps {
  caseData: FirstDegreeFormValues;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}
