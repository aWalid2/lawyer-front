import LoadingPage from "@/shared/components/LoadingPage";
import { useParams } from "react-router-dom";
import { useGetCourtSessionData } from "../../api/hooks/useGetCourtSessionData";
import { AppealInfoSessions } from "./components/AppealInfoSessions";
import { EmptyTable } from "@/shared/components/EmptyTable";

export const AppealSessions = () => {
    const { id } = useParams<{ id: string }>();
    const { data: appealData, isPending } = useGetCourtSessionData(id || "", "appeal");

    if (isPending) {
        return <LoadingPage />;
    }



    return (
        <>
            {appealData ? (
                <AppealInfoSessions courtInfoData={appealData} />
            ) : (
                <EmptyTable message="لا توجد بيانات للاستئناف" />
            )}
        </>
    );
};
