import { useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import deleteic from "@/public/images/delete.svg";
import editefff from "@/public/images/edit.svg";
import AddPoliceModel from "./AddPoliceModel";

// واجهة بيانات الجلسات
interface SessionData {
    id: number;
    sessionDate: string;
    sessionTime: string;
    lawyer: string;
    decision: string;
}

interface SessionFormValues {
    sessionDate: string;
    sessionTime: string;
    lawyer: string;
    decision: string;
}

const AddPoliceStationsession = () => {
    // بيانات مؤقتة للجدول
    const [sessionsData, setSessionsData] = useState<SessionData[]>([
        {
            id: 1,
            sessionDate: "2024-03-15",
            sessionTime: "10:30",
            lawyer: "أحمد محمد",
            decision: "تم التأجيل",
        },
        {
            id: 2,
            sessionDate: "2024-03-20",
            sessionTime: "13:00",
            lawyer: "محمد علي",
            decision: "تم الحضور",
        },
        {
            id: 3,
            sessionDate: "2024-03-25",
            sessionTime: "11:00",
            lawyer: "سارة أحمد",
            decision: "انتظار القرار",
        },
        {
            id: 4,
            sessionDate: "2024-03-28",
            sessionTime: "09:00",
            lawyer: "خالد محمود",
            decision: "تم التأجيل",
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(sessionsData.length / itemsPerPage);
    const currentData = (() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sessionsData.slice(startIndex, startIndex + itemsPerPage);
    })();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<SessionData | null>(null);

    const handleOpenModal = () => {
        setEditingSession(null);
        setIsModalOpen(true);
    };

    const handleEditSession = (session: SessionData) => {
        setEditingSession(session);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSession(null);
    };

    const handleSaveSession = (values: SessionFormValues) => {
        if (editingSession) {
            // تعديل جلسة موجودة
            const updatedSessions = sessionsData.map(session =>
                session.id === editingSession.id
                    ? {
                        ...session,
                        ...values
                    }
                    : session
            );
            setSessionsData(updatedSessions);
            console.log("تم تعديل الجلسة:", { ...editingSession, ...values });
        } else {
            // إضافة جلسة جديدة
            const newSession = {
                id: sessionsData.length > 0 ? Math.max(...sessionsData.map(s => s.id)) + 1 : 1,
                ...values,
            };
            setSessionsData([...sessionsData, newSession]);
            console.log("تم إضافة الجلسة:", newSession);
        }
        setIsModalOpen(false);
        setEditingSession(null);
    };

    const handleDeleteSession = (sessionId: number) => {
        if (window.confirm("هل أنت متأكد من حذف هذه الجلسة؟")) {
            const filteredSessions = sessionsData.filter(session => session.id !== sessionId);
            setSessionsData(filteredSessions);
            console.log("تم حذف الجلسة رقم:", sessionId);
        }
    };

    // عمود الإجراءات
    const ActionsColumn = ({ item }: { item: SessionData }) => (
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap">
            <button
                title="تعديل"
                onClick={() => handleEditSession(item)}
                className="hover:scale-110 transition shrink-0 text-[#CBA462]"
            >
                <img src={editefff} alt="تعديل" />
            </button>
            <button
                title="حذف"
                onClick={() => handleDeleteSession(item.id)}
                className="hover:scale-110 transition shrink-0 text-red-500"
            >
                <img src={deleteic} alt="حذف" />
            </button>
        </div>
    );

    const columns: Column<SessionData>[] = [
        {
            header: "#",
            accessor: (item) => {
                const index = currentData.findIndex(s => s.id === item.id);
                return (currentPage - 1) * itemsPerPage + index + 1;
            },
            headerClassName: "w-[60px]",
        },
        {
            header: "تاريخ الجلسة",
            accessor: "sessionDate",
        },
        {
            header: "وقت الجلسة",
            accessor: "sessionTime",
        },
        {
            header: "المحامي المتابع",
            accessor: "lawyer",
            className: "font-medium text-gray-800",
        },
        {
            header: "قرار الجلسة",
            accessor: "decision",
        },
        {
            header: "الإجراءات",
            accessor: (item) => <ActionsColumn item={item} />,
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <h1 className="text-[18px] font-semibold text-secondary font-cairo text-right w-full sm:w-auto">
                    جلسات المخفر
                </h1>
                <button
                    type="button"
                    onClick={handleOpenModal}
                    className="flex items-center justify-center gap-2 bg-[#CBA46226] rounded-md h-12.5 w-full sm:w-auto px-6 transition-all duration-200 hover:bg-[#CBA46240] text-[#CBA462] font-semibold font-cairo"
                >
                    + إضافة جلسة مخفر
                </button>
            </div>

            <div className="overflow-hidden">
                <DataTable data={currentData} columns={columns} rowIdField="id" />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {/* مودال إضافة/تعديل جلسة */}
            {isModalOpen && (
                <AddPoliceModel
                    onClose={handleCloseModal}
                    onSave={handleSaveSession}
                    initialValues={editingSession || undefined}
                    mode={editingSession ? "edit" : "add"}
                />
            )}
        </div>
    );
};

export default AddPoliceStationsession;