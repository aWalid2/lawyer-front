
import { HeaderSessionsTable } from './components/HeaderSessionsTable'
import { SessionsTable } from './components/SessionsTable'

const mockSessions1 = [
    {
        id: 1,
        sessionTime: "#6345",
        courtName: "محكمة1",
        hallRole: "6",
        hallNumber: "5",
    },

];
const mockSessions2 = [
    {
        id: 1,
        sessionTime: "#6345",
        courtName: "محكمة2",
        hallRole: "2",
        hallNumber: "5",
    },

];
const mockSessions3 = [
    {
        id: 1,
        sessionTime: "#6345",
        courtName: "محكمة2",
        hallRole: "2",
        hallNumber: "5",
    },

];


export const SesstionsFooter = ({ tab }: { tab: string }) => {
    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
            <HeaderSessionsTable title={tab === "first" ? "جلسات أول درجة" : tab === "appeal" ? "جلسات الاستئناف" : "جلسات التمييز"} />
            <SessionsTable data={tab === "first" ? mockSessions1 : tab === "appeal" ? mockSessions2 : mockSessions3} />
        </div>
    )
}