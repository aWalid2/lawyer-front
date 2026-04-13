import { useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";

import PoliceStationSessionsModel from "./components/PoliceStationSessionsModel";
import { ActionsCoulmn } from "./components/ActionsCoulmn";
import HeaderPoliceStaionSessions from "./components/HeaderPoliceStaionSessions";
import { useGetPoliceSessions } from "../../api/hooks/useGetPoliceSessions";
import type { PoliceSession } from "../../types/typsePolice";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { useIndexedData } from "@/shared/utils/useIndexedData";



const PoliceStationsession = () => {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<PoliceSession | null>(null);

    const { data: sessionsResponse } = useGetPoliceSessions();
    const totalPages = sessionsResponse?.data?.data?.meta?.total_pages || 1
    const sessions = sessionsResponse?.data?.data || []
    const indexedData = useIndexedData(sessions, page)


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
            accessor: (item) => formatDateToYYYYMMDD(item.session_date),
        },
        {
            header: "وقت الجلسة",
            accessor: (item) => item.session_time,
        },
        {
            header: "المحامي المتابع",
            accessor: (item) => (item?.lawyer?.first_name),
            className: "font-medium text-gray-800",
        },
        {
            header: "قرار الجلسة",
            accessor: (item) => (item.session_ruling),
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
                    data={indexedData}
                    columns={columns}
                    rowIdField="id"
                />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
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
