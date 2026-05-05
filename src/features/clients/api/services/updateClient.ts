import api from "@/lib/api";
import { mapToApiPayload } from "../../clients/types/mapPayloadAddClient";
import { fileToBase64 } from "@/shared/utils/fileToBase64";
import { isAxiosError } from "axios";

type FileInput = File | FileList | string | null | undefined;

type UpdateClientPayload = {
    contract_photo?: FileInput;
    authorization_photo?: FileInput;
    profile_photo?: FileInput;
};

const getFileFromInput = (value: FileInput) => {
    if (value instanceof File) {
        return value;
    }

    if (value instanceof FileList && value.length > 0) {
        return value[0];
    }

    return null;
};

export const updateClient = async ({ id, data }: { id: string; data: UpdateClientPayload }) => {
    const payload = mapToApiPayload(data);
    const authorizationPhotoFile = getFileFromInput(data.authorization_photo);

    try {
        if (data.contract_photo instanceof FileList || data.contract_photo instanceof File) {
            payload.profile.contract_photo = await fileToBase64(data.contract_photo);
        }

        if (data.profile_photo instanceof FileList || data.profile_photo instanceof File) {
            payload.profile_photo = await fileToBase64(data.profile_photo);
        }

        const response = await api.patch(`/users/${id}`, payload);

        if (authorizationPhotoFile) {
            const formData = new FormData();
            formData.append("authorization_photo", authorizationPhotoFile);

            await api.patch(`/users/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            console.error("API Error:", error.response?.data);
            console.error("Error status:", error.response?.status);
        }

        throw error;
    }
};




