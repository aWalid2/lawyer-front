import LoadingPage from "@/shared/components/LoadingPage";
import { useParams } from "react-router-dom";
import { useGetCourtSessionData } from "../../api/hooks/useGetCourtSessionData";
import { AppealInfoSessions } from "./components/AppealInfoSessions";
import { EmptyTable } from "@/shared/components/EmptyTable";

export const AppealSessions = () => {
    const { id } = useParams<{ id: string }>();
    const { data: appealData, isPending } = useGetCourtSessionData(id || "", "appeal");

    console.log(appealData);
    if (isPending) {
        return <LoadingPage />;
    }



    return (
        <div className="border border-gray-300 p-6 rounded-xl">
            {appealData ? (
                <AppealInfoSessions appealData={appealData} />
            ) : (
                <EmptyTable message="لا توجد بيانات للاستئناف" />
            )}
        </div>
    );
};
