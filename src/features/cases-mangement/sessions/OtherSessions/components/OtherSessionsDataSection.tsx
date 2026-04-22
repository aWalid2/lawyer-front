import { Error } from "@/shared/components/Error";
import { DateIcon } from "@/shared/icons/Date";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetLastOtherSession } from "../api/hooks/useGetLastOtherSession";
import { OtherBox } from "./OtherBox";
import { getOtherSessionLawyerName } from "./typesOther";

import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export const OtherSessionsDataSection: React.FC = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const {
    data: latestSession,
    isError,
    error,
  } = useGetLastOtherSession(caseId);

  if (isError) {
    return <Error message="حدث خطأ أثناء جلب آخر جلسة إدارية." error={error} />;
  }

  return (
    <div className="rounded-2xl border border-[#eeeeee] bg-white p-4 md:p-6">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold">
          آخر جلسة إدارية
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <OtherBox label="نوع الإجراء" text={latestSession?.actionType || "-"} />
        <OtherBox
          label="تاريخ الإحالة"
          text={formatDateToYYYYMMDD(latestSession?.referral_date) || "-"}
          icon={<DateIcon />}
        />

        <div className="col-span-1 flex flex-col gap-4 md:col-span-2 md:flex-row">
          <OtherBox
            label="الجهة الإدارية"
            text={latestSession?.admin_authority || "-"}
          />
          <OtherBox
            label="المحامي المسؤول"
            text={getOtherSessionLawyerName(latestSession)}
          />
        </div>

        <OtherBox
          label="موعد الجلسة"
          text={
            latestSession?.session_date
              ? latestSession.session_date.replace("T", " ")
              : "-"
          }
        />
        <OtherBox
          label="قرار الجلسة"
          text={latestSession?.session_decision || "-"}
        />

        <div className="col-span-1 md:col-span-2">
          <OtherBox label="ملاحظات" text={latestSession?.notes || "-"} />
        </div>
      </div>
    </div>
  );
};
