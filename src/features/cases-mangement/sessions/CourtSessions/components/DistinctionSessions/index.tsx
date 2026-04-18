
import { useParams } from "react-router-dom";
import { DistinctionInfoSessions } from "./components/DistinctionInfoSessions";
import { useGetCourtSessionData } from "../../api";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";

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
    const { id } = useParams();
    const { data: distinctionData, isPending } = useGetCourtSessionData(id || "", "cassation");
    if (isPending) {
        return <LoadingPage />;
    }
    return (
        <>
            {distinctionData ? (
                <DistinctionInfoSessions courtInfoData={distinctionData} />
            ) : (
                <EmptyTable message="لا توجد بيانات للتمييز" />
            )}
        </>
    );
};
