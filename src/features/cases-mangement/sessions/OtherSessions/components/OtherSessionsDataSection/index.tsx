import { Error } from "@/shared/components/Error";
import { DateIcon } from "@/shared/icons/Date";
import type { AxiosError } from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetLastOtherSession } from "../../api/hooks/useGetLastOtherSession";
import { OtherBox } from "./components/OtherBox";
import { getOtherSessionLawyerName } from "../../types/typesOther";

import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export const OtherSessionsDataSection: React.FC = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const {
    data: latestSession,
    isPending,
    isError,
    error,
  } = useGetLastOtherSession(caseId);

  const statusCode = (error as AxiosError | null)?.response?.status;

  if (isPending || !latestSession?.id || statusCode === 404) {
    return null;
  }

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
              ? formatDateToYYYYMMDD(latestSession.session_date) +
                " " +
                latestSession.session_date.split("T")[1].slice(0, 5)
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
