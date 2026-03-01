
import React from 'react';

export const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-[#E6E6E6] border-b-2 border-gray-300   ">
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-gray-700 border-l border-gray-300">
          #
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-gray-700 border-l border-gray-300">
          كود الموكل
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-gray-700 border-l border-gray-300">
          اسم الموكل
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-gray-700 border-l border-gray-300">
          رقم الهاتف
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-gray-700 border-l border-gray-300">
          عدد القضايا
        </th>
        <th className="p-1.5 sm:p-2 md:p-3 text-center text-xs sm:text-sm font-semibold text-gray-700">
          الإجراءات
        </th>
      </tr>
    </thead>
  );
};