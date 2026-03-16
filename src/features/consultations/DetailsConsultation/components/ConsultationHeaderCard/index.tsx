import React from "react";
import type { Consultation } from "../../../MainConsultations/types";
import { CardLayout } from "../CardLayout";
import { StatusInfo } from "./components/StatusInfo";
import { PersonalDetails } from "./components/PersonalDetails";

interface ConsultationHeaderCardProps {
  consultation: Consultation;
}



export const ConsultationHeaderCard: React.FC<ConsultationHeaderCardProps> = ({ consultation }) => {
  return (

    <CardLayout>


      <div className="flex flex-col md:flex-row items-center gap-6">

        <img src="/images/consultaions.png" className="w-40 h-40 object-contain" alt="consultation" />


        <div className="flex flex-1 justify-between items-center sm:flex-row flex-col gap-6 ">
          <PersonalDetails consultation={consultation} />
          <StatusInfo consultation={consultation} />

        </div>
      </div>
    </CardLayout>

  );
};
