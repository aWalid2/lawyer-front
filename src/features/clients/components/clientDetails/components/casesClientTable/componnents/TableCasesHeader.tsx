import React from 'react';

export const TableCasesHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-[#FCFCFC] border-b-2 border-[#F1F1F4] border-r">
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l 
         boredr-r border-[#F1F1F4] w-16 text-nowrap">#</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] text-nowrap">كود القضية</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] text-nowrap">الرقم الآلي للقضية</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] text-nowrap">موضوع القضية</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] text-nowrap">الحالة</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] text-nowrap">الصفة</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] text-nowrap">تاريخ القضية</th>
        <th className="p-3 text-center text-sm font-semibold text-[#4B5675]">الإجراءات</th>
      </tr>
    </thead>
  );
};