// import React from 'react'
// import { DataTable, type Column } from '@/components/shared/components/DataTable'
// import { ExpertsActions } from './ExpertsActions'; // استيراد من ملف منفصل

// interface ExpertsTableProps {

// }

// interface ExpertRelatedT {
//     id: string;
//     expertReportNumber: string;      // رقم تقرير الخبير
//     assignedAuthority: string;       // الجهة المكلفة
//     assignmentDate: string;          // تاريخ التكليف
//     expertOfficeName: string;        // مكتب الخبراء
//     subjectOfExpertise: string;      // موضوع الخبرة
//     finalOpinion: string;            // الرأي النهائي
//     reportSubmissionDate: string;    // تاريخ إيداع التقرير
//     status: string;                  // حالة التقرير
// }

// const experts: ExpertRelatedT[] = [
//     { 
//         id: "1", 
//         expertReportNumber: "EXP-2024-001", 
//         assignedAuthority: "محكمة استئناف القاهرة", 
//         assignmentDate: "2024-01-15", 
//         expertOfficeName: "مكتب الخبراء الهندسيين",
//         subjectOfExpertise: "فحص هندسي",
//         finalOpinion: "وجود عيوب إنشائية",
//         reportSubmissionDate: "2024-02-10",
//         status: "مُعتمد"
//     },
//     { 
//         id: "2", 
//         expertReportNumber: "EXP-2024-002", 
//         assignedAuthority: "نيابة جنوب القاهرة", 
//         assignmentDate: "2024-02-01", 
//         expertOfficeName: "مكتب الخبراء الطبيين",
//         subjectOfExpertise: "فحص طبي",
//         finalOpinion: "نسبة عجز 25%",
//         reportSubmissionDate: "2024-02-20",
//         status: "قيد المراجعة"
//     },
//     { 
//         id: "3", 
//         expertReportNumber: "EXP-2024-003", 
//         assignedAuthority: "محكمة الأسرة", 
//         assignmentDate: "2024-02-10", 
//         expertOfficeName: "مكتب الخبراء الماليين",
//         subjectOfExpertise: "تقدير تعويض",
//         finalOpinion: "تعويض 500,000 جنيه",
//         reportSubmissionDate: "2024-03-05",
//         status: "مُعترض عليه"
//     },
//     { 
//         id: "4", 
//         expertReportNumber: "EXP-2024-004", 
//         assignedAuthority: "هيئة التحكيم", 
//         assignmentDate: "2024-02-15", 
//         expertOfficeName: "مكتب الخبراء القانونيين",
//         subjectOfExpertise: "فحص توقيع",
//         finalOpinion: "التوقيع سليم",
//         reportSubmissionDate: "2024-03-01",
//         status: "مُعتمد"
//     },
//     { 
//         id: "5", 
//         expertReportNumber: "EXP-2024-005", 
//         assignedAuthority: "محكمة القضاء الإداري", 
//         assignmentDate: "2024-02-20", 
//         expertOfficeName: "مكتب الخبراء الهندسيين",
//         subjectOfExpertise: "تقدير تعويض",
//         finalOpinion: "تعويض 750,000 جنيه",
//         reportSubmissionDate: "2024-03-10",
//         status: "قيد المراجعة"
//     },
//     { 
//         id: "6", 
//         expertReportNumber: "EXP-2024-006", 
//         assignedAuthority: "نيابة شمال القاهرة", 
//         assignmentDate: "2024-02-25", 
//         expertOfficeName: "مكتب الخبراء الجنائيين",
//         subjectOfExpertise: "فحص مستندات",
//         finalOpinion: "المستندات سليمة",
//         reportSubmissionDate: "2024-03-12",
//         status: "مُعترض عليه"
//     },
// ];

// const StatusCell: React.FC<{ status: string }> = ({ status }) => {
//     const getStatusStyle = (status: string): string => {
//         const statusValue = status.trim();
        
//         switch(statusValue) {
//             case "مُعتمد":
//                 return "bg-[#11B32433] text-[#0B6E1F]";
//             case "مُعترض عليه":
//                 return "bg-[#C600001F] text-[#C60000]";
//             case "قيد المراجعة":
//                 return "bg-[#DBC33B29] text-[#9E7F0F]";
//             default:
//                 return "bg-gray-100 text-gray-700";
//         }
//     };

//     return (
//         <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(status)}`}>
//             {status}
//         </span>
//     );
// };  

// export const TableExpert: React.FC<ExpertsTableProps> = () => {
//     const handleEdit = (item: ExpertRelatedT) => {
//         console.log("تعديل:", item);
//         // هنا هتضيف منطق التعديل
//     };

//     const handleDelete = (item: ExpertRelatedT) => {
//         console.log("حذف:", item);
//         // هنا هتضيف منطق الحذف
//     };

