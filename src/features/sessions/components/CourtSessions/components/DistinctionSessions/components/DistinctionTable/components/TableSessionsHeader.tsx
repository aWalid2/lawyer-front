import React from "react";

export const TableSessionsHeader: React.FC = () => {
    return (
        <thead>
            <tr className="bg-[#FCFCFC] border-b border-[#F1F1F4]">
                <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4] w-16">
                    #
                </th>
                <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
                    تاريخ ووقت الجلسة
                </th>
                <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
                    المحكمة
                </th>
                <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
                    رقم القاعة
                </th>
                <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
                    دور القاعة
                </th>
                <th className="p-4 text-center text-sm font-semibold text-[#4B5675] border-x border-[#F1F1F4]">
                    القرار
                </th>
                <th className="p-4 text-center">
                    إجراء
                </th>
            </tr>
        </thead>
    );
};
