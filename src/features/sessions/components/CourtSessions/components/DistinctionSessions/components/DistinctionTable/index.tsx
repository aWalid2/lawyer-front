import { TableSessionsHeader } from "./components/TableSessionsHeader";
import { TableSessionsRow } from "./components/TableSessionsRow";

const mockSessions = [
    {
        id: 1,
        sessionTime: "#6345",
        courtName: "محكمة1",
        hallNumber: "5",
        hallRole: "6",
        decision: "قرار",
    },
];

export const DistinctionTable = () => {
    return (
        <div className="overflow-x-auto bg-white">
            <table className="w-full border-collapse bg-white text-right" dir="rtl">
                <TableSessionsHeader />
                <tbody>
                    {mockSessions.map((session, index) => (
                        <TableSessionsRow
                            key={session.id}
                            session={session}
                            index={index + 1}
                            onEdit={(s) => console.log("Edit distinction session:", s)}
                            onDelete={(s) => console.log("Delete distinction session:", s)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
