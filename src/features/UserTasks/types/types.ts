export interface TaskRelatedT {
    id: string;
    rowNumber?: number; 
    task_title: string;
    task_type: string;
    assigned_to: number; 
    status: string;
    delivery_date: string;
    notes?: string; // اختياري
    created_at?: string;
    updated_at?: string;
}

// استخدام const بدلاً من enum للحالات
export const TaskStatus = {
    IN_PROGRESS: "in_progress",
    PENDING: "pending",
    DONE: "done",
    LATE: "late",
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];


// واجهة لإضافة مهمة جديدة
export interface AddTaskPayload {
    task_title: string;
    task_type: string;
    assigned_to: number; 
    status: string;
    delivery_date: string;
    notes?: string; // اختياري
    created_at?: string;
    updated_at?: string;
}

// واجهة لتعديل مهمة
export interface UpdateTaskPayload extends AddTaskPayload {
    id: string;
}

export interface TasksResponse {
    success: boolean;
    data: TaskRelatedT[];
    message?: string;
}

// واجهة لمهمة واحدة من API
export interface TaskResponse {
    success: boolean;
    data: TaskRelatedT;
    message?: string;
}