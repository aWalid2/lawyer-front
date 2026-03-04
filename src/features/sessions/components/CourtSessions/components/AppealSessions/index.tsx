import React from "react";
import { HeaderAppealSessionsInfo } from "./HeaderAppealSessionsInfo";
import { HeaderAppealSessionsTable } from "./HeaderAppealSessionsTable";
import { AppealInfoSessions } from "./components/AppealInfoSessions";
import { AppealTable } from "./components/AppealTable";

const MOCK_APPEAL_DATA = {
    courtName: "نيابة",
    courtRole: "نيابة",
    courtRoomNumber: "نيابة",
    courtCircleNumber: "نيابة",
    courtType: "نيابة",
    courtJudge: "نيابة",
    courtSecretary: "نيابة",
    courtSecretaryRole: "نيابة",
    courtSecretaryNumber: "نيابة",
    caseRegistrationDate: "20/01/2026",
    nextSessionDate: "20/01/2026 9:00AM",
};

export const AppealSessions = () => {
    return (
        <>
            <HeaderAppealSessionsInfo />
            <AppealInfoSessions appealData={MOCK_APPEAL_DATA} />
            <div className="mt-8">
                <HeaderAppealSessionsTable />
                <AppealTable />
            </div>
        </>
    );
};
