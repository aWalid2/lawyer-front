// documents/api/service/getDocuments.ts
import api from "@/lib/api";

export const getDocuments = async () => {
    const response = await api.get("/documnet");
    return response.data;
};