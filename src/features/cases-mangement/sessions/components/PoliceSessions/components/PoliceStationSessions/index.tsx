import { useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";

import PoliceStationSessionsModel from "./components/PoliceStationSessionsModel";
import { ActionsCoulmn } from "./components/ActionsCoulmn";
import HeaderPoliceStaionSessions from "./components/HeaderPoliceStaionSessions";
import { useGetPoliceSessions } from "../../api/hooks/useGetPoliceSessions";
import type { PoliceSession } from "../../types/typsePolice";


const PoliceStationsession = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<PoliceSession | null>(null);
    const itemsPerPage = 10;

    const { data: sessionsResponse } = useGetPoliceSessions();

    const sessions = Array.isArray(sessionsResponse) ? sessionsResponse : (sessionsResponse as any)?.data || [];

    const totalPages = Math.ceil(sessions.length / itemsPerPage);
    const currentData = sessions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleAdd = () => {
        setEditingSession(null);
        setIsModalOpen(true);
    };

    const handleEdit = (session: PoliceSession) => {
        setEditingSession(session);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSession(null);
    };

    const columns: Column<PoliceSession>[] = [
        {
            header: "#",
            accessor: (item) => {
                const index = sessions.findIndex((s: PoliceSession) => s.id === item.id);
                return index + 1;
            },
            headerClassName: "w-[60px]",
        },
        {
            header: "تاريخ الجلسة",
            accessor: (item) => item.session_date ? new Date(item.session_date).toLocaleDateString("ar-EG") : "-",
        },
        {
            header: "وقت الجلسة",
            accessor: "session_time",
        },
        {
            header: "المحامي المتابع",
            accessor: (item) => `${item.lawyer?.first_name || ""} ${item.lawyer?.last_name || ""}`.trim() || "-",
            className: "font-medium text-gray-800",
        },
        {
            header: "قرار الجلسة",
            accessor: "session_ruling",
        },
        {
            header: "الإجراءات",
            accessor: (item) => <ActionsCoulmn item={item} onEdit={() => handleEdit(item)} />,
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee] mt-6">
            <HeaderPoliceStaionSessions onAdd={handleAdd} />
            <div className="overflow-hidden">
                <DataTable
                    data={currentData}
                    columns={columns}
                    rowIdField="id"
                />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {isModalOpen && (
                <PoliceStationSessionsModel
                    onClose={handleCloseModal}
                    initialValues={editingSession || undefined}
                    mode={editingSession ? "edit" : "add"}
                />
            )}
        </div>
    );
};

export default PoliceStationsession;
