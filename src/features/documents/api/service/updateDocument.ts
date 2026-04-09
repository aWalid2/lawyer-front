// documents/api/service/updateDocument.ts
import api from "@/lib/api";

export const updateDocument = async ({ id, clientId, data }: { id: number; clientId: string; data: FormData }) => {
    data.append("clientId", clientId);
    
    const response = await api.patch(`/documnet/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};