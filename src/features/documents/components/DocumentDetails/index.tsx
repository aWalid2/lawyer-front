// documents/pages/DocumentDetailsFeature.tsx
import { FileText, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingPage from '@/shared/components/LoadingPage';
import { Error } from '@/shared/components/Error';
import PageLayout from '@/shared/components/PageLayout';
import { useGetDocument } from '../../api/hooks/useGetDocument';

const DocumentDetailsFeature = () => {
    const { id } = useParams<{ id: string }>();
    const { data: documentResponse, isPending, isError } = useGetDocument(id || '');

    if (isPending) {
        return <LoadingPage />;
    }

    if (isError || !documentResponse?.data) {
        return <Error message="حدث خطأ في تحميل بيانات المستند" />;
    }

    const document = documentResponse.data;

    const formatDate = (date: string) => {
        if (!date) return "غير محدد";
        const d = new Date(date);
        return d.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    };

    const documentDetails = [
        {
            label: "نوع المستند",
            value: document.document_type === "CASE_RELATED" ? "تابع لقضية" : "غير تابع لقضية",
        },
        {
            label: document.document_type === "CASE_RELATED" ? "القضية" : "نوع المستند",
            value: document.document_type === "CASE_RELATED" 
                ? (document.caseId || "غير محدد")
                : (document.document_category || "غير محدد"),
        },
        {
            label: "اسم المستند",
            value: document.document_name || "غير محدد",
        },
        {
            label: "تفاصيل المستند",
            value: document.document_details || "غير محدد",
        },
        {
            label: "تاريخ الإضافة",
            value: formatDate(document.created_at),
        },
        {
            label: "آخر تحديث",
            value: formatDate(document.updated_at),
        },
    ];

    const handleDownload = () => {
        if (document.file) {
            window.open(document.file, '_blank');
        }
    };

    return (
        <PageLayout>
            <div className="w-full pt-6 space-y-6">
                <div className="bg-white rounded-[24px] shadow-primary p-6 md:p-8">
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 mb-8 gap-4 shadow-[0px_4px_14px_0px_rgba(21,58,77,0.05)] p-4 rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-[16px] bg-[#F4EADA] flex items-center justify-center">
                                <FileText className="w-7 h-7 text-[#CBA462]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#153A4D]">
                                    تفاصيل المستند: {document.document_name}
                                </h2>
                                <p className="text-[#808080] mt-1 text-sm">
                                    {document.document_type === 'CASE_RELATED' ? 'مستند متعلق بقضية' : 'مستند غير تابع لقضية'} 
                                </p>
                            </div>
                        </div>

                        {document.file && (
                            <Button 
                                variant="outline" 
                                className="rounded-[12px] h-12 px-6 border-[#E5E7EB] hover:bg-gray-50 font-semibold text-[#153A4D] gap-2 shadow-sm whitespace-nowrap"
                                onClick={handleDownload}
                            >
                                <Download className="w-4 h-4" />
                                تحميل المستند
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {documentDetails.map((detail, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <span className="text-sm text-[#808080] font-medium border-r-2 border-[#CBA462] pr-3">
                                    {detail.label}
                                </span>
                                <span className="text-lg font-bold text-[#153A4D] pr-3">
                                    {detail.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {document.document_details && (
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <div className="flex flex-col space-y-3">
                                <span className="text-sm text-[#808080] font-medium border-r-2 border-[#CBA462] pr-3">
                                    ملاحظات
                                </span>
                                <div className="bg-[#FBFBFB] p-5 rounded-[16px] border border-[#E8E8E8] min-h-[120px]">
                                    <p className="text-[#1A1A1A] leading-relaxed">
                                        {document.document_details}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </PageLayout>
    );
};

export default DocumentDetailsFeature;