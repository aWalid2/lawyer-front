import React from "react";

export const TableCasesHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-[#FCFCFC] border-b border-[#F1F1F4]">
        <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4] w-16">
          #
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
          كود القضية
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
          الرقم الآلي للقضية
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
          اسم الموكل
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
          عنوان القضية
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
          الحالة
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
          إجراء
        </th>
      </tr>
    </thead>
  );
};
