
import { HeaderFirstDegreeSessionsInfo } from './HeaderFirstDegreeSessionsInfo'
import { FirstDegreeInfoSessions } from './components/FirstDegreeInfoSessions'


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
