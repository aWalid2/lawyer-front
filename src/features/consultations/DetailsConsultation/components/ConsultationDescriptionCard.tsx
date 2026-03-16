import React from "react";
import { CardLayout } from "./CardLayout";

interface ConsultationDescriptionCardProps {
  description: string;
}

export const ConsultationDescriptionCard: React.FC<ConsultationDescriptionCardProps> = ({ description }) => {
  return (
    <CardLayout>
      <h3 className="text-lg font-bold text-secondary">تفاصيل الاستشارة</h3>
      <p className="text-paragraph leading-9 text-xl font-regular mt-4 opacity-75">
        {description}
      </p>
    </CardLayout>
  );
};
