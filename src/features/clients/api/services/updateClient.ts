import api from "@/lib/api";
import { mapToApiPayload } from "../../clients/types/mapPayloadAddClient";
import { fileToBase64 } from "@/shared/utils/fileToBase64";

export const updateClient = async ({ id, data }: { id: string; data: any }) => {
    const payload = mapToApiPayload(data);


    if (data.contract_photo instanceof FileList || data.contract_photo instanceof File) {
        payload.profile.contract_photo = await fileToBase64(data.contract_photo);
    }

    if (data.profile_photo instanceof FileList || data.profile_photo instanceof File) {
        payload.profile_photo = await fileToBase64(data.profile_photo);
    }

    const response = await api.patch(`/users/client/${id}`, payload);
    return response.data;
};




