import { useParams } from "react-router-dom";

import { HeaderExpertsSessionInfo } from "./components/HeaderExpertsSessionInfo";
import { useGetLastExpertSession } from "../../api/hooks/useGetLastExpertSession";
import { STATUS_LABEL } from "../../types/ExpertSessionApiTypes";
import LoadingPage from "@/shared/components/LoadingPage";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { InputBox } from "@/shared/components/InputBox";

export const ExpertsSessionInfo = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const { data, isPending, isError } = useGetLastExpertSession(caseId);

  if (isPending) return <LoadingPage />;
  if (isError || !data) return null;

  return (
    <CustomLayoutBorder>
      <HeaderExpertsSessionInfo />
      <div className="grid gap-6 md:grid-cols-2">
        <InputBox
          label="مكتب الخبراء / الخبير"
          text={data.expert_office_name}
        />
        <InputBox label="موضوع الخبرة" text={data.subject_of_expertise} />
        <InputBox label="الرأي النهائي للخبير" text={data.final_opinion} />
        <InputBox
          label="تاريخ إيداع التقرير"
          text={formatDateToYYYYMMDD(data.submission_date)}
        />
        <InputBox label="الحالة" text={STATUS_LABEL[data.status]} />
      </div>
    </CustomLayoutBorder>
  );
};
