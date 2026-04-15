export interface ReportClient {
    id: string;
    user_id: string;
    user: {
        first_name: string;

        user_status: string;
    };
    case_count: number;
    rowNumber: number;

}
