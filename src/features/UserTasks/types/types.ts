export interface TaskRelatedT {
    id: string;
    rowNumber?: number;
    task_title: string;
    task_type: string;
    assigned_to: number;
    status: string;
    delivery_date: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
}

export const statusMapping: Record<string, string> = {
    "in_progress": "قيد التنفيذ",
    "pending": "قيد الانتظار",
    "done": "مُنجزة",
    "late": "متأخرة"
};

export const getStatusStyle = (statusValue: string): string => {
    switch (statusValue.trim()) {
        case "done":
            return "bg-[#11B32433] text-[#0B6E1F]";
        case "late":
            return "bg-[#C600001F] text-[#C60000]";
        case "in_progress":
            return "bg-[#DBC33B29] text-[#9E7F0F]";
        case "pending":
            return "bg-[#FFA50029] text-[#FF8C00]";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export interface AddTaskPayload {
    task_title: string;
    task_type: string;
    assigned_to: number;
    status: string;
    delivery_date: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateTaskPayload extends AddTaskPayload {
    id: string;
}

export interface TasksResponse {
    success: boolean;
    data: TaskRelatedT[];
    message?: string;
}

export interface TaskResponse {
    success: boolean;
    data: TaskRelatedT;
    message?: string;
}