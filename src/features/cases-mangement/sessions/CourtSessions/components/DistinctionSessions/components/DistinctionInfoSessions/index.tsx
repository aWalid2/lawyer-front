import React from "react";
import { DistinctionBox } from "./components/DistinctionBox";
import type { CourtInfoInfProps } from "../../../../types/typesCourtSessionInfo";
import { DateIcon } from "@/shared/icons/Date";
import { formatDateToTime, formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export const DistinctionInfoSessions: React.FC<CourtInfoInfProps> = ({
    courtInfoData,
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <DistinctionBox label="اسم المحكمة" text={courtInfoData?.court_id} />
                <DistinctionBox label="الدور في المحكمة" text={courtInfoData?.floor_number} />

                <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
                    <DistinctionBox
                        label="رقم القاعة في المحكمة"
                        text={courtInfoData?.hall_number}
                    />
                    <DistinctionBox
                        label="رقم الدائرة"
                        text={courtInfoData?.district_number}
                    />
                    <DistinctionBox label="نوع الدائرة" text={courtInfoData?.district_type} />
                </div>
                <DistinctionBox
                    label="اسم قاضي الدائرة"
                    text={courtInfoData?.judge_name}
                />

                <DistinctionBox
                    label="اسم سكرتير الدائرة"
                    text={courtInfoData?.secretary_name}
                />
                <DistinctionBox
                    label="دور مكتب السكرتير"
                    text={courtInfoData?.secretary_floor}
                />

                <DistinctionBox
                    label="رقم مكتب السكرتير"
                    text={courtInfoData?.secretary_office_number}
                />
                <DistinctionBox
                    label="تاريخ تسجيل القضية بالمحكمة:"
                    text={formatDateToYYYYMMDD(courtInfoData?.registration_date) + " - " + formatDateToTime(courtInfoData?.registration_date)}
                    icon={<DateIcon />}
                />

                <DistinctionBox
                    label="تاريخ ووقت الجلسة القادمة"
                    text={formatDateToYYYYMMDD(courtInfoData?.next_session_date) + " - " + formatDateToTime(courtInfoData?.next_session_date)}
                    icon={<DateIcon />}
                />
            </div>
        </div>
    );
};
