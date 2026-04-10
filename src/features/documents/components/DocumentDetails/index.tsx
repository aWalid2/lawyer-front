// documents/pages/DocumentDetailsFeature.tsx
import { FileText, Download, Eye, File, Image, FileArchive } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingPage from '@/shared/components/LoadingPage';
import { Error } from '@/shared/components/Error';
import PageLayout from '@/shared/components/PageLayout';
import { useFetchCases } from "@/features/UserTasks/api/hooks/useGetCase";
import { useMemo } from "react";
import { useGetDocument } from "../../api/hooks/useGetDocument";

const DocumentDetailsFeature = () => {
    const { id } = useParams<{ id: string }>();
    
    const { data: documentResponse, isPending, isError, error } = useGetDocument(id || '');
    
    const { data: cases, isPending: isCasesPending, isError: isCasesError } = useFetchCases();

    // عمل Map للقضايا
    const casesMap = useMemo(() => {
        if (!cases?.data) return new Map();
        return new Map(cases.data.map((caseItem: any) => [
            String(caseItem.id || caseItem.case_id),
            caseItem.case_title
        ]));
    }, [cases]);

    // دالة لجلب اسم القضية
    const getCaseTitle = (caseId: string | number): string => {
        if (!caseId) return "-";
        const key = String(caseId);
        return casesMap.get(key) || String(caseId);
    };

    if (isPending || isCasesPending) {
        return <LoadingPage />;
    }

    if (isError || !documentResponse) {
        return <Error message="حدث خطأ في تحميل بيانات المستند" />;
    }

    const document = documentResponse;

    const formatDate = (date: string) => {
        if (!date) return "غير محدد";
        const d = new Date(date);
        return d.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    };

    // دالة لمعرفة نوع الملف وعرض الأيقونة المناسبة
    const getFileIcon = (fileUrl: string) => {
        if (!fileUrl) return <File className="w-5 h-5" />;
        
        const extension = fileUrl.split('.').pop()?.toLowerCase();
        
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
            return <Image className="w-5 h-5" />;
        }
        if (['pdf'].includes(extension || '')) {
            return <FileText className="w-5 h-5" />;
        }
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || '')) {
            return <FileArchive className="w-5 h-5" />;
        }
        return <File className="w-5 h-5" />;
    };

    // دالة لمعرفة إذا كان الملف صورة لعرضها مباشرة
    const isImageFile = (fileUrl: string) => {
        if (!fileUrl) return false;
        const extension = fileUrl.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '');
    };

    // دالة لمعرفة إذا كان الملف PDF
    const isPdfFile = (fileUrl: string) => {
        if (!fileUrl) return false;
        const extension = fileUrl.split('.').pop()?.toLowerCase();
        return extension === 'pdf';
    };

    const handleDownload = () => {
        if (document.document_file) {
            // فتح الملف في تبويب جديد للتحميل/العرض
            window.open(document.document_file, '_blank');
        }
    };

    const handleView = () => {
        if (document.document_file) {
            window.open(document.document_file, '_blank');
        }
    };

    const documentDetails = [
        {
            label: "نوع المستند",
            value: document.document_type === "CASE_RELATED" ? "تابع لقضية" : "غير تابع لقضية",
        },
        {
            label: document.document_type === "CASE_RELATED" ? "القضية" : "نوع المستند",
            value: document.document_type === "CASE_RELATED" 
                ? getCaseTitle((document as any).case_id || (document as any).caseId || (document as any).case || "")
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

                    {/* قسم عرض الملف - الجزء الذي تم ضبطه */}
                    {document.document_file && (
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex flex-col space-y-4">
                                <span className="text-sm text-[#808080] font-medium border-r-2 border-[#CBA462] pr-3">
                                    الملف المرفق
                                </span>
                                
                                {/* معاينة الصورة إذا كانت الصورة */}
                                {isImageFile(document.document_file) && (
                                    <div className="mt-4">
                                        <div className="bg-[#FBFBFB] p-4 rounded-[16px] border border-[#E8E8E8]">
                                            <img 
                                                src={document.document_file} 
                                                alt={document.document_name || "صورة المستند"}
                                                className="max-w-full max-h-[400px] object-contain mx-auto rounded-lg"
                                            />
                                        </div>
                                        <div className="flex justify-center gap-3 mt-4">
                                            <Button 
                                                onClick={handleDownload}
                                                className="bg-[#CBA462] hover:bg-[#b8924e] text-white"
                                            >
                                                <Download className="w-4 h-4 ml-2" />
                                                تحميل الصورة
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* معاينة PDF باستخدام iframe */}
                                {isPdfFile(document.document_file) && (
                                    <div className="mt-4">
                                        <div className="bg-[#FBFBFB] p-4 rounded-[16px] border border-[#E8E8E8]">
                                            <iframe
                                                src={`${document.document_file}#toolbar=0`}
                                                title={document.document_name || "ملف PDF"}
                                                className="w-full h-[500px] rounded-lg"
                                                frameBorder="0"
                                            />
                                        </div>
                                        <div className="flex justify-center gap-3 mt-4">
                                            <Button 
                                                onClick={handleView}
                                                className="bg-[#CBA462] hover:bg-[#b8924e] text-white"
                                            >
                                                <Eye className="w-4 h-4 ml-2" />
                                                عرض بملء الشاشة
                                            </Button>
                                            <Button 
                                                onClick={handleDownload}
                                                variant="outline"
                                                className="border-[#CBA462] text-[#CBA462] hover:bg-[#F4EADA]"
                                            >
                                                <Download className="w-4 h-4 ml-2" />
                                                تحميل PDF
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* عرض للملفات الأخرى (غير الصور و PDF) */}
                                {!isImageFile(document.document_file) && !isPdfFile(document.document_file) && (
                                    <div className="mt-4">
                                        <div className="bg-[#FBFBFB] p-6 rounded-[16px] border border-[#E8E8E8]">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <div className="w-20 h-20 rounded-full bg-[#F4EADA] flex items-center justify-center">
                                                    {getFileIcon(document.document_file)}
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[#153A4D] font-medium">
                                                        {document.document_name || "ملف مرفق"}
                                                    </p>
                                                    <p className="text-[#808080] text-sm mt-1">
                                                        انقر على زر التحميل لفتح الملف
                                                    </p>
                                                </div>
                                                <Button 
                                                    onClick={handleDownload}
                                                    className="bg-[#CBA462] hover:bg-[#b8924e] text-white"
                                                >
                                                    <Download className="w-4 h-4 ml-2" />
                                                    تحميل الملف
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {document.document_details && (
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <div className="flex flex-col space-y-3">
                                <span className="text-sm text-[#808080] font-medium border-r-2 border-[#CBA462] pr-3">
                                    تفاصيل إضافية
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