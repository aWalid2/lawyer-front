
import { TableSessionsHeader } from "./components/TableSessionsHeader";
import { TableSessionsRow } from "./components/TableSessionsRow";



export const SessionsTable = ({ data }: { data: any[] }) => {
    return (
        <div className="overflow-x-auto bg-white">
            <table className="w-full border-collapse bg-white text-right" dir="rtl">
                <TableSessionsHeader />
                <tbody>
                    {data.map((session, index) => (
                        <TableSessionsRow
                            key={session.id}
                            session={session}
                            index={index + 1}
                            onEdit={(s) => console.log("Edit session:", s)}
                            onDelete={(s) => console.log("Delete session:", s)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
