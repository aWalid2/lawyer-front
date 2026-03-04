import React from "react";
import { DistinctionBox } from "./components/DistinctionBox";
import type { DistinctionInfProps } from "./components/typesDistinction";
import { DateIcon } from "@/components/shared/icons/Date";

export const DistinctionInfoSessions: React.FC<DistinctionInfProps> = ({
    distinctionData,
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <DistinctionBox label="اسم المحكمة" text={distinctionData?.courtName} />
                <DistinctionBox label="الدور في المحكمة" text={distinctionData?.courtRole} />

                <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
                    <DistinctionBox
                        label="رقم القاعة في المحكمة"
                        text={distinctionData?.courtRoomNumber}
                    />
                    <DistinctionBox
                        label="رقم الدائرة"
                        text={distinctionData?.courtCircleNumber}
                    />
                    <DistinctionBox label="نوع الدائرة" text={distinctionData?.courtType} />
                </div>
                <DistinctionBox
                    label="اسم قاضي الدائرة"
                    text={distinctionData?.courtJudge}
                />

                <DistinctionBox
                    label="اسم سكرتير الدائرة"
                    text={distinctionData?.courtSecretary}
                />
                <DistinctionBox
                    label="دور مكتب السكرتير"
                    text={distinctionData?.courtSecretaryRole}
                />

                <DistinctionBox
                    label="رقم مكتب السكرتير"
                    text={distinctionData?.courtSecretaryNumber}
                />
                <DistinctionBox
                    label="تاريخ تسجيل القضية بالمحكمة:"
                    text={distinctionData?.caseRegistrationDate}
                    icon={<DateIcon />}
                />

                <DistinctionBox
                    label="تاريخ ووقت الجلسة القادمة"
                    text={distinctionData?.nextSessionDate}
                    icon={<DateIcon />}
                />
            </div>
        </div>
    );
};
