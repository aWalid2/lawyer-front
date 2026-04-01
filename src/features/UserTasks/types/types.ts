export interface TaskRelatedT {
    id: string;
    rowNumber?: number; // سيتم إضافته تلقائياً من useIndexedData
    task_title: string;
    task_type: string;
    assigned_to: number; // ID المستخدم المكلف
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

// استخدام const بدلاً من enum لأنواع المهام
export const TaskType = {
    TYPE_1: "قضية 1",
    TYPE_2: "قضية 2",
    TYPE_3: "قضية 3",
    TYPE_4: "قضية 4",
    TYPE_5: "قضية 5",
} as const;

export type TaskTypeType = typeof TaskType[keyof typeof TaskType];

// واجهة لإضافة مهمة جديدة
export interface AddTaskPayload {
    task_title: string;
    assigned_to: number;
    task_type: string;
    delivery_date: string;
    status: string;
    notes?: string;
}

// واجهة لتعديل مهمة
export interface UpdateTaskPayload extends AddTaskPayload {
    id: string;
}

// واجهة للرد من API
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