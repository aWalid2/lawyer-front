import { useParams } from "react-router-dom";
import { ExpertsSessionBox } from "./components/ExpertsSessionBox";
import { HeaderExpertsSessionInfo } from "./components/HeaderExpertsSessionInfo";
import { useGetLastExpertSession } from "../../api/hooks/useGetLastExpertSession";
import { STATUS_LABEL } from "../../types/ExpertSessionApiTypes";
import LoadingPage from "@/shared/components/LoadingPage";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export const ExpertsSessionInfo = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const { data, isPending, isError } = useGetLastExpertSession(caseId);

  if (isPending) return <LoadingPage />;
  if (isError || !data) return null;

  return (
    <>
      <div className="mb-6 rounded-xl border border-gray-300 p-6">
        <HeaderExpertsSessionInfo />
        <div className="grid gap-6 md:grid-cols-2">
          <ExpertsSessionBox
            label="مكتب الخبراء / الخبير"
            text={data.expert_office_name}
          />
          <ExpertsSessionBox
            label="موضوع الخبرة"
            text={data.subject_of_expertise}
          />
          <ExpertsSessionBox
            label="الرأي النهائي للخبير"
            text={data.final_opinion}
          />
          <ExpertsSessionBox
            label="تاريخ إيداع التقرير"
            text={formatDateToYYYYMMDD(data.submission_date)}
          />
          <ExpertsSessionBox label="الحالة" text={STATUS_LABEL[data.status]} />
        </div>
      </div>
    </>
  );
};
