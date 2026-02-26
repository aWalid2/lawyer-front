import React from "react";

export const ClientInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-secondary mb-8 border-b border-gray-100 pb-4">معلومات الموكل</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        <div className="space-y-2">
          <p className="text-secondary/50 text-xs font-bold uppercase tracking-wider">الأسم</p>
          <p className="font-bold text-secondary text-lg">أحمد محمد</p>
        </div>
        <div className="space-y-2">
          <p className="text-secondary/50 text-xs font-bold uppercase tracking-wider">رقم الهاتف</p>
          <p className="font-bold text-secondary text-lg">054837892</p>
        </div>
        <div className="space-y-2">
          <p className="text-secondary/50 text-xs font-bold uppercase tracking-wider">البريد الإلكتروني</p>
          <p className="font-bold text-secondary text-lg">ahmed@example.com</p>
        </div>
        <div className="space-y-2">
          <p className="text-secondary/50 text-xs font-bold uppercase tracking-wider">العنوان</p>
          <p className="font-bold text-secondary text-lg">الرياض، المملكة العربية السعودية</p>
        </div>
        <div className="space-y-2">
          <p className="text-secondary/50 text-xs font-bold uppercase tracking-wider">تاريخ التسجيل</p>
          <p className="font-bold text-secondary text-lg">11/10/2024</p>
        </div>
      </div>
    </div>
  );
};
