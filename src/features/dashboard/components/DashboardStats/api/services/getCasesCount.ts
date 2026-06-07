import api  from "@/lib/api";


export const getCasesCount = async () => {

    const response = await api.get(`/cases/numberOfCases`);
    return response.data;

    }