//     const columns: Column<any>[] = [
//         {
//             header: "#",
//             accessor: (item) => experts.findIndex((e) => e.id === item.id) + 1,
  
//         },
//         {
//             header: "رقم تقرير الخبير",
//             accessor: "expertReportNumber",
  
//         },
//         {
//             header: "الجهة المكلفة",
//             accessor: "assignedAuthority",
  
//         },
//         {
//             header: "تاريخ التكليف",
//             accessor: "assignmentDate",

//         },
//         {
//             header: "مكتب الخبراء",
//             accessor: "expertOfficeName",
  
//         },
//         {
//             header: "موضوع الخبرة",
//             accessor: "subjectOfExpertise",

//         },
//         {
//             header: "الرأي النهائي",
//             accessor: (item) => (
//                 <div className="truncate " title={item.finalOpinion}>
//                     {item.finalOpinion}
//                 </div>
//             ),
 
//         },
//         {
//             header: "تاريخ إيداع التقرير",
//             accessor: "reportSubmissionDate",

//         },
//         {
//             header: "الحالة",
//             accessor: (item) => <StatusCell status={item.status} />,

//         },
//         {
//             header: "إجراء",
//             accessor: (item) => (
//                 <ExpertsActions
//                     expertItem={item}
//                     onEdit={() => handleEdit(item)}
//                     onDelete={() => handleDelete(item)}
//                 />
//             ),
  
//         },
//     ];

//     return (
//         <div className="border border-gray-300 p-4 rounded-xl w-full  ">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
//                 <h1 className="text-xl font-cairo"> الخبراء</h1>
//                 <button
//                     type="button"
                    
//                     className="flex shrink-0 items-center justify-center gap-2 bg-[#CBA46226] rounded-md w-full sm:w-[180px] md:w-[200px] h-[50px] transition-colors duration-200 px-2 hover:bg-[#CBA46240]"
//                 >
//                     <span className="text-[14px] sm:text-[16px] font-medium whitespace-nowrap text-[#CBA462]">+ إضافة  خبير</span>
//                 </button>
//             </div>

//             {/* الجدول */}
//             <div className="overflow-x-hidden max-w-[600px] mx-auto">
//             <DataTable
//                 data={experts}
//                 columns={columns}
//                 rowIdField="id"
//             />
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react'
import { DataTable, type Column } from '@/components/shared/components/DataTable'
import { ExpertsActions } from './ExpertsActions';
import AddExpertModal from './AddExpertModal'; // هنعمله بعد كده

interface ExpertsTableProps {

}

interface ExpertRelatedT {
    id: string;
    expertReportNumber: string;      // رقم تقرير الخبير
    assignedAuthority: string;       // الجهة المكلفة
    assignmentDate: string;          // تاريخ التكليف
    expertOfficeName: string;        // مكتب الخبراء
    subjectOfExpertise: string;      // موضوع الخبرة
    finalOpinion: string;            // الرأي النهائي
    reportSubmissionDate: string;    // تاريخ إيداع التقرير
    status: string;                  // حالة التقرير
}

const experts: ExpertRelatedT[] = [
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
        
        switch(statusValue) {
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

export const TableExpert: React.FC<ExpertsTableProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpert, setEditingExpert] = useState<ExpertRelatedT | null>(null);
    const [expertsData, setExpertsData] = useState<ExpertRelatedT[]>(experts);

    const handleOpenModal = () => {
        setEditingExpert(null);
        setIsModalOpen(true);
    };

    const handleEditExpert = (item: ExpertRelatedT) => {
        setEditingExpert(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExpert(null);
    };

    const handleSaveExpert = (values: any) => {
        if (editingExpert) {
            // تعديل خبير موجود
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
            // إضافة خبير جديد
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

    const handleDelete = (item: ExpertRelatedT) => {
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
        <div className="border border-gray-300 p-4 rounded-xl w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
                <h1 className="text-xl font-cairo">الخبراء</h1>
                <button
                    type="button"
                    onClick={handleOpenModal}
                    className="flex shrink-0 items-center justify-center gap-2 bg-[#CBA46226] rounded-md w-full sm:w-[180px] md:w-[200px] h-[50px] transition-colors duration-200 px-2 hover:bg-[#CBA46240]"
                >
                    <span className="text-[14px] sm:text-[16px] font-medium whitespace-nowrap text-[#CBA462]">+ إضافة خبير</span>
                </button>
            </div>

            {/* الجدول */}
            <div className="overflow-x-hidden max-w-[600px] mx-auto">
                <DataTable
                    data={expertsData}
                    columns={columns}
                    rowIdField="id"
                />
            </div>

            {/* مودال إضافة/تعديل خبير */}
            {isModalOpen && (
                <AddExpertModal
                    onClose={handleCloseModal}
                    onSave={handleSaveExpert}
                    initialValues={editingExpert || undefined}
                />
            )}
        </div>
    )
}