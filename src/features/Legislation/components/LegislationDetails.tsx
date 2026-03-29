import React from 'react';
import { useParams } from 'react-router-dom';
import { HeaderTitle } from '@/shared/components/HeaderTitle';
import { FileText, Calendar, Building2, Scale, Gavel, BookOpen } from 'lucide-react';
import PageLayout from '@/shared/components/PageLayout';

// واجهة بيانات التشريع/الحكم
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

// بيانات مؤقتة (مفترض تجيبها من API)
const legislationsData: LegislationRelatedT[] = [
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
const TypeBadge: React.FC<{ type: string }> = ({ type }) => {
    const getTypeStyle = (type: string): string => {
        switch (type) {
            case "قانون":
                return "bg-[#153A4D1A] text-[#153A4D] border border-[#153A4D]";
            case "لائحة":
                return "bg-[#CBA4621A] text-[#CBA462] border border-[#CBA462]";
            case "قرار وزاري":
                return "bg-[#4B56751A] text-[#4B5675] border border-[#4B5675]";
            case "حكم محكمة":
                return "bg-[#0B6E1F1A] text-[#0B6E1F] border border-[#0B6E1F]";
            default:
                return "bg-gray-100 text-gray-700 border border-gray-300";
        }
    };

    return (
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getTypeStyle(type)}`}>
            {type}
        </span>
    );
};

// مكون عرض الحالة مع لون مناسب
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getStatusStyle = (status: string): string => {
        switch (status) {
            case "ساري":
                return "bg-[#11B32433] text-[#0B6E1F] border border-[#0B6E1F]";
            case "ملغي":
                return "bg-[#C600001F] text-[#C60000] border border-[#C60000]";
            case "معدل":
                return "bg-[#DBC33B29] text-[#9E7F0F] border border-[#9E7F0F]";
            case "مبدأ قضائي":
                return "bg-[#153A4D1A] text-[#153A4D] border border-[#153A4D]";
            default:
                return "bg-gray-100 text-gray-700 border border-gray-300";
        }
    };

    return (
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(status)}`}>
            {status}
        </span>
    );
};

export const LegislationDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const legislation = legislationsData.find(item => item.id === id);

    if (!legislation) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">التشريع/الحكم غير موجود</h2>
            </div>
        );
    }

    // تنسيق التاريخ
    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // أيقونة حسب نوع التشريع
    const getTypeIcon = () => {
        switch (legislation.legislationType) {
            case "قانون":
                return <Scale className="w-8 h-8 text-[#153A4D]" />;
            case "لائحة":
                return <FileText className="w-8 h-8 text-[#CBA462]" />;
            case "قرار وزاري":
                return <BookOpen className="w-8 h-8 text-[#4B5675]" />;
            case "حكم محكمة":
                return <Gavel className="w-8 h-8 text-[#0B6E1F]" />;
            default:
                return <FileText className="w-8 h-8 text-gray-500" />;
        }
    };

    return (
        <PageLayout >
            <HeaderTitle title="تفاصيل التشريع/الحكم" />

            {/* بطاقة المعلومات الرئيسية - باستخدام div عادي */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6 mt-6 ">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-xl">
                            {getTypeIcon()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#153A4D] mb-2">
                                {legislation.legislationTitle}
                            </h2>
                            <div className="flex items-center gap-3">
                                <TypeBadge type={legislation.legislationType} />
                                <StatusBadge status={legislation.status} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* شبكة المعلومات */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* رقم التشريع */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">رقم التشريع/الحكم</span>
                        </div>
                        <p className="text-lg font-semibold text-[#153A4D]">
                            {legislation.legislationNumber}
                        </p>
                    </div>

                    {/* جهة الإصدار */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">جهة الإصدار</span>
                        </div>
                        <p className="text-lg font-semibold text-[#153A4D]">
                            {legislation.issuingBody}
                        </p>
                    </div>

                    {/* تاريخ الإصدار */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">تاريخ الإصدار</span>
                        </div>
                        <p className="text-lg font-semibold text-[#153A4D]">
                            {formatDate(legislation.issueDate)}
                        </p>
                    </div>

                    {/* تاريخ النفاذ (إذا وجد) */}
                    {legislation.effectiveDate && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">تاريخ النفاذ</span>
                            </div>
                            <p className="text-lg font-semibold text-[#153A4D]">
                                {formatDate(legislation.effectiveDate)}
                            </p>
                        </div>
                    )}

                    {/* درجة المحكمة (للأحكام) */}
                    {legislation.courtLevel && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                <Gavel className="w-4 h-4" />
                                <span className="text-sm">درجة المحكمة</span>
                            </div>
                            <p className="text-lg font-semibold text-[#153A4D]">
                                {legislation.courtLevel}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ملخص التشريع - باستخدام div عادي */}
            {legislation.summary && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-bold text-[#153A4D] mb-4">ملخص</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {legislation.summary}
                    </p>
                </div>
            )}
        </PageLayout>
    );
};