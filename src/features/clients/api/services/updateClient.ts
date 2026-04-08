import api from "@/lib/api";
import { mapToApiPayload } from "../../clients/types/mapPayloadAddClient";


export const updateClient = async ({ id, data }: { id: string; data: any }) => {
    const response = await api.patch(`/users/client/${id}`, mapToApiPayload(data));
    return response.data;
};
