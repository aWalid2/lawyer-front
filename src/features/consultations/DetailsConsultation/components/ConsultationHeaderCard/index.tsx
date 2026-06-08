import React from "react";
import { CardLayout } from "../CardLayout";
import { StatusInfo } from "./components/StatusInfo";
import { PersonalDetails } from "./components/PersonalDetails";

interface ConsultationHeaderCardProps {
  consultation: any;
}

export const ConsultationHeaderCard: React.FC<ConsultationHeaderCardProps> = ({
  consultation,
}) => {
  return (
    <CardLayout>
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <img
          src="/images/consultaions.png"
          className="h-40 w-40 object-contain"
          alt="consultation"
        />
        <div className="flex flex-1 flex-col items-center justify-between gap-6 sm:flex-row">
          <PersonalDetails consultation={consultation} />
          <StatusInfo consultation={consultation} />
        </div>
      </div>
    </CardLayout>
  );
};
