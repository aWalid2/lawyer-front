import { Hash, Mail, Phone } from 'lucide-react'
import React from 'react'

export const PersonalInfo: React.FC<{ employeeData: any }> = ({ employeeData }) => {
    return (
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-[#153A4D] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary-gradient rounded-full inline-block"></span>
                المعلومات الشخصية
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-[12px]">
                        <Hash className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">الرقم التعريفي</p>
                        <p className="font-semibold text-gray-900">{employeeData.id}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-[12px]">
                        <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">رقم الهاتف</p>
                        <p className="font-semibold text-gray-900" dir="ltr">{employeeData.phone}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-[12px]">
                        <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">البريد الإلكتروني</p>
                        <p className="font-semibold text-gray-900">{employeeData.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}