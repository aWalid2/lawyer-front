import api from "@/lib/api";
import type { FormValues } from "../../types/addClientT";

type AddClientPayload = Omit<FormValues, "countryCode"> & {
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


    if (data.has_contract && data.contracts.length > 0) {
        data.contracts.forEach((contract, index) => {
            appendIfPresent(formData, `profile[contracts][${index}][start_date]`, contract.contract_start_date);
            appendIfPresent(formData, `profile[contracts][${index}][contract_value]`, contract.contract_value);
            appendIfPresent(formData, `profile[contracts][${index}][contract_duration]`, contract.contract_duration);

            const contractFile = getFileFromInput(contract.contract_file);
            if (contractFile) {
                formData.append(`contract_file`, contractFile);
            }
        });
    }

    if (data.add_clients && data.password) {
        formData.append("password", data.password);
        appendIfPresent(
            formData,
            "profile[account][confirmation_password]",
            data.confirmation_password,
        );
    }

    const authorizationFile = getFileFromInput(data.authorization_photo);
    if (authorizationFile) {
        formData.append("authorization_photo", authorizationFile);
    }

    return formData;
};

export const addClients = async (data: AddClientPayload) => {
    const formData = buildClientFormData(data);

    const response = await api.post("/users/client", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};