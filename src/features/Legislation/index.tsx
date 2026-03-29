import React, { useState, useMemo, useEffect } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { LegislationActions } from './components/LegislationActions';
import AddLegislationModal from './components/AddLegislationModal';
import { HeaderLegislations } from './components/HeaderLegislations'; // استيراد الهيدر الجديد
import { Pagination } from '@/shared/components/Pagination';

interface LegislationTableProps {

}

interface LegislationRelatedT {
    id: string;
    legislationNumber: string;      // رقم التشريع/الحكم
    legislationType: string;        // النوع (قانون/لائحة/حكم)
    legislationTitle: string;       // عنوان التشريع
    issuingBody: string;            // جهة الإصدار
    issueDate: string;              // تاريخ الإصدار
    effectiveDate?: string;         // تاريخ النفاذ (اختياري)
    courtLevel?: string;            // درجة المحكمة (للأحكام)
    status: string;                 // الحالة (ساري/ملغي)
    summary?: string;               // ملخص (اختياري)
}

const legislations: LegislationRelatedT[] = [
    {
        id: "1",
        legislationNumber: "قانون 1 لسنة 2024",
        legislationType: "قانون",
        legislationTitle: "قانون الإجراءات الجنائية الجديد",
        issuingBody: "مجلس النواب",
        issueDate: "2024-01-15",
        effectiveDate: "2024-03-01",
        courtLevel: "محكمة النقض",
        status: "ساري",
        summary: "قانون ينظم إجراءات التقاضي في المواد الجنائية"
    },
    {
        id: "2",
        legislationNumber: "حكم 245 لسنة 2023",
        legislationType: "حكم محكمة",
        legislationTitle: "حكم في الطعن رقم 245 لسنة 2023",
        issuingBody: "محكمة النقض",
        issueDate: "2023-12-10",
        courtLevel: "محكمة النقض",
        status: "ساري",
        summary: "مبدأ قضائي حول التعويض في حوادث السيارات"
    },
    {
        id: "3",
        legislationNumber: "لائحة 5 لسنة 2024",
        legislationType: "لائحة",
        legislationTitle: "اللائحة التنفيذية لقانون الاستثمار",
        issuingBody: "مجلس الوزراء",
        issueDate: "2024-02-01",
        effectiveDate: "2024-03-15",
        status: "ساري",
        summary: "لائحة تنظم إجراءات الاستثمار في المناطق الحرة"
    },
    {
        id: "4",
        legislationNumber: "قرار 78 لسنة 2023",
        legislationType: "قرار وزاري",
        legislationTitle: "قرار وزير العدل بشأن الرسوم القضائية",
        issuingBody: "وزارة العدل",
        issueDate: "2023-11-20",
        effectiveDate: "2024-01-01",
        status: "ساري",
        summary: "تعديل الرسوم القضائية في المحاكم الابتدائية"
    },
    {
        id: "5",
        legislationNumber: "حكم 312 لسنة 2022",
        legislationType: "حكم محكمة",
        legislationTitle: "حكم في الدعوى 312 لسنة 2022",
        issuingBody: "محكمة استئناف القاهرة",
        issueDate: "2022-09-15",
        effectiveDate: "2024-03-01",
        courtLevel: "محكمة استئناف",
        status: "مبدأ قضائي",
        summary: "مبدأ حول مسئولية المهندس في العقود الهندسية"
    },
    {
        id: "6",
        legislationNumber: "قانون 15 لسنة 2023",
        legislationType: "قانون",
        legislationTitle: "قانون حماية المستهلك المعدل",
        issuingBody: "مجلس النواب",
        issueDate: "2023-05-20",
        effectiveDate: "2023-07-01",
        status: "ساري",
        summary: "تعديلات على قانون حماية المستهلك"
    },
    {
        id: "7",
        legislationNumber: "لائحة 2 لسنة 2024",
        legislationType: "لائحة",
        legislationTitle: "لائحة الموارد البشرية",
        issuingBody: "الجهاز المركزي للتنظيم والإدارة",
        issueDate: "2024-01-10",
        effectiveDate: "2024-02-01",
        status: "ملغي",
        summary: "تم إلغاؤها باللائحة 4 لسنة 2024"
    },
];

