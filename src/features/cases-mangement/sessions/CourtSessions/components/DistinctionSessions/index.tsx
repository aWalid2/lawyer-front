import { useParams } from "react-router-dom";
import { DistinctionInfoSessions } from "./components/DistinctionInfoSessions";
import { useGetCourtSessionData } from "../../api";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";

export const DistinctionSessions = () => {
  const { id } = useParams();
  const { data: distinctionData, isPending } = useGetCourtSessionData(
    id || "",
    "cassation",
  );
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
