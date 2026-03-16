import React from 'react'
import { Calendar, Clock, FileText } from "lucide-react";
import type { Consultation, ConsultationStatus } from "../../../../MainConsultations/types";
interface StatusInfoProps {
    consultation: Consultation;
}

export const StatusInfo: React.FC<StatusInfoProps> = ({ consultation }) => {
    const statusLabels: Record<ConsultationStatus, { text: string; className: string }> = {
        approved: { text: "مكتملة", className: "bg-success/10 text-success" },
        rejected: { text: "مرفوضة", className: "bg-danger/10 text-danger" },
        under_study: { text: "قيد المراجعة", className: "bg-warning/10 text-warning" },
    };
    return (
        <div className="flex flex-col items-center justify-center md:justify-start gap-4 text-xs font-medium text-gray-500">
            <div className={`px-4 py-1.5 rounded-main text-sm font-medium text-paragraph self-center md:self-auto ${statusLabels[consultation.status].className}`}>
                {statusLabels[consultation.status].text}
            </div>
            <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-400" />
                <span>{consultation.requestDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-400" />
                <span>{consultation.requestTime || "10:16 صباحاً"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-full text-primary">
                <FileText size={14} />
                <span>فاتورة</span>
            </div>
        </div>
    )
}
