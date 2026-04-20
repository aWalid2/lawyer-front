import React from "react";
import { AppealBox } from "./components/AppealBox";
import type { CourtInfoInfProps } from "../../../../types/typesCourtSessionInfo";
import { DateIcon } from "@/shared/icons/Date";
import { formatDateToTime, formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export const AppealInfoSessions: React.FC<CourtInfoInfProps> = ({ courtInfoData }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <AppealBox label="اسم المحكمة" text={courtInfoData?.court?.name || "-"} />
                <AppealBox label="الدور في المحكمة" text={courtInfoData?.floor_number || "-"} />

                <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
                    <AppealBox label="رقم القاعة في المحكمة" text={courtInfoData?.hall_number || "-"} />
                    <AppealBox label="رقم الدائرة" text={courtInfoData?.district_number || "-"} />
                    <AppealBox label="نوع الدائرة" text={courtInfoData?.district_type || "-"} />
                </div>
                <AppealBox label="اسم قاضي الدائرة" text={courtInfoData?.judge_name || "-"} />

                <AppealBox label="اسم سكرتير الدائرة" text={courtInfoData?.secretary_name || "-"} />
                <AppealBox label="دور مكتب السكرتير" text={courtInfoData?.secretary_floor || "-"} />

                <AppealBox label="رقم مكتب السكرتير" text={courtInfoData?.secretary_office_number || "-"} />
                <AppealBox
                    label="تاريخ تسجيل القضية بالمحكمة:"
                    text={formatDateToYYYYMMDD(courtInfoData?.registration_date) + " - " + formatDateToTime(courtInfoData?.registration_date) || "-"}
                    icon={<DateIcon />}
                />

                <AppealBox
                    label="تاريخ ووقت الجلسة القادمة"
                    text={formatDateToYYYYMMDD(courtInfoData?.next_session_date) + " - " + formatDateToTime(courtInfoData?.next_session_date) || "-"}
                    icon={<DateIcon />}
                />
            </div>
        </div>
    );
};
