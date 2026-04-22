import React from "react";
import { EditIcon } from "@/shared/icons/Edit";
import { DateIcon } from "@/shared/icons/Date";
import { OtherBox } from "./OtherBox";
import { useParams } from "react-router-dom";
import { useGetLastOtherSession } from "../api/hooks/useGetLastOtherSession";
import { Error } from "@/shared/components/Error";
import {
  getOtherSessionLawyerName,
  toOtherSessionRequest,
  type OtherSessionFormValues,
} from "./typesOther";
import { AddOtherSessionDialog } from "./AddOtherSessionDialog";
import { useUpdateOtherSession } from "../api/hooks/useUpdateOtherSession";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export const OtherSessionsDataSection: React.FC = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const {
    data: latestSession,
    isError,
    error,
  } = useGetLastOtherSession(caseId);
  console.log("latestSession", latestSession);
  console.log("error", error);
  const updateMutation = useUpdateOtherSession(caseId!);

  const handleSaveChanges = async (
    values: OtherSessionFormValues,
    id?: number,
  ) => {
    if (!id) return;
    await updateMutation.mutateAsync({
      id,
      data: toOtherSessionRequest(values),
    });
  };

  if (isError) {
    return <Error message="حدث خطأ أثناء جلب آخر جلسة إدارية." error={error} />;
  }

  return (
    <div className="rounded-2xl border border-[#eeeeee] bg-white p-4 md:p-6">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold">
          آخر جلسة إدارية
        </h1>
        {latestSession ? (
          <AddOtherSessionDialog
            sessionId={latestSession.id}
            onSave={handleSaveChanges}
            isPending={updateMutation.isPending}
            trigger={
              <button
                type="button"
                className="hover:bg-secondary/90 font-cairo flex h-12.5 items-center gap-2 rounded-lg bg-[#f1f1f3] px-4 py-2 text-sm font-semibold text-[#3D3C48] transition-all hover:text-white"
              >
                <EditIcon className="h-4 w-4" />
                تعديل
              </button>
            }
          />
        ) : null}
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
