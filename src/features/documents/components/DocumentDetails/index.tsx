import {
  FileText,
  Download,
  Eye,
  File,
  Image,
  FileArchive,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import PageLayout from "@/shared/components/PageLayout";
import {
  extractCasesList,
  useFetchCases,
} from "@/features/UserTasks/api/hooks/useGetCase";
import { useMemo } from "react";
import { useGetDocument } from "../../api/hooks/useGetDocument";
import { HeaderTitle } from "@/shared/components/HeaderTitle";

const DocumentDetailsFeature = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: documentResponse,
    isPending,
    isError,
  } = useGetDocument(id || "");

  const { data: cases, isPending: isCasesPending } = useFetchCases();

  const casesMap = useMemo(() => {
    const casesList = extractCasesList(cases);
    if (casesList.length === 0) return new Map();

    return new Map(
      casesList.map((caseItem: any) => [
        String(caseItem.id || caseItem.case_id),
        caseItem.case_title,
      ]),
    );
  }, [cases]);

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
    return d.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const getFileIcon = (fileUrl: string) => {
    if (!fileUrl) return <File className="h-5 w-5" />;

    const extension = fileUrl.split(".").pop()?.toLowerCase();

    if (
      ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "")
    ) {
      return <Image className="h-5 w-5" />;
    }
    if (["pdf"].includes(extension || "")) {
      return <FileText className="h-5 w-5" />;
    }
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension || "")) {
      return <FileArchive className="h-5 w-5" />;
    }
    return <File className="h-5 w-5" />;
  };
  const isImageFile = (fileUrl: string) => {
    if (!fileUrl) return false;
    const extension = fileUrl.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
      extension || "",
    );
  };

  const isPdfFile = (fileUrl: string) => {
    if (!fileUrl) return false;
    const extension = fileUrl.split(".").pop()?.toLowerCase();
    return extension === "pdf";
  };

  const handleDownload = () => {
    if (document.document_file) {
      window.open(document.document_file, "_blank");
    }
  };

  const handleView = () => {
    if (document.document_file) {
      window.open(document.document_file, "_blank");
    }
  };

  const documentDetails = [
    {
      label: "نوع المستند",
      value:
        document.document_type === "CASE_RELATED"
          ? "تابع لقضية"
          : "غير تابع لقضية",
    },
    {
      label:
        document.document_type === "CASE_RELATED" ? "القضية" : "نوع المستند",
      value:
        document.document_type === "CASE_RELATED"
          ? getCaseTitle(
              (document as any).case_id ||
                (document as any).caseId ||
                (document as any).case ||
                "",
            )
          : document.document_category || "غير محدد",
    },
    {
      label: "اسم المستند",
      value: document.document_name || "غير محدد",
    },
    {
      label: "تاريخ الإضافة",
      value: formatDate(document.created_at),
    },
  ];

  return (
    <PageLayout>
      <HeaderTitle title="تفاصيل المستند" />

      <div className="mt-8 mb-8 flex flex-col justify-between gap-4 rounded-xl border-b border-gray-100 pb-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#F4EADA]">
            <FileText className="h-7 w-7 text-[#CBA462]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#153A4D]">
              اسم المستند: {document.document_name}
            </h2>
            <p className="mt-1 text-sm text-[#808080]">
              {document.document_type === "CASE_RELATED"
                ? "مستند متعلق بقضية"
                : "مستند غير تابع لقضية"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {documentDetails.map((detail, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
              {detail.label}
            </span>
            <span className="pr-3 text-lg font-bold text-[#153A4D]">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
      {document.document_file && (
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="flex flex-col space-y-4">
            <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
              الملف المرفق
            </span>

            {isImageFile(document.document_file) && (
              <div className="mt-4">
                <div className="rounded-[16px] border border-[#E8E8E8] bg-[#FBFBFB] p-4">
                  <img
                    src={document.document_file}
                    alt={document.document_name || "صورة المستند"}
                    className="mx-auto max-h-[400px] max-w-full rounded-lg object-contain"
                  />
                </div>
                <div className="mt-4 flex justify-center gap-3">
                  <Button
                    onClick={handleDownload}
                    className="bg-[#CBA462] text-white hover:bg-[#b8924e]"
                  >
                    <Download className="ml-2 h-4 w-4" />
                    تحميل الصورة
                  </Button>
                </div>
              </div>
            )}

            {isPdfFile(document.document_file) && (
              <div className="mt-4">
                <div className="rounded-[16px] border border-[#E8E8E8] bg-[#FBFBFB] p-4">
                  <iframe
                    src={`${document.document_file}#toolbar=0`}
                    title={document.document_name || "ملف PDF"}
                    className="h-[500px] w-full rounded-lg"
                    frameBorder="0"
                  />
                </div>
                <div className="mt-4 flex justify-center gap-3">
                  <Button
                    onClick={handleView}
                    className="bg-[#CBA462] text-white hover:bg-[#b8924e]"
                  >
                    <Eye className="ml-2 h-4 w-4" />
                    عرض بملء الشاشة
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-[#CBA462] text-[#CBA462] hover:bg-[#F4EADA]"
                  >
                    <Download className="ml-2 h-4 w-4" />
                    تحميل PDF
                  </Button>
                </div>
              </div>
            )}

            {!isImageFile(document.document_file) &&
              !isPdfFile(document.document_file) && (
                <div className="mt-4">
                  <div className="rounded-[16px] border border-[#E8E8E8] bg-[#FBFBFB] p-6">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F4EADA]">
                        {getFileIcon(document.document_file)}
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-[#153A4D]">
                          {document.document_name || "ملف مرفق"}
                        </p>
                        <p className="mt-1 text-sm text-[#808080]">
                          انقر على زر التحميل لفتح الملف
                        </p>
                      </div>
                      <Button
                        onClick={handleDownload}
                        className="bg-[#CBA462] text-white hover:bg-[#b8924e]"
                      >
                        <Download className="ml-2 h-4 w-4" />
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
        <div className="mt-8 border-t border-gray-100 pt-8">
          <div className="flex flex-col space-y-3">
            <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
              تفاصيل المستند
            </span>
            <div className="min-h-[120px] rounded-[16px] border border-[#E8E8E8] bg-[#FBFBFB] p-5">
              <p className="leading-relaxed text-[#1A1A1A]">
                {document.document_details}
              </p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default DocumentDetailsFeature;
