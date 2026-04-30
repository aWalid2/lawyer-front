import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { Error } from "@/shared/components/Error";
import { InputBox } from "@/shared/components/InputBox";
import { DateIcon } from "@/shared/icons/Date";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import type { AxiosError } from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetLastProcedure } from "../api/hooks/useGetLastProcedure";
import { getProcedureLawyerName } from "../types";

export const ProceduresDataSection: React.FC = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const {
    data: latestProcedure,
    isPending,
    isError,
    error,
  } = useGetLastProcedure(caseId);

  const statusCode = (error as AxiosError | null)?.response?.status;

  if (isPending || !latestProcedure?.id || statusCode === 404) {
    return null;
  }

  if (isError) {
    return <Error message="حدث خطأ أثناء جلب آخر إجراء." error={error} />;
  }

  return (
    <CustomLayoutBorder>
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold">
          آخر إجراء
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <InputBox
          label="نوع الإجراء"
          text={latestProcedure.actionType || "-"}
        />
        <InputBox
          label="تاريخ الإحالة"
          text={formatDateToYYYYMMDD(latestProcedure.referral_date) || "-"}
          icon={<DateIcon />}
        />

        <div className="col-span-1 flex flex-col gap-4 md:col-span-2 md:flex-row">
          <InputBox
            label="الجهة الإدارية"
            text={latestProcedure.admin_authority || "-"}
          />
          <InputBox
            label="المحامي المسؤول"
            text={getProcedureLawyerName(latestProcedure)}
          />
        </div>

        <InputBox
          label="موعد الإجراء"
          text={
            latestProcedure.session_date
              ? [
                  formatDateToYYYYMMDD(latestProcedure.session_date),
                  formatDateToTime(latestProcedure.session_date),
                ]
                  .filter(Boolean)
                  .join(" - ") || "-"
              : "-"
          }
        />
        <InputBox
          label="قرار الإجراء"
          text={latestProcedure.session_decision || "-"}
        />

        <div className="col-span-1 md:col-span-2">
          <InputBox label="ملاحظات" text={latestProcedure.notes || "-"} />
        </div>
      </div>
    </CustomLayoutBorder>
  );
};
