import React from "react";
import { TableSessionsActions } from "./TableSessionsActions";

interface Session {
    id: number;
    sessionTime: string;
    courtName: string;
    hallNumber: string;
    hallRole: string;
    decision: string;
}

interface TableSessionsRowProps {
    session: Session;
    index: number;
    onEdit?: (session: Session) => void;
    onDelete?: (session: Session) => void;
}

export const TableSessionsRow: React.FC<TableSessionsRowProps> = ({
    session,
    index,
    onEdit,
    onDelete,
}) => {
    return (
        <tr className="border-b border-[#F1F1F4] transition-colors hover:bg-gray-50 bg-white">
            <td className="p-4 text-center text-sm text-gray-600 border-x border-[#F1F1F4]">
                {index}
            </td>
            <td className="p-4 text-center text-sm font-medium text-black border-x border-[#F1F1F4] whitespace-nowrap">
                {session.sessionTime}
            </td>
            <td className="p-4 text-center text-sm text-gray-600 border-x border-[#F1F1F4] whitespace-nowrap">
                {session.courtName}
            </td>
            <td className="p-4 text-center text-sm text-gray-600 border-x border-[#F1F1F4] whitespace-nowrap">
                {session.hallNumber}
            </td>
            <td className="p-4 text-center text-sm text-gray-600 border-x border-[#F1F1F4] whitespace-nowrap">
                {session.hallRole}
            </td>
            <td className="p-4 text-center text-sm text-gray-600 border-x border-[#F1F1F4] whitespace-nowrap">
                {session.decision}
            </td>
            <td className="p-4 text-center">
                <TableSessionsActions
                    onEdit={() => onEdit?.(session)}
                    onDelete={() => onDelete?.(session)}
                />
            </td>
        </tr>
    );
};
