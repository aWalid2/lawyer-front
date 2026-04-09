export interface Document {
    id: number;
    document_type: "CASE_RELATED" | "NOT_CASE_RELATED";
    document_category: string;
    document_name: string;
    document_details: string;
    caseId?: string;
    case_title?: string;
    case_name?: string;
    case?: {
        id: number;
        title: string;
        name: string;
    };
    file?: string;
    created_at?: string;
    updated_at?: string;
}