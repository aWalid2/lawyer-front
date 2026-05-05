import api from "@/lib/api";
import { isAxiosError } from "axios";
import type { FormValues } from "../../types/addClientT";

type AddClientPayload = Omit<FormValues, "countryCode"> & {
    contract_file: FormValues["contract_file"] | FileList | null;
    authorization_photo: FormValues["authorization_photo"] | FileList | null;
};

const appendIfPresent = (formData: FormData, key: string, value?: string) => {
    if (value) {
        formData.append(key, value);
    }
};

const getFileFromInput = (value: File | FileList | null | undefined) => {
    if (value instanceof File) {
        return value;
    }

    if (value instanceof FileList && value.length > 0) {
        return value[0];
    }

    return null;
};

const buildClientFormData = (data: AddClientPayload) => {
    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("email", data.email);
    formData.append("nationality", data.nationality);
    formData.append("address", data.address);
    formData.append("ssn", data.ssn);
    formData.append("country", data.country);
    formData.append("phone", data.phone);
    formData.append("profile[client_type]", data.client_type);
    formData.append("profile[notes]", data.notes);
    formData.append("user_status", data.user_status);
    formData.append("clientId", "");

    if (data.has_contract) {
        appendIfPresent(formData, "profile[contract][start_date]", data.contract_start_date);
        appendIfPresent(formData, "profile[contract][contract_value]", data.contract_value);
        appendIfPresent(formData, "profile[contract][contract_duration]", data.contract_duration);
    }

    if (data.add_clients && data.password) {
        formData.append("password", data.password);
        appendIfPresent(
            formData,
            "profile[account][confirmation_password]",
            data.confirmation_password,
        );
    }

    const contractFile = getFileFromInput(data.contract_file);
    if (contractFile) {
        formData.append("contract_file", contractFile);
    }

    const authorizationFile = getFileFromInput(data.authorization_photo);
    if (authorizationFile) {
        formData.append("authorization_photo", authorizationFile);
    }

    return formData;
};

export const addClients = async (data: AddClientPayload) => {
    const formData = buildClientFormData(data);

    try {
        const response = await api.post("/users/client", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            console.error("API Error:", error.response?.data);
            console.error("Error status:", error.response?.status);
        }

        throw error;
    }
};