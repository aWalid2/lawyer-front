
import React from 'react';

export const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-[#F9F9F9] border-b-2 border-[E6E6E6] ">
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-[#071437] border-l border-[#E6E6E6]">
          #
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-[#071437] border-l border-[#E6E6E6]">
          كود الموكل
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-[#071437]  border-l border-[#E6E6E6]">
          اسم الموكل
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-[#071437] border-l border-[#E6E6E6]">
          رقم الهاتف
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-[#071437] border-l border-[#E6E6E6]">
          عدد القضايا
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-[#071437] ">
          الإجراءات
        </th>
      </tr>
    </thead>
  );
};