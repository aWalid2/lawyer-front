import { FileText, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Document } from "../../types";

// Mock data fetcher function (use real one later)
const MOCK_DOCUMENTS: Document[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  autoNumber: "16365",
  caseNumber: "13/05/2025",
  caseTitle: i % 3 === 0 ? "قضية عمالية" : i % 3 === 1 ? "قضية مدنية" : "ارشيف",
  clientCode: `CL-${16265 + i}`,
  clientName: i % 2 === 0 ? "احمد محمد علي" : "شركة النور للتجارة",
  phone: "0123456789",
  date: "13/05/2025",
  type: i % 2 === 0 ? "clients" : "cases",
}));

const DocumentDetailsFeature = () => {
  const { id } = useParams<{ id: string }>();

  // Use the ID to find the document.
  const document = MOCK_DOCUMENTS.find(doc => doc.id === id);

  if (!document) {
      return (
          <div className="flex h-screen items-center justify-center">
              <p className="text-xl text-gray-500 font-semibold">المستند غير موجود</p>
          </div>
      );
  }

  const isCases = document.type === "cases";

  const documentDetails = [
      {
          label: "الرقم الآلي للقضية",
          value: document.autoNumber || "لا يوجد",
      },
      {
          label: "نوع المستند",
          value: isCases ? "قضية" : "موكّل",
      },
      {
          label: isCases ? "عنوان القضية" : "اسم الموكل",
          value: isCases ? document.caseTitle : document.clientName,
      },
      {
          label: "تاريخ الاضافة",
          value: document.date,
      },
      {
          label: "كود الموكل/القضية",
          value: isCases ? document.caseNumber : document.clientCode,
      },
      {
          label: "الباركود",
          value: '0000000000000', // Mock data
      },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-[24px] shadow-primary p-6 md:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 mb-8 gap-4 shadow-[0px_4px_14px_0px_rgba(21,58,77,0.05)] p-4 rounded-xl">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[16px] bg-[#F4EADA] flex items-center justify-center">
                    <FileText className="w-7 h-7 text-[#CBA462]" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#153A4D]">
                        تفاصيل المستند: {isCases ? document.caseTitle : document.clientName}
                    </h2>
                    <p className="text-[#808080] mt-1 text-sm">
                        {document.type === 'cases' ? 'مستند متعلق بقضية' : 'مستند متعلق بموكّل'} 
                    </p>
                </div>
            </div>

            <Button 
                variant="outline" 
                className="rounded-[12px] h-12 px-6 border-[#E5E7EB] hover:bg-gray-50 font-semibold text-[#153A4D] gap-2 shadow-sm whitespace-nowrap"
                onClick={() => console.log('Download Document')}
            >
                <Download className="w-4 h-4" />
                تحميل المستند
            </Button>
        </div>

        {/* Details Grid */}
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

        {/* Notes Section if any */}
        <div className="mt-8 pt-8 border-t border-gray-100">
             <div className="flex flex-col space-y-3">
                <span className="text-sm text-[#808080] font-medium border-r-2 border-[#CBA462] pr-3">
                    ملاحظات
                </span>
                <div className="bg-[#FBFBFB] p-5 rounded-[16px] border border-[#E8E8E8] min-h-[120px]">
                    <p className="text-[#1A1A1A] leading-relaxed">
                        لا توجد ملاحظات مرفقة بهذا المستند حالياً.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DocumentDetailsFeature;
