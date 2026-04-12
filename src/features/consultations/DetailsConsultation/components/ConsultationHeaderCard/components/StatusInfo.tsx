import React from 'react';
import { Calendar, Clock, FileText } from "lucide-react";

interface StatusInfoProps {
  consultation: any;
}

export const StatusInfo: React.FC<StatusInfoProps> = ({ consultation }) => {
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "غير محدد";
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG');
  };

  // Format time from created_at or use default
  const formatTime = (dateString: string) => {
    if (!dateString) return "غير محدد";
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  const statusLabels: Record<string, { text: string; className: string }> = {
    pending: { text: "قيد الانتظار", className: "bg-yellow-100 text-yellow-800" },
    completed: { text: "مكتملة", className: "bg-green-100 text-green-800" },
  };

  const currentStatus = statusLabels[consultation.status] || statusLabels.pending;

  return (
    <div className="flex flex-col items-center justify-center md:justify-start gap-4 text-xs font-medium text-gray-500">
      <div className={`px-4 py-1.5 rounded-main text-sm font-medium text-paragraph self-center md:self-auto ${currentStatus.className}`}>
        {currentStatus.text}
      </div>
      <div className="flex items-center gap-1.5">
        <Calendar size={14} className="text-gray-400" />
        <span>{formatDate(consultation.request_date)}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock size={14} className="text-gray-400" />
        <span>{formatTime(consultation.created_at)}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-full text-primary cursor-pointer hover:bg-primary/20 transition-colors">
        <FileText size={14} />
        <span>فاتورة</span>
      </div>
    </div>
  );
};