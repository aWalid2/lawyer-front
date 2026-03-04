
import { DistinctionInfoSessions } from "./components/DistinctionInfoSessions";

const MOCK_DISTINCTION_DATA = {
    courtName: "نيابة",
    courtRole: "نيابة",
    courtRoomNumber: "نيابة",
    courtCircleNumber: "نيابة",
    courtType: "نيابة",
    courtJudge: "نيابة",
    courtSecretary: "نيابة",
    courtSecretaryRole: "نيابة",
    courtSecretaryNumber: "نيابة",
    caseRegistrationDate: "20/01/2026",
    nextSessionDate: "20/01/2026 9:00AM",
};

export const DistinctionSessions = () => {
    return (
        <>
            <DistinctionInfoSessions distinctionData={MOCK_DISTINCTION_DATA} />

        </>
    );
};
