
import { HeaderFirstDegreeSessionsInfo } from './HeaderFirstDegreeSessionsInfo'
import { HeaderFirstDegreeSessionsTable } from './HeaderFirstDegreeSessionsTable'
import { FirstDegreeInfoSessions } from './components/FirstDegreeInfoSessions'
import { FirstDegreeTable } from './components/FirstDegreeTable'


export const FirstDegreeSessions = () => {
    return (
        <>
            <HeaderFirstDegreeSessionsInfo />
            <FirstDegreeInfoSessions firstDegreeData={{
                courtName: "نيابة",
                courtRole: "نيابة",
                courtRoomNumber: "نيابة",
                courtCircleNumber: "نيابة",
                courtType: "نيابة",
                courtJudge: "نيابة",
                courtSecretary: "نيابة",
                courtSecretaryRole: "نيابة",
                courtSecretaryNumber: "نيابة",
                caseRegistrationDate: "sdfsdf",
                nextSessionDate: "sdfsdf",
            }} />

        </>
    )
}
