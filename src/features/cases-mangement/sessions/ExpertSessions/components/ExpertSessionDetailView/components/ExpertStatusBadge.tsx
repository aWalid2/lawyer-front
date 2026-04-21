import React from "react";
import type { ExpertSessionStatus } from "../../../types/ExpertSessionApiTypes";
import { STATUS_LABEL } from "../../../types/ExpertSessionApiTypes";

const getStatusStyle = (status: ExpertSessionStatus): string => {
  switch (status) {
    case "APPROVED":        return "bg-[#11B32433] text-[#0B6E1F]";
    case "UNDER_OBJECTION": return "bg-[#C600001F] text-[#C60000]";
    case "UNDER_REVIEW":    return "bg-[#DBC33B29] text-[#9E7F0F]";
    default:                return "bg-gray-100 text-gray-700";
  }
};

interface ExpertStatusBadgeProps {
  status: ExpertSessionStatus;
}

export const ExpertStatusBadge: React.FC<ExpertStatusBadgeProps> = ({
  status,
}) => {
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${getStatusStyle(status)}`}
    >
      {STATUS_LABEL[status] || "—"}
    </span>
  );
};
