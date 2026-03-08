import { useState } from "react";
import edit from '@/public/images/edit.svg'
import deleteIcon from '@/public/images/delete.svg'
import type { SessionFormValues } from '../components/typseProsecution';
import AddProsecutionModel from "./AddProsecutionModel";

// واجهة بيانات الجلسات
interface SessionData {
    id: number;
    sessionDate: string;
    sessionTime: string;
    lawyer: string;
    decision: string;
}



const TableProsecution = () => {
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
                    ? { ...session, ...values }
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


    return (
        <div className="border border-gray-300 p-4 rounded-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
                <h1 className="text-xl font-cairo">جلسات النيابة</h1>
                <button
                    type="button"
                    onClick={handleOpenModal}
                    className="flex shrink-0 items-center justify-center gap-2 bg-[#CBA46226] rounded-md w-full sm:w-[180px] md:w-[200px] h-[50px] transition-colors duration-200 px-2 hover:bg-[#CBA46240]"
                >
                    <span className="text-[14px] sm:text-[16px] font-medium whitespace-nowrap text-[#CBA462]">+ إضافة جلسة نيابة</span>
                </button>
            </div>

            {/* الجدول */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#FCFCFC] border-b-2 border-[#F1F1F4]">
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[60px]">#</th>
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[150px]">تاريخ ووقت الجلسة</th>
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[200px]">المحامي المسؤول</th>
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[150px]">قرار الجلسة</th>
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] w-[150px]">إجراء</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sessionsData.map((session, index) => (
                            <tr
                                key={session.id}
                                className="cursor-pointer transition-colors bg-white border-b border-gray-200 hover:bg-gray-50"
                            >
                                <td className="text-gray-600 border-l border-gray-200 text-center p-3 whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base text-gray-600 border-l border-gray-200 text-center whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-5">
                                        <span>{session.sessionTime}</span>

                                        <span>{session.sessionDate}</span>
                                    </div>
                                </td>
                                <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base font-medium text-gray-800 border-l border-gray-200 text-center whitespace-nowrap">
                                    {session.lawyer}
                                </td>
                                <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base border-l border-gray-200 text-center whitespace-nowrap">
                                    <span className="*inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs md:text-sm whitespace-nowrap" >
                                        {session.decision}
                                    </span>
                                </td>
                                <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">
                                    <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap">
                                        <button
                                            title="تعديل"
                                            onClick={() => handleEditSession(session)}
                                            className="hover:scale-110 transition shrink-0"
                                        >
                                            <img src={edit} alt="edit" className="max-sm:w-5 max-sm:h-5 max-md:w-5 max-md:h-5" />
                                        </button>
                                        <button
                                            title="حذف"
                                            onClick={() => handleDeleteSession(session.id)}
                                            className="hover:scale-110 transition shrink-0"
                                        >
                                            <img src={deleteIcon} alt="delete" className="max-sm:w-5 max-sm:h-5 max-md:w-5 max-md:h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* رسالة إذا كانت البيانات فارغة */}
            {sessionsData.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    لا توجد جلسات لعرضها
                </div>
            )}

            {/* مودال إضافة/تعديل جلسة */}
            {isModalOpen && (
                <AddProsecutionModel
                    onClose={handleCloseModal}
                    onSave={handleSaveSession}
                    initialValues={editingSession || undefined}
                />
            )}
        </div>
    );
};

export default TableProsecution;