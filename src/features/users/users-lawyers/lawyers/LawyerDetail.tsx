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
                            {/* ✅ استخدام user.first_name */}
                            <h2 className="text-2xl font-bold text-[#153A4D]">
                                {lawyer.user?.first_name || 'غير محدد'}
                            </h2>
                            {/* ✅ استخدام specialization مباشرة */}
                            <span className="inline-block mt-2 px-4 py-1.5 bg-[#E3C086] bg-opacity-20 text-[#CBA462] rounded-full text-sm font-medium">
                                {lawyer.specialization || 'غير محدد'}
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
                                        {/* ✅ استخدام user.phone */}
                                        <span className="text-gray-900 font-medium">
                                            {lawyer.user?.phone || 'غير محدد'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">البريد الإلكتروني:</span>
                                    {/* ✅ استخدام user.email */}
                                    <span className="text-gray-900 font-medium" dir="ltr">
                                        {lawyer.user?.email || 'غير محدد'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                المعلومات الشخصية
                            </h3>

                            <div className="space-y-3">
                                {/* ✅ معلومات إضافية من الـ API الجديد */}
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">رقم الترخيص:</span>
                                    <span className="text-gray-900 font-medium">
                                        {lawyer.license_number || 'غير محدد'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">سنوات الخبرة:</span>
                                    <span className="text-gray-900 font-medium">
                                        {lawyer.experience_years || 'غير محدد'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">الحالة:</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        lawyer.is_verified 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {lawyer.is_verified ? 'موثق' : 'قيد المراجعة'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ملاحظة: حقول country, address, ssn, nationality, notes, created_at, updated_at غير موجودة في الـ API الجديد */}
                    {/* إذا كنت بحاجة لهذه الحقول، أضفها إلى الـ API أو قم بإخفائها */}
                </div>
            </div>
        </PageLayout>
    );
};

export default LawyerDetail;