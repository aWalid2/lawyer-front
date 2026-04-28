import React from "react";

import type { CourtInfoInfProps } from "../../../types/typesCourtSessionInfo";
import { DateIcon } from "@/shared/icons/Date";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import { InputBox } from "@/shared/components/InputBox";

export const DistinctionInfoSessions: React.FC<CourtInfoInfProps> = ({
  courtInfoData,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <InputBox
          label="اسم المحكمة"
          text={courtInfoData?.court?.name || "-"}
        />
        <InputBox
          label="الدور في المحكمة"
          text={courtInfoData?.floor_number || "-"}
        />

        <div className="col-span-1 flex flex-col gap-4 md:col-span-2 md:flex-row">
          <InputBox
            label="رقم القاعة في المحكمة"
            text={courtInfoData?.hall_number || "-"}
          />
          <InputBox
            label="رقم الدائرة"
            text={courtInfoData?.district_number || "-"}
          />
          <InputBox
            label="نوع الدائرة"
            text={courtInfoData?.district_type || "-"}
          />
        </div>
        <InputBox
          label="اسم قاضي الدائرة"
          text={courtInfoData?.judge_name || "-"}
        />

        <InputBox
          label="اسم سكرتير الدائرة"
          text={courtInfoData?.secretary_name || "-"}
        />
        <InputBox
          label="دور مكتب السكرتير"
          text={courtInfoData?.secretary_floor || "-"}
        />

        <InputBox
          label="رقم مكتب السكرتير"
          text={courtInfoData?.secretary_office_number || "-"}
        />
        <InputBox
          label="تاريخ تسجيل القضية بالمحكمة:"
          text={
            formatDateToYYYYMMDD(courtInfoData?.registration_date) +
              " - " +
              formatDateToTime(courtInfoData?.registration_date) || "-"
          }
          icon={<DateIcon />}
        />

        <InputBox
          label="تاريخ ووقت الجلسة القادمة"
          text={
            formatDateToYYYYMMDD(courtInfoData?.next_session_date) +
            " - " +
            formatDateToTime(courtInfoData?.next_session_date)
          }
          icon={<DateIcon />}
        />
      </div>
    </div>
  );
};
