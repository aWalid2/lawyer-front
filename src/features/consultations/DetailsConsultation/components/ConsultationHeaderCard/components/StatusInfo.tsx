import React from "react";
import { Calendar, Clock, FileText } from "lucide-react";
import { formatDateToTime, formatDateToYYYYMMDD } from "@/shared/utils";

interface StatusInfoProps {
  consultation: any;
}

export const StatusInfo: React.FC<StatusInfoProps> = ({ consultation }) => {
  const statusLabels: Record<string, { text: string; className: string }> = {
    pending: {
      text: "قيد الانتظار",
      className: "bg-yellow-100 text-yellow-800",
    },
    completed: { text: "مكتملة", className: "bg-green-100 text-green-800" },
  };

  const currentStatus =
    statusLabels[consultation.status] || statusLabels.pending;

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-xs font-medium text-gray-500 md:justify-start">
      <div
        className={`rounded-main text-paragraph self-center px-4 py-1.5 text-sm font-medium md:self-auto ${currentStatus.className}`}
      >
        {currentStatus.text}
      </div>
      {consultation.consultation_date ? (
        <>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-400" />
            <span>{formatDateToYYYYMMDD(consultation.consultation_date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            <span>{formatDateToTime(consultation.consultation_date)}</span>
          </div>
        </>
      ) : null}
      <div className="bg-primary/10 text-primary hover:bg-primary/20 flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 transition-colors">
        <FileText size={14} />
        <span>فاتورة</span>
      </div>
    </div>
  );
};
