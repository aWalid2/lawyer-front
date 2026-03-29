import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderTitle } from "@/shared/components/HeaderTitle";


const mockDocuments = [
  { id: "1", name: "عقد تأسيس.pdf", type: "PDF", date: "2024-01-10", size: "1.2 MB", description: "عقد تأسيس الشركة مصدق من وزارة العدل" },
  { id: "2", name: "هوية الموكل.jpg", type: "Image", date: "2024-01-15", size: "2.5 MB", description: "نسخة ضوئية من البطاقة المدنية للموكل" },
  { id: "3", name: "مذكرة دفاع.docx", type: "Word", date: "2024-02-01", size: "500 KB", description: "المذكرة النهائية المقدمة في جلسة فبراير" },
  { id: "4", name: "حكم ابتدائي.pdf", type: "PDF", date: "2024-02-10", size: "3.1 MB", description: "نسخة من الحكم الابتدائي الصادر لصالح الموكل" },
  { id: "5", name: "صور أدلة.zip", type: "Archive", date: "2024-02-20", size: "15.7 MB", description: "أدلة فوتوغرافية وفيديو لموقع الحادث" },
];

const CaseDocumentDetails: React.FC = () => {
  const { id, docId } = useParams<{ id: string; docId: string }>();
  const navigate = useNavigate();

  const document = mockDocuments.find((doc) => doc.id === docId);

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-bold text-secondary mb-4">المستند غير موجود</h2>
        <Button onClick={() => navigate(-1)}>العودة</Button>
      </div>
    );
  }

  const details = [
    { label: "اسم المستند", value: document.name },
    { label: "النوع", value: document.type },
    { label: "تاريخ الرفع", value: document.date },
    { label: "الحجم", value: document.size },
  ];

  return (
    <div className="space-y-6">
      <HeaderTitle title={`عرض المستند: ${document.name}`} to={`/dashboard/case-management/${id}/documents`} />

      <div className="bg-white rounded-[24px] shadow-primary p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[16px] bg-[#F4EADA] flex items-center justify-center">
              <FileText className="w-7 h-7 text-[#CBA462]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#153A4D]">{document.name}</h2>
              <p className="text-[#808080] mt-1 text-sm">مستند قضائي</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="rounded-[12px] h-12 px-6 border-[#E5E7EB] hover:bg-gray-50 font-semibold text-[#153A4D] gap-2 shadow-sm"
            onClick={() => console.log("Download", document.name)}
          >
            <Download className="w-4 h-4" />
            تحميل المستند
          </Button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <span className="text-sm text-[#808080] font-medium border-r-2 border-[#CBA462] pr-3">
                {detail.label}
              </span>
              <span className="text-lg font-bold text-[#153A4D] pr-3">{detail.value}</span>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex flex-col space-y-3">
            <span className="text-sm text-[#808080] font-medium border-r-2 border-[#CBA462] pr-3">
              الوصف / الملاحظات
            </span>
            <div className="bg-[#FBFBFB] p-5 rounded-[16px] border border-[#E8E8E8] min-h-[120px]">
              <p className="text-[#1A1A1A] leading-relaxed">
                {document.description || "لا توجد ملاحظات إضافية."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDocumentDetails;
