import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import { HeaderTitle } from '@/components/shared/components/HeaderTitle';
import PageLayout from '@/components/shared/components/PageLayout';
// تعريف نوع الموظف
interface Employee {
    id: string;
    employeeName?: string;
    phoneNumber?: string;
    email?: string;
    jobTitle?: string;
    countryCode?: string;
    notes?: string;
}

// بيانات تجريبية للموظفين
const employeesData: Employee[] = [
    { 
        id: "1", 
        employeeName: "أحمد محمد علي", 
        phoneNumber: "0501234567", 
        email: "ahmed@company.com", 
        jobTitle: "محامي أول",
        countryCode: "+966",
        notes: "خبرة 10 سنوات في القضايا التجارية"
    },
    { 
        id: "2", 
        employeeName: "فاطمة عبدالله", 
        phoneNumber: "0559876543", 
        email: "fatima@company.com", 
        jobTitle: "محامي استشاري",
        countryCode: "+966",
        notes: "متخصصة في قضايا الأحوال الشخصية"
    },
    { 
        id: "3", 
        employeeName: "محمد إبراهيم", 
        phoneNumber: "0561122334", 
        email: "mohamed@company.com", 
        jobTitle: "مدير القسم القانوني",
        countryCode: "+966",
        notes: "خبرة 15 سنة في الإدارة القانونية"
    },
    { 
        id: "4", 
        employeeName: "سارة خالد", 
        phoneNumber: "0544455667", 
        email: "sara@company.com", 
        jobTitle: "باحث قانوني",
        countryCode: "+966",
        notes: "ماجستير في القانون الدولي"
    },
    { 
        id: "5", 
        employeeName: "عمر حسن", 
        phoneNumber: "0587788990", 
        email: "omar@company.com", 
        jobTitle: "مساعد قانوني",
        countryCode: "+966",
        notes: "حديث التخرج"
    },
    { 
        id: "6", 
        employeeName: "نورة سعد", 
        phoneNumber: "0593344556", 
        email: "noura@company.com", 
        jobTitle: "مدير الموارد البشرية",
        countryCode: "+966",
        notes: "خبرة في إدارة الموارد البشرية"
    },
];

const EmployeeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // محاكاة جلب البيانات من API
        setLoading(true);
        const foundEmployee = employeesData.find(emp => emp.id === id);
        setEmployee(foundEmployee || null);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA462]"></div>
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">الموظف غير موجود</p>
                <Link
                    to="/dashboard/users/employees"
                    className="inline-block mt-4 text-[#CBA462] hover:underline"
                >
                    العودة إلى قائمة الموظفين
                </Link>
            </div>
        );
    }

    return (
        <PageLayout>
            {/* شريط العنوان والعودة */}
        <HeaderTitle title="تفاصيل الموظف" />

            {/* بطاقة تفاصيل الموظف */}
            <div className="bg-white  overflow-hidden mt-10">
                <div className="p-8">
                    {/* الصف الأول: الاسم والوظيفة */}
                    <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#153A4D]">{employee.employeeName}</h2>
                            <span className="inline-block mt-2 px-4 py-1.5 bg-[#E3C086] bg-opacity-20 text-[#CBA462] rounded-full text-sm font-medium">
                                {employee.jobTitle}
                            </span>
                        </div>
                    </div>

                    {/* شبكة المعلومات */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* معلومات الاتصال */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                معلومات الاتصال
                            </h3>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">رقم الهاتف:</span>
                                    <div className="flex items-center" dir="ltr">
                                        <span className="text-gray-900 font-medium">{employee.countryCode} {employee.phoneNumber}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 min-w-[100px]">البريد الإلكتروني:</span>
                                    <span className="text-gray-900 font-medium" dir="ltr">{employee.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* معلومات إضافية */}
                        {employee.notes && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-[#153A4D] border-b border-gray-100 pb-2">
                                    ملاحظات
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-500 min-w-[100px]">ملاحظات:</span>
                                        <span className="text-gray-900 font-medium flex-1">{employee.notes}</span>
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

// ✅ التصدير الافتراضي - هذا هو المهم!
export default EmployeeDetail;