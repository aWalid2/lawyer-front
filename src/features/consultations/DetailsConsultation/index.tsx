import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConsultationHeaderCard } from "./components/ConsultationHeaderCard";
import { ConsultationDescriptionCard } from "./components/ConsultationDescriptionCard";
import { ClientDetailsCard } from "./components/ClientDetailsCard";
import type { Consultation, ConsultationStatus } from "../MainConsultations/types";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import PageLayout from "@/components/shared/components/PageLayout";

// Fallback mock data if ID not found or while loading
const MOCK_CONSULTATIONS: Consultation[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  title: "نزاع عقاري",
  clientName: "خالد العمودي",
  lawyerName: "أ. محمد العشري",
  consultationType: "أحوال شخصية",
  contactMethod: "حضوري",
  details: "و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر بالسعادة التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم عنه بعض المتعة... الهائمون في رغباتهم فلا يدركون ما يعقبها من الألم والأسى المحتم، واللوم كذلك يشمل هؤلاء الذين أخفقوا في واجباتهم نتيجة لضعف إرادتهم فيتساوى مع من لا لم يتحمل جهد بدني شاق إلا من أجل الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد",
  status: (["approved", "rejected", "under_study"][i % 3]) as ConsultationStatus,
  requestDate: "2025-09-30",
  requestTime: "10:16 صباحاً",
  clientNationalId: "245897458",
  clientEmail: "info@aldawli-law.com",
  clientPhone: "+965 2296 5000",
}));

const DetailsConsultation = () => {
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>(null);

  useEffect(() => {
    if (id) {
      const found = MOCK_CONSULTATIONS.find(c => c.id === id);
      setConsultation(found || MOCK_CONSULTATIONS[0]);
    }
  }, [id]);

  if (!consultation) return null;

  return (
    <PageLayout>


      <div className="space-y-6">

        <HeaderTitle title="تفاصيل الاستشارة" />

        <ConsultationHeaderCard consultation={consultation} />

        <ConsultationDescriptionCard description={consultation.details} />

        <ClientDetailsCard consultation={consultation} />
      </div>
    </PageLayout>
  );
};

export default DetailsConsultation;
