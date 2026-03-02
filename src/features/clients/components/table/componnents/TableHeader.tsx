import React from 'react';

export const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-[#FCFCFC] border-b-2 border-[#F1F1F4]">
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[60px]">#</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[120px]">كود الموكل</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[200px]">اسم الموكل</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[150px]">رقم الهاتف</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[100px]">عدد القضايا</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] w-[150px]">الإجراءات</th>
      </tr>
    </thead>
  );
};