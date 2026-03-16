import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import { HeaderTitle } from '@/components/shared/components/HeaderTitle';
import PageLayout from '@/components/shared/components/PageLayout';

// تعريف نوع المحامي
interface Lawyer {
    id: string;
    lawyerName?: string;
    phoneNumber?: string;
    email?: string;
    specialization?: string;
    nationalId?: string;
    countryCode?: string;
    nationality?: string;
    country?: string;
    address?: string;
    notes?: string;
}

// بيانات تجريبية للمحامين
const lawyersData: Lawyer[] = [
    { 
        id: "1", 
        lawyerName: "أحمد محمد علي", 
        phoneNumber: "0501234567", 
        email: "ahmed@lawfirm.com", 
        specialization: "قضايا مدنية",
        nationalId: "1234567890",
        countryCode: "+966",
        nationality: "سعودي",
        country: "المملكة العربية السعودية",
        address: "الرياض - حي النزهة",
        notes: "خبرة 10 سنوات في القضايا التجارية والمدنية"
    },
    { 
        id: "2", 
        lawyerName: "فاطمة عبدالله", 
        phoneNumber: "0559876543", 
        email: "fatima@lawfirm.com", 
        specialization: "قضايا تجارية",
        nationalId: "0987654321",
        countryCode: "+966",
        nationality: "سعودية",
        country: "المملكة العربية السعودية",
        address: "جدة - حي الشاطئ",
        notes: "متخصصة في قضايا الشركات والتجارة الدولية"
    },
    { 
        id: "3", 
        lawyerName: "محمد إبراهيم", 
        phoneNumber: "0561122334", 
        email: "mohamed@lawfirm.com", 
        specialization: "قضايا عمالية",
        nationalId: "1122334455",
        countryCode: "+966",
        nationality: "سعودي",
        country: "المملكة العربية السعودية",
        address: "الدمام - حي الزهور",
        notes: "خبرة 15 سنة في قضايا العمل والعمال"
    },
    { 
        id: "4", 
        lawyerName: "سارة خالد", 
        phoneNumber: "0544455667", 
        email: "sara@lawfirm.com", 
        specialization: "قضايا أحوال شخصية",
        nationalId: "5566778899",
        countryCode: "+966",
        nationality: "سعودية",
        country: "المملكة العربية السعودية",
        address: "الرياض - حي الصحافة",
        notes: "متخصصة في قضايا الأحوال الشخصية والأسرة"
    },
    { 
        id: "5", 
        lawyerName: "عمر حسن", 
        phoneNumber: "0587788990", 
        email: "omar@lawfirm.com", 
        specialization: "قضايا جنائية",
        nationalId: "9988776655",
        countryCode: "+966",
        nationality: "سعودي",
        country: "المملكة العربية السعودية",
        address: "مكة المكرمة - حي العزيزية",
        notes: "خبرة في القضايا الجنائية والمرافعات"
    },
    { 
        id: "6", 
        lawyerName: "نورة سعد", 
        phoneNumber: "0593344556", 
        email: "noura@lawfirm.com", 
        specialization: "استشارات قانونية",
        nationalId: "4455667788",
        countryCode: "+966",
        nationality: "سعودية",
        country: "المملكة العربية السعودية",
        address: "الرياض - حي الملقا",
        notes: "استشارات قانونية للشركات والمؤسسات"
    },
];

const LawyerDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [lawyer, setLawyer] = useState<Lawyer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // محاكاة جلب البيانات من API
        setLoading(true);
        const foundLawyer = lawyersData.find(law => law.id === id);
        setLawyer(foundLawyer || null);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA462]"></div>
            </div>
        );
    }

    if (!lawyer) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">المحامي غير موجود</p>
                <Link
                    to="/dashboard/users/lawyers"
                    className="inline-block mt-4 text-[#CBA462] hover:underline"
                >
                    العودة إلى قائمة المحامين
                </Link>
            </div>
        );
    }

    return (
        <PageLayout>
            {/* شريط العنوان */}
            <HeaderTitle title="تفاصيل المحامي" />

            {/* بطاقة تفاصيل المحامي */}
            <div className="bg-white overflow-hidden mt-10">
                <div className="p-8">
                    {/* الصف الأول: الاسم والتخصص */}
                    <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#153A4D]">{lawyer.lawyerName}</h2>
                            <span className="inline-block mt-2 px-4 py-1.5 bg-[#E3C086] bg-opacity-20 text-[#CBA462] rounded-full text-sm font-medium">
                                {lawyer.specialization}
                            </span>
                        </div>
                    </div>

                    {/* شبكة المعلومات */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* العمود الأول: معلومات الاتصال */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                معلومات الاتصال
                            </h3>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">رقم الهاتف:</span>
                                    <div className="flex items-center" dir="ltr">
                                        <span className="text-gray-900 font-medium">{lawyer.countryCode} {lawyer.phoneNumber}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">البريد الإلكتروني:</span>
                                    <span className="text-gray-900 font-medium" dir="ltr">{lawyer.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* العمود الثاني: المعلومات الشخصية */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                المعلومات الشخصية
                            </h3>
                            
                            <div className="space-y-3">
                                {lawyer.nationalId && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 min-w-[100px]">رقم الهوية:</span>
                                        <span className="text-gray-900 font-medium">{lawyer.nationalId}</span>
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

                        {/* العمود الثالث: العنوان (يأخذ عرض كامل) */}
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

                        {/* الملاحظات */}
                        {lawyer.notes && (
                            <div className="space-y-4 md:col-span-2">
                                <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                    ملاحظات
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-500 min-w-[100px]">ملاحظات:</span>
                                        <span className="text-gray-900 font-medium flex-1">{lawyer.notes}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* معلومات النظام */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span>آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

// التصدير الافتراضي
export default LawyerDetail;