import React from 'react';
import { useParams } from 'react-router-dom';
import { HeaderTitle } from '@/shared/components/HeaderTitle';
import PageLayout from '@/shared/components/PageLayout';
import { useGetEmployee } from '../employees/api/hooks/useGetOneEmployee';
import LoadingPage from '@/shared/components/LoadingPage';
import { Error } from '@/shared/components/Error';

const EmployeeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: employee, isLoading, isError } = useGetEmployee(id || '');

    if (isLoading) {
        return <LoadingPage />;
    }

    if (isError || !employee) {
        return <Error message="حدث خطأ أثناء تحميل بيانات الموظف. الرجاء المحاولة لاحقًا." />;
    }

    return (
        <PageLayout>
            <HeaderTitle title="تفاصيل الموظف" />
            <div className="bg-white overflow-hidden mt-10">
                <div className="p-8">
                    <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#153A4D]">
                                {employee.user?.first_name || 'غير محدد'}
                            </h2>
                            <span className="inline-block mt-2 px-4 py-1.5 bg-[#E3C086] bg-opacity-20  rounded-full text-lg font-bold">
                                {employee.position || 'غير محدد'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* معلومات الاتصال */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                معلومات الاتصال
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">رقم الهاتف:</span>
                                    <div className="flex items-center" dir="ltr">
                                        <span className="text-gray-900 font-medium">
                                            {employee.user?.phone || 'غير محدد'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">البريد الإلكتروني:</span>
                                    <span className="text-gray-900 font-medium" dir="ltr">
                                        {employee.user?.email || 'غير محدد'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* المعلومات الوظيفية */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                المعلومات الوظيفية
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">الوظيفة:</span>
                                    <span className="text-gray-900 font-medium">
                                        {employee.position || 'غير محدد'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">ملاحظات:</span>
                                    <span className="text-gray-900 font-medium">
                                        {employee.profile?.notes || 'لا يوجد ملاحظات حاليا'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* معلومات إضافية */}
                    <div className="mt-8 pt-4 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2 mb-4">
                            معلومات إضافية
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 min-w-[120px]">تاريخ الإنشاء:</span>
                                <div className="text-gray-900 font-medium flex gap-2" dir="ltr">
                                    {employee.user?.created_at 
                                        ? new Date(employee.user.created_at).toLocaleDateString('ar-EG')
                                        : 'غير محدد'}
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-600">
                                        {employee.user?.created_at 
                                            ? new Date(employee.user.created_at).toLocaleTimeString('ar-EG', { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                              })
                                            : ''}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 min-w-[120px]">آخر تحديث:</span>
                                <div className="text-gray-900 font-medium flex gap-2" dir="ltr">
                                    {employee.user?.updated_at 
                                        ? new Date(employee.user.updated_at).toLocaleDateString('ar-EG')
                                        : 'غير محدد'}
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-600">
                                        {employee.user?.updated_at 
                                            ? new Date(employee.user.updated_at).toLocaleTimeString('ar-EG', { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                              })
                                            : ''}
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