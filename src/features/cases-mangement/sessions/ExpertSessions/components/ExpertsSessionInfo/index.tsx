import { useParams } from "react-router-dom";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { InputBox } from "@/shared/components/inputs/InputBox";
import LoadingPage from "@/shared/components/LoadingPage";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { useGetLastExpertSession } from "../../api/hooks/useGetLastExpertSession";
import { STATUS_LABEL } from "../../types/ExpertSessionApiTypes";

export const ExpertsSessionInfo = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const { data, isPending, isError } = useGetLastExpertSession(caseId);

  if (isPending) return <LoadingPage />;
  if (isError || !data) return null;

  return (
    <CustomLayoutBorder>
      <HeaderTitle innerPage title="بيانات اخر تقرير" />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
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
