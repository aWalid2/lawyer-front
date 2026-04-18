import React from "react";
import { AppealBox } from "./components/AppealBox";
import type { AppealInfProps } from "./components/typesAppeal";
import { DateIcon } from "@/shared/icons/Date";

export const AppealInfoSessions: React.FC<AppealInfProps> = ({ appealData }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <AppealBox label="اسم المحكمة" text={appealData?.court_id} />
                <AppealBox label="الدور في المحكمة" text={appealData?.floor_number} />

                <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
                    <AppealBox label="رقم القاعة في المحكمة" text={appealData?.hall_number} />
                    <AppealBox label="رقم الدائرة" text={appealData?.district_number} />
                    <AppealBox label="نوع الدائرة" text={appealData?.district_type} />
                </div>
                <AppealBox label="اسم قاضي الدائرة" text={appealData?.judge_name} />

                <AppealBox label="اسم سكرتير الدائرة" text={appealData?.secretary_name} />
                <AppealBox label="دور مكتب السكرتير" text={appealData?.secretary_floor} />

                <AppealBox label="رقم مكتب السكرتير" text={appealData?.secretary_office_number} />
                <AppealBox
                    label="تاريخ تسجيل القضية بالمحكمة:"
                    text={appealData?.registration_date}
                    icon={<DateIcon />}
                />

                <AppealBox
                    label="تاريخ ووقت الجلسة القادمة"
                    text={appealData?.next_session_date}
                    icon={<DateIcon />}
                />
            </div>
        </div>
    );
};
