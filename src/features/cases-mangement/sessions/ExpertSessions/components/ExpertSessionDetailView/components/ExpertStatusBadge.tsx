import React from "react";

const getStatusStyle = (status: string): string => {
  switch (status.trim()) {
    case "مُعتمد":
      return "bg-[#11B32433] text-[#0B6E1F]";
    case "مُعترض عليه":
      return "bg-[#C600001F] text-[#C60000]";
    case "قيد المراجعة":
      return "bg-[#DBC33B29] text-[#9E7F0F]";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

interface ExpertStatusBadgeProps {
  status: string;
}

export const ExpertStatusBadge: React.FC<ExpertStatusBadgeProps> = ({
  status,
}) => {
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${getStatusStyle(status)}`}
    >
      {status || "—"}
    </span>
  );
};
