import { Briefcase, Calendar } from 'lucide-react'

export const JopInfoCard = ({ employeeData }: { employeeData: any }) => {
    return (
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 h-fit w-full">
            <h2 className="text-xl font-bold text-[#153A4D] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary-gradient rounded-full inline-block"></span>
                المعلومات الوظيفية
            </h2>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-[12px]">
                        <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">الوظيفة</p>
                        <p className="font-semibold text-gray-900">{employeeData.job}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-[12px]">
                        <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">تاريخ التعيين</p>
                        <p className="font-semibold text-gray-900">{employeeData.joinDate}</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">الحالة</span>
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-semibold">
                            {employeeData.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
