import React from 'react';
import { useParams } from 'react-router-dom';
import { HeaderTitle } from '@/shared/components/HeaderTitle';
import PageLayout from '@/shared/components/PageLayout';
import { useGetOneLawyer } from '../api/hooks/useGetLawyer';
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';

const LawyerDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: lawyer, isPending, isError } = useGetOneLawyer(id || '');

    if (isPending) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" />

    return (
        <PageLayout>
            <HeaderTitle title="تفاصيل المحامي" />
            <div className="bg-white overflow-hidden mt-10">
                <div className="p-8">
                    <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#153A4D]">
                                {lawyer.user?.first_name || 'غير محدد'}
                            </h2>
                            <span className="inline-block mt-2 px-4 py-1.5 bg-[#E3C086] bg-opacity-20 text-lg  rounded-full ">
                                {lawyer.specialization || 'غير محدد'}
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
                                            {lawyer.user?.phone || 'غير محدد'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">البريد الإلكتروني:</span>
                                    <span className="text-gray-900 font-medium" dir="ltr">
                                        {lawyer.user?.email || 'غير محدد'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">العنوان:</span>
                                    <span className="text-gray-900 font-medium">
                                        {lawyer.user?.address || 'غير محدد'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* المعلومات الشخصية */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                المعلومات الشخصية
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">رقم الهوية:</span>
                                    <span className="text-gray-900 font-medium">
                                        {lawyer.user?.ssn || 'غير محدد'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">الجنسية:</span>
                                    <span className="text-gray-900 font-medium">
                                        {lawyer.user?.nationality || 'غير محدد'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[120px]">الدولة:</span>
                                    <span className="text-gray-900 font-medium">
                                        {lawyer.user?.country || 'غير محدد'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2 mb-4">
                            معلومات إضافية
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 min-w-[120px]">تاريخ الإنشاء:</span>
                                <div className="text-gray-900 font-medium flex gap-2" dir="ltr">
                                    {lawyer.user?.created_at
                                        ? new Date(lawyer.user.created_at).toLocaleDateString('ar-EG')
                                        : 'غير محدد'}
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-600">
                                        {lawyer.user?.created_at
                                            ? new Date(lawyer.user.created_at).toLocaleTimeString('ar-EG', {
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
                                    {lawyer.user?.updated_at
                                        ? new Date(lawyer.user.updated_at).toLocaleDateString('ar-EG')
                                        : 'غير محدد'}
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-600">
                                        {lawyer.user?.updated_at
                                            ? new Date(lawyer.user.updated_at).toLocaleTimeString('ar-EG', {
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

export default LawyerDetail;