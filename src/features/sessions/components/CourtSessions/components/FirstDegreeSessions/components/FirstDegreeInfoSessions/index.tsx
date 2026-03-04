import React from "react";
import { FirstDegreeBox } from "./components/FirstDegreeBox";
import type { FirstDegreeInfProps } from "./components/typesFirstDegree";
import { DateIcon } from "@/components/shared/icons/Date";

export const FirstDegreeInfoSessions: React.FC<FirstDegreeInfProps> = ({ firstDegreeData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FirstDegreeBox label="اسم المحكمة" text={firstDegreeData?.courtName} />
        <FirstDegreeBox label="الدور في المحكمة" text={firstDegreeData?.courtRole} />

        <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
          <FirstDegreeBox label="رقم القاعة في المحكمة" text={firstDegreeData?.courtRoomNumber} />

          <FirstDegreeBox label="رقم الدائرة" text={firstDegreeData?.courtCircleNumber} />

          <FirstDegreeBox label="نوع الدائرة" text={firstDegreeData?.courtType} />
        </div>
        <FirstDegreeBox
          label="اسم قاضي الدائرة"
          text={firstDegreeData?.courtJudge}
        />

        <FirstDegreeBox label="اسم سكرتير الدائرة" text={firstDegreeData?.courtSecretary} />
        <FirstDegreeBox label="دور مكتب السكرتير" text={firstDegreeData?.courtSecretaryRole} />

        <FirstDegreeBox label="رقم مكتب السكرتير" text={firstDegreeData?.courtSecretaryNumber} />
        <FirstDegreeBox
          label="تاريخ تسجيل القضية بالمحكمة:"
          text={firstDegreeData?.caseRegistrationDate}
          icon={<DateIcon />}
        />

        <FirstDegreeBox label="تاريخ ووقت الجلسة القادمة" text={firstDegreeData?.nextSessionDate} icon={<DateIcon />} />

      </div>
    </div>
  );
};
