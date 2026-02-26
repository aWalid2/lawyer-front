// src/components/clients/table/TableHeader.tsx
import React from 'react';

export const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-gray-100 border-b-2 border-gray-300">
        <th className="p-3 text-center text-sm font-semibold text-gray-700 border-l border-gray-300 w-16">#</th>
        <th className="p-3 text-center text-sm font-semibold text-gray-700 border-l border-gray-300">كود الموكل</th>
        <th className="p-3 text-center text-sm font-semibold text-gray-700 border-l border-gray-300">اسم الموكل</th>
        <th className="p-3 text-center text-sm font-semibold text-gray-700 border-l border-gray-300">رقم الهاتف</th>
        <th className="p-3 text-center text-sm font-semibold text-gray-700 border-l border-gray-300">عدد القضايا</th>
        <th className="p-3 text-center text-sm font-semibold text-gray-700">الإجراءات</th>
      </tr>
    </thead>
  );
};