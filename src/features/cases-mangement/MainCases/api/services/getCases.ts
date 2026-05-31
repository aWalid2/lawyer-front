import api from "@/lib/api";

interface SearchCaseResponse {
    case_sequence: string;
    refernce_number?: string;
    client_name: string;
    case_type: string;
    case_Status: string;
    reference_number?: string;
}

export const getCases = async (page?: number, case_status_id?: string | number) => {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (case_status_id) params.append("case_status_id", case_status_id.toString());
    
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await api.get(`cases/all-cases${queryString}`);
    return response.data;
};

export const searchCases = async (page?: number, searchTerm?: string) => {
    if (!searchTerm) {
        return {
            data: [],
            meta: {
                total_pages: 0,
                limit: 0
            }
        };
    }
    
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    params.append("q", searchTerm);
    
    const queryString = params.toString();
    const response = await api.get(`cases/search?${queryString}`);
    

    const searchData = Array.isArray(response.data) ? response.data : response.data?.data || [];
    
    const transformedData = (searchData as SearchCaseResponse[]).map((item) => ({
        ...item,
        id: item.case_sequence,
        reference_number: item.reference_number ?? item.refernce_number ?? "",
        client: {
            first_name: item.client_name
        },
        case_type: {
            name: item.case_type 
        },
        caseStatus: {
            name: item.case_Status
        }
    }));
    
    return {
        data: transformedData,
        meta: {
            total_pages: 1,
            limit: transformedData.length
        }
    };
};