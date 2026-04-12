import { HeaderTitle } from "@/shared/components/HeaderTitle";
import PageLayout from "@/shared/components/PageLayout";
import { useParams } from "react-router-dom";
import { ClientDetailsCard } from "./components/ClientDetailsCard";
import { ConsultationDescriptionCard } from "./components/ConsultationDescriptionCard";
import { ConsultationHeaderCard } from "./components/ConsultationHeaderCard";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { useGetOneConsultation } from "../api/hooks/useGetOneConsultations";

const DetailsConsultation = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetOneConsultation(id || "");

  if (isLoading) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" error={error} />;
  if (!data) return null;

  const consultation = data;

  return (
    <PageLayout>
      <div className="space-y-6">
        <HeaderTitle title="تفاصيل الاستشارة" />
        <ConsultationHeaderCard consultation={consultation} />
        <ConsultationDescriptionCard description={consultation.consultation_details} />
        <ClientDetailsCard consultation={consultation} />
      </div>
    </PageLayout>
  );
};

export default DetailsConsultation;