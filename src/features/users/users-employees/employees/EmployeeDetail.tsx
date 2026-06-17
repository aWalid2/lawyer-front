import React from "react";
import { useParams } from "react-router-dom";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import PageLayout from "@/shared/components/PageLayout";
import { useGetEmployee } from "../employees/api/hooks/useGetOneEmployee";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: employee, isLoading, isError } = useGetEmployee(id || "");

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !employee) {
    return (
      <Error message="حدث خطأ أثناء تحميل بيانات الموظف. الرجاء المحاولة لاحقًا." />
    );
  }

  return (
    <PageLayout>
      <HeaderTitle title="تفاصيل الموظف" />
      <div className="mt-10 overflow-hidden bg-white">
        <div className="p-8">
          <div className="flex items-start justify-between border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#153A4D]">
                {employee.user?.first_name || "غير محدد"}
              </h2>
              <span className="bg-opacity-20 mt-2 inline-block rounded-full bg-[#E3C086] px-4 py-1.5 text-lg font-bold">
                {employee.position || "غير محدد"}
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
                      {employee.user?.phone || "غير محدد"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">
                    البريد الإلكتروني:
                  </span>
                  <span className="font-medium text-gray-900" dir="ltr">
                    {employee.user?.email || "غير محدد"}
                  </span>
                </div>
              </div>
            </div>

            {/* المعلومات الوظيفية */}
            <div className="space-y-4">
              <h3 className="border-b border-gray-100 pb-2 text-lg font-semibold text-[#153A4D]">
                المعلومات الوظيفية
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">الوظيفة:</span>
                  <span className="font-medium text-gray-900">
                    {employee.position || "غير محدد"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="min-w-[120px] text-gray-500">ملاحظات:</span>
                  <span className="font-medium text-gray-900">
                    {employee.profile?.notes || "لا يوجد ملاحظات حاليا"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-8 border-t border-gray-100 pt-4">
            <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-[#153A4D]">
              معلومات إضافية
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="min-w-[120px] text-gray-500">
                  تاريخ الإنشاء:
                </span>
                <div className="flex gap-2 font-medium text-gray-900" dir="ltr">
                  {employee.user?.created_at
                    ? new Date(employee.user.created_at).toLocaleDateString(
                        "ar-EG",
                      )
                    : "غير محدد"}
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">
                    {employee.user?.created_at
                      ? new Date(employee.user.created_at).toLocaleTimeString(
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
                  {employee.user?.updated_at
                    ? new Date(employee.user.updated_at).toLocaleDateString(
                        "ar-EG",
                      )
                    : "غير محدد"}
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">
                    {employee.user?.updated_at
                      ? new Date(employee.user.updated_at).toLocaleTimeString(
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

export default EmployeeDetail;
