// documents/api/service/addDocument.ts
import api from "@/lib/api";

export const addDocument = async ({ clientId, data }: { clientId: string; data: FormData }) => {
    data.append("clientId", clientId);
    
    const response = await api.post("/documnet/create-document", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};