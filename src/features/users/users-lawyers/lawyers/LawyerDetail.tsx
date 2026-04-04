import React from 'react';
import { useParams } from 'react-router-dom';
import { HeaderTitle } from '@/shared/components/HeaderTitle';
import PageLayout from '@/shared/components/PageLayout';
import { useGetOneLawyer } from '../api/hooks/useGetLawyer';
import { Error } from '@/shared/components/Error';


const LawyerDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: lawyer, isLoading, isError } = useGetOneLawyer(id || '');

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA462]"></div>
            </div>
        );
    }

    if (isError || !lawyer) {
        return (
            <Error message="حدث خطأ أثناء تحميل بيانات المحامي. الرجاء المحاولة لاحقًا." />
        );
    }

    return (
        <PageLayout>
            <HeaderTitle title="تفاصيل المحامي" />
            <div className="bg-white overflow-hidden mt-10">
                <div className="p-8">

                    <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#153A4D]">{lawyer.first_name || 'غير محدد'}</h2>
                            <span className="inline-block mt-2 px-4 py-1.5 bg-[#E3C086] bg-opacity-20 text-[#CBA462] rounded-full text-sm font-medium">
                                {lawyer.profile?.specialization || 'غير محدد'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                معلومات الاتصال
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">رقم الهاتف:</span>
                                    <div className="flex items-center" dir="ltr">
                                        <span className="text-gray-900 font-medium">{lawyer.phone || 'غير محدد'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">البريد الإلكتروني:</span>
                                    <span className="text-gray-900 font-medium" dir="ltr">{lawyer.email || 'غير محدد'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                المعلومات الشخصية
                            </h3>

                            <div className="space-y-3">
                                {lawyer.ssn && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 min-w-[100px]">رقم الهوية:</span>
                                        <span className="text-gray-900 font-medium">{lawyer.ssn}</span>
                                    </div>
                                )}

                                {lawyer.nationality && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 min-w-[100px]">الجنسية:</span>
                                        <span className="text-gray-900 font-medium">{lawyer.nationality}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {(lawyer.country || lawyer.address) && (
                            <div className="space-y-4 md:col-span-2">
                                <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                    العنوان
                                </h3>

                                <div className="space-y-3">
                                    {lawyer.country && (
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-500 min-w-[100px]">الدولة:</span>
                                            <span className="text-gray-900 font-medium">{lawyer.country}</span>
                                        </div>
                                    )}

                                    {lawyer.address && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-gray-500 min-w-[100px]">العنوان:</span>
                                            <span className="text-gray-900 font-medium flex-1">{lawyer.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="space-y-3">
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <span className="font-medium text-gray-700">آخر تحديث:</span>
                                <span>{new Date(lawyer.updated_at).toLocaleDateString('ar-EG')}</span>
                                <span>الساعة:</span>
                                <span>{new Date(lawyer.updated_at).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <span className="font-medium text-gray-700">تاريخ الإنشاء:</span>
                                <span>{new Date(lawyer.created_at).toLocaleDateString('ar-EG')}</span>
                                <span>الساعة:</span>
                                <span>{new Date(lawyer.created_at).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

// التصدير الافتراضي
export default LawyerDetail;