import React, { useState } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { ExpertsActions } from './components/ExpertsActions';
import AddExpertModal from './components/AddExpertModal';
import { HeaderExpertsSessions } from './components/HeaderExpertsSessions';
import type { ExpertSessionType } from '../../types/ExperstSessionType';
interface ExpertsTableProps {

}

const experts: ExpertSessionType[] = [
    {
        id: "1",
        expertReportNumber: "EXP-2024-001",
        assignedAuthority: "محكمة استئناف القاهرة",
        assignmentDate: "2024-01-15",
        expertOfficeName: "مكتب الخبراء الهندسيين",
        subjectOfExpertise: "فحص هندسي",
        finalOpinion: "وجود عيوب إنشائية",
        reportSubmissionDate: "2024-02-10",
        status: "مُعتمد"
    },
    {
        id: "2",
        expertReportNumber: "EXP-2024-002",
        assignedAuthority: "نيابة جنوب القاهرة",
        assignmentDate: "2024-02-01",
        expertOfficeName: "مكتب الخبراء الطبيين",
        subjectOfExpertise: "فحص طبي",
        finalOpinion: "نسبة عجز 25%",
        reportSubmissionDate: "2024-02-20",
        status: "قيد المراجعة"
    },
    {
        id: "3",
        expertReportNumber: "EXP-2024-003",
        assignedAuthority: "محكمة الأسرة",
        assignmentDate: "2024-02-10",
        expertOfficeName: "مكتب الخبراء الماليين",
        subjectOfExpertise: "تقدير تعويض",
        finalOpinion: "تعويض 500,000 جنيه",
        reportSubmissionDate: "2024-03-05",
        status: "مُعترض عليه"
    },
    {
        id: "4",
        expertReportNumber: "EXP-2024-004",
        assignedAuthority: "هيئة التحكيم",
        assignmentDate: "2024-02-15",
        expertOfficeName: "مكتب الخبراء القانونيين",
        subjectOfExpertise: "فحص توقيع",
        finalOpinion: "التوقيع سليم",
        reportSubmissionDate: "2024-03-01",
        status: "مُعتمد"
    },
    {
        id: "5",
        expertReportNumber: "EXP-2024-005",
        assignedAuthority: "محكمة القضاء الإداري",
        assignmentDate: "2024-02-20",
        expertOfficeName: "مكتب الخبراء الهندسيين",
        subjectOfExpertise: "تقدير تعويض",
        finalOpinion: "تعويض 750,000 جنيه",
        reportSubmissionDate: "2024-03-10",
        status: "قيد المراجعة"
    },
    {
        id: "6",
        expertReportNumber: "EXP-2024-006",
        assignedAuthority: "نيابة شمال القاهرة",
        assignmentDate: "2024-02-25",
        expertOfficeName: "مكتب الخبراء الجنائيين",
        subjectOfExpertise: "فحص مستندات",
        finalOpinion: "المستندات سليمة",
        reportSubmissionDate: "2024-03-12",
        status: "مُعترض عليه"
    },
];

const StatusCell: React.FC<{ status: string }> = ({ status }) => {
    const getStatusStyle = (status: string): string => {
        const statusValue = status.trim();

        switch (statusValue) {
            case "مُعتمد":
                return "bg-[#11B32433] text-[#0B6E1F]";
            case "مُعترض عليه":
                return "bg-[#C600001F] text-[#C60000]";
            case "قيد المراجعة":
                return "bg-[#DBC33B29] text-[#9E7F0F]";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(status)}`}>
            {status}
        </span>
    );
};

export const TableExpertsSessions: React.FC<ExpertsTableProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpert, setEditingExpert] = useState<ExpertSessionType | null>(null);
    const [expertsData, setExpertsData] = useState<ExpertSessionType[]>(experts);

    const handleOpenModal = () => {
        setEditingExpert(null);
        setIsModalOpen(true);
    };

    const handleEditExpert = (item: ExpertSessionType) => {
        setEditingExpert(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExpert(null);
    };

    const handleSaveExpert = (values: any) => {
        if (editingExpert) {

            const updatedExperts = expertsData.map(expert =>
                expert.id === editingExpert.id
                    ? {
                        ...expert,
                        expertReportNumber: values.expertReportNumber,
                        assignedAuthority: values.assignedAuthority,
                        assignmentDate: values.assignmentDate,
                        expertOfficeName: values.expertOfficeName,
                        subjectOfExpertise: values.subjectOfExpertise,
                        finalOpinion: values.finalOpinion,
                        reportSubmissionDate: values.reportSubmissionDate,
                        status: values.status,
                    }
                    : expert
            );
            setExpertsData(updatedExperts);
            console.log("تم تعديل الخبير:", { ...editingExpert, ...values });
        } else {
            const newExpert = {
                id: (expertsData.length + 1).toString(),
                expertReportNumber: values.expertReportNumber,
                assignedAuthority: values.assignedAuthority,
                assignmentDate: values.assignmentDate,
                expertOfficeName: values.expertOfficeName,
                subjectOfExpertise: values.subjectOfExpertise,
                finalOpinion: values.finalOpinion,
                reportSubmissionDate: values.reportSubmissionDate,
                status: values.status,
            };
            setExpertsData([...expertsData, newExpert]);
            console.log("تم إضافة الخبير:", newExpert);
        }
        setIsModalOpen(false);
        setEditingExpert(null);
    };

    const handleDelete = (item: ExpertSessionType) => {
        if (window.confirm("هل أنت متأكد من حذف هذا الخبير؟")) {
            const filteredExperts = expertsData.filter(expert => expert.id !== item.id);
            setExpertsData(filteredExperts);
            console.log("تم حذف الخبير:", item);
        }
    };

    const columns: Column<any>[] = [
        {
            header: "#",
            accessor: (item) => expertsData.findIndex((e) => e.id === item.id) + 1,
        },
        {
            header: "رقم تقرير الخبير",
            accessor: "expertReportNumber",
        },
        {
            header: "الجهة المكلفة",
            accessor: "assignedAuthority",
        },
        {
            header: "تاريخ التكليف",
            accessor: "assignmentDate",
        },
        {
            header: "مكتب الخبراء",
            accessor: "expertOfficeName",
        },
        {
            header: "موضوع الخبرة",
            accessor: "subjectOfExpertise",
        },
        {
            header: "الرأي النهائي",
            accessor: (item) => (
                <div className="truncate" title={item.finalOpinion}>
                    {item.finalOpinion}
                </div>
            ),
        },
        {
            header: "تاريخ إيداع التقرير",
            accessor: "reportSubmissionDate",
        },
        {
            header: "الحالة",
            accessor: (item) => <StatusCell status={item.status} />,
        },
        {
            header: "إجراء",
            accessor: (item) => (
                <ExpertsActions
                    expertItem={item}
                    onEdit={() => handleEditExpert(item)}
                    onDelete={() => handleDelete(item)}
                />
            ),
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee] mt-6 ">

            <HeaderExpertsSessions handleOpenModal={handleOpenModal} />
            <div className="max-w-full overflow-x-auto">

                <DataTable
                    data={experts}
                    columns={columns}
                    rowKey="id"


                />

            </div>


            {
                isModalOpen && (
                    <AddExpertModal
                        onClose={handleCloseModal}
                        onSave={handleSaveExpert}
                        initialValues={editingExpert || undefined}
                    />
                )
            }
        </div >
    )
}