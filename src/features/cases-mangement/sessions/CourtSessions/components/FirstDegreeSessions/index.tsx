import { FirstDegreeInfoSessions } from "./components/FirstDegreeInfoSessions";
import { useParams } from "react-router-dom";
import { useGetCourtSessionData } from "../../api";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";

export const FirstDegreeSessions = () => {
  const { id } = useParams<{ id: string }>();
  const { data: firstDegreeData, isPending } = useGetCourtSessionData(
    id || "",
    "first_instance",
  );
  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <>
      {firstDegreeData ? (
        <FirstDegreeInfoSessions courtInfoData={firstDegreeData} />
      ) : (
        <EmptyTable message="لا توجد بيانات أول درجة" />
      )}
    </>
  );
};
