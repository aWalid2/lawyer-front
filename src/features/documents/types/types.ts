// documents/types/types.ts

export interface Document {
    id: string;
    document_type: string;      
    document_category: string;  
    document_name: string;      
    document_details: string;  
    file: string;              
    caseId?: string;            
    created_at?: string;
    updated_at?: string;
}

export interface DocumentsTableProps {
    documents: Document[];
    currentPage: number;
    onPageChange: (page: number) => void;
    onDocumentClick?: (doc: Document) => void;
    onEdit?: (doc: Document) => void;
    onDelete?: (doc: Document) => void;
    totalPages?: number;
    totalItems?: number;
    itemsPerPage?: number;
}