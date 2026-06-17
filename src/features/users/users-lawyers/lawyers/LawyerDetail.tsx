import React from "react";
import { useParams } from "react-router-dom";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import PageLayout from "@/shared/components/PageLayout";
import { useGetOneLawyer } from "../api/hooks/useGetLawyer";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";

const LawyerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: lawyer, isPending, isError } = useGetOneLawyer(id || "");

  if (isPending) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

  return (
    <PageLayout>
      <HeaderTitle title="تفاصيل المحامي" />
      <div className="mt-10 overflow-hidden bg-white">
        <div className="p-8">
          <div className="flex items-start justify-between border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#153A4D]">
                {lawyer.user?.first_name || "غير محدد"}
              </h2>
              <span className="bg-opacity-20 mt-2 inline-block rounded-full bg-[#E3C086] px-4 py-1.5 text-lg">
                {lawyer.specialization || "غير محدد"}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* معلومات الاتصال */}
            <div className="space-y-4">
              <h3 className="border-b border-gray-100 pb-2 text-lg font-semibold text-[#153A4D]">
                معلومات الاتصال
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">
                    رقم الهاتف:
                  </span>
                  <div className="flex items-center" dir="ltr">
                    <span className="font-medium text-gray-900">
                      {lawyer.user?.phone || "غير محدد"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">
                    البريد الإلكتروني:
                  </span>
                  <span className="font-medium text-gray-900" dir="ltr">
                    {lawyer.user?.email || "غير محدد"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">العنوان:</span>
                  <span className="font-medium text-gray-900">
                    {lawyer.user?.address || "غير محدد"}
                  </span>
                </div>
              </div>
            </div>

            {/* المعلومات الشخصية */}
            <div className="space-y-4">
              <h3 className="border-b border-gray-100 pb-2 text-lg font-semibold text-[#153A4D]">
                المعلومات الشخصية
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">
                    رقم الهوية:
                  </span>
                  <span className="font-medium text-gray-900">
                    {lawyer.user?.ssn || "غير محدد"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">الجنسية:</span>
                  <span className="font-medium text-gray-900">
                    {lawyer.user?.nationality || "غير محدد"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">الدولة:</span>
                  <span className="font-medium text-gray-900">
                    {lawyer.user?.country || "غير محدد"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-4">
            <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-[#153A4D]">
              معلومات إضافية
            </h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="min-w-[120px] text-gray-500">
                  تاريخ الإنشاء:
                </span>
                <div className="flex gap-2 font-medium text-gray-900" dir="ltr">
                  {lawyer.user?.created_at
                    ? new Date(lawyer.user.created_at).toLocaleDateString(
                        "ar-EG",
                      )
                    : "غير محدد"}
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">
                    {lawyer.user?.created_at
                      ? new Date(lawyer.user.created_at).toLocaleTimeString(
                          "ar-EG",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : ""}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="min-w-[120px] text-gray-500">آخر تحديث:</span>
                <div className="flex gap-2 font-medium text-gray-900" dir="ltr">
                  {lawyer.user?.updated_at
                    ? new Date(lawyer.user.updated_at).toLocaleDateString(
                        "ar-EG",
                      )
                    : "غير محدد"}
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">
                    {lawyer.user?.updated_at
                      ? new Date(lawyer.user.updated_at).toLocaleTimeString(
                          "ar-EG",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LawyerDetail;
