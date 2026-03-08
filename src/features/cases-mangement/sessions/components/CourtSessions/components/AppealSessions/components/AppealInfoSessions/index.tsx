import React from "react";
import { AppealBox } from "./components/AppealBox";
import type { AppealInfProps } from "./components/typesAppeal";
import { DateIcon } from "@/components/shared/icons/Date";

export const AppealInfoSessions: React.FC<AppealInfProps> = ({ appealData }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <AppealBox label="اسم المحكمة" text={appealData?.courtName} />
                <AppealBox label="الدور في المحكمة" text={appealData?.courtRole} />

                <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
                    <AppealBox label="رقم القاعة في المحكمة" text={appealData?.courtRoomNumber} />
                    <AppealBox label="رقم الدائرة" text={appealData?.courtCircleNumber} />
                    <AppealBox label="نوع الدائرة" text={appealData?.courtType} />
                </div>
                <AppealBox label="اسم قاضي الدائرة" text={appealData?.courtJudge} />

                <AppealBox label="اسم سكرتير الدائرة" text={appealData?.courtSecretary} />
                <AppealBox label="دور مكتب السكرتير" text={appealData?.courtSecretaryRole} />

                <AppealBox label="رقم مكتب السكرتير" text={appealData?.courtSecretaryNumber} />
                <AppealBox
                    label="تاريخ تسجيل القضية بالمحكمة:"
                    text={appealData?.caseRegistrationDate}
                    icon={<DateIcon />}
                />

                <AppealBox
                    label="تاريخ ووقت الجلسة القادمة"
                    text={appealData?.nextSessionDate}
                    icon={<DateIcon />}
                />
            </div>
        </div>
    );
};