// مكون عرض النوع مع لون مناسب
const TypeCell: React.FC<{ type: string }> = ({ type }) => {
    const getTypeStyle = (type: string): string => {
        switch (type) {
            case "قانون":
                return "bg-[#153A4D1A] text-[#153A4D]";
            case "لائحة":
                return "bg-[#CBA4621A] text-[#CBA462]";
            case "قرار وزاري":
                return "bg-[#4B56751A] text-[#4B5675]";
            case "حكم محكمة":
                return "bg-[#0B6E1F1A] text-[#0B6E1F]";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getTypeStyle(type)}`}>
            {type}
        </span>
    );
};

// مكون عرض الحالة مع لون مناسب
const StatusCell: React.FC<{ status: string }> = ({ status }) => {
    const getStatusStyle = (status: string): string => {
        switch (status) {
            case "ساري":
                return "bg-[#11B32433] text-[#0B6E1F]";
            case "ملغي":
                return "bg-[#C600001F] text-[#C60000]";
            case "معدل":
                return "bg-[#DBC33B29] text-[#9E7F0F]";
            case "مبدأ قضائي":
                return "bg-[#153A4D1A] text-[#153A4D]";
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

export const LegislationTable: React.FC<LegislationTableProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLegislation, setEditingLegislation] = useState<LegislationRelatedT | null>(null);
    const [legislationsData, setLegislationsData] = useState<LegislationRelatedT[]>(legislations);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // فلترة التشريعات بناءً على البحث
    const filteredLegislations = useMemo(() => {
        if (!searchTerm) return legislationsData;

        return legislationsData.filter(item =>
            item.legislationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.legislationTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.issuingBody.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.legislationType.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, legislationsData]);

    const totalPages = Math.ceil(filteredLegislations.length / itemsPerPage);

    // إعادة تعيين الصفحة الحالية إذا كانت أكبر من إجمالي الصفحات
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    // حساب التشريعات للصفحة الحالية
    const currentLegislations = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredLegislations.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredLegislations, currentPage, itemsPerPage]);

    // دالة مساعدة لحساب الرقم التسلسلي
    const getSerialNumber = (item: LegislationRelatedT): number => {
        const indexInFiltered = filteredLegislations.findIndex(c => c.id === item.id);
        return indexInFiltered + 1;
    };

    const handleOpenModal = () => {
        setEditingLegislation(null);
        setIsModalOpen(true);
    };

    const handleEditLegislation = (item: LegislationRelatedT) => {
        setEditingLegislation(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLegislation(null);
    };

    const handleSaveLegislation = (values: any) => {
        if (editingLegislation) {
            // تعديل تشريع موجود
            const updatedLegislations = legislationsData.map(item =>
                item.id === editingLegislation.id
                    ? { ...item, ...values }
                    : item
            );
            setLegislationsData(updatedLegislations);
            console.log("تم تعديل التشريع:", { ...editingLegislation, ...values });
        } else {
            // إضافة تشريع جديد
            const newLegislation = {
                id: (legislationsData.length + 1).toString(),
                ...values
            };
            setLegislationsData([...legislationsData, newLegislation]);
            console.log("تم إضافة التشريع:", newLegislation);
        }
        setIsModalOpen(false);
        setEditingLegislation(null);
    };

    const handleDelete = (item: LegislationRelatedT) => {
        if (window.confirm("هل أنت متأكد من حذف هذا التشريع؟")) {
            const filtered = legislationsData.filter(leg => leg.id !== item.id);
            setLegislationsData(filtered);
            console.log("تم حذف التشريع:", item);
        }
    };

    const columns: Column<any>[] = [
        {
            header: "#",
            accessor: (item) => getSerialNumber(item),
            headerClassName: "w-13",
            className: "w-13",
        },
        {
            header: "رقم التشريع/الحكم",
            accessor: "legislationNumber",
            headerClassName: "w-35",
            className: "w-35 font-medium text-[#153A4D]",
        },
        {
            header: "النوع",
            accessor: (item) => <TypeCell type={item.legislationType} />,
            headerClassName: "w-24",
            className: "w-24",
        },
        {
            header: "عنوان التشريع",
            accessor: (item) => (
                <div className="truncate max-w-[200px]" title={item.legislationTitle}>
                    {item.legislationTitle}
                </div>
            ),
            headerClassName: "w-50",
            className: "w-50",
        },
        {
            header: "جهة الإصدار",
            accessor: "issuingBody",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "تاريخ الإصدار",
            accessor: "issueDate",
            headerClassName: "w-28",
            className: "w-28",
        },
        {
            header: "تاريخ النفاذ",
            accessor: (item) => item.effectiveDate || "-",
            headerClassName: "w-28",
            className: "w-28",
        },
        {
            header: "درجة المحكمة",
            accessor: (item) => item.courtLevel || "-",
            headerClassName: "w-32",
            className: "w-32",
        },
        {
            header: "الحالة",
            accessor: (item) => <StatusCell status={item.status} />,
            headerClassName: "w-24",
            className: "w-24",
        },
        {
            header: "إجراء",
            accessor: (item) => (
                <LegislationActions
                    legislationItem={item}
                    onEdit={() => handleEditLegislation(item)}
                    onDelete={() => handleDelete(item)}
                />
            ),
            headerClassName: "w-24",
            className: "w-24",
        },
    ];

    return (
        <div className="w-full">
            {/* استخدام الكمبوننت الجديد */}
            <HeaderLegislations
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onAddClick={handleOpenModal}
            />

            {/* الجدول */}
            {filteredLegislations.length > 0 ? (
                <>
                    <DataTable
                        data={currentLegislations}
                        columns={columns}
                        rowIdField="id"
                    />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-lg">لا يوجد تشريعات أو أحكام مطابقة لمعايير البحث</p>
                </div>
            )}

            {/* مودال إضافة/تعديل تشريع */}
            {isModalOpen && (
                <AddLegislationModal
                    onClose={handleCloseModal}
                    onSave={handleSaveLegislation}
                    initialValues={editingLegislation || undefined}
                />
            )}
        </div>
    )
}