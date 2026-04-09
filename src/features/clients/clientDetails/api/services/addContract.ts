import api from "@/lib/api";

export const addContract = async ({ clientId, data }: { clientId: string; data: any }) => {
    const formData = new FormData();
    formData.append("start_date", data.start_date);
    formData.append("contract_value", data.contract_value);
    formData.append("contract_duration", data.contract_duration);

    if (data.file instanceof FileList) {
        if (data.file.length > 0) {
            formData.append("file", data.file[0]);
        }
    } else if (data.file instanceof File) {
        formData.append("file", data.file);
    }

    const response = await api.post(`/contracts/${clientId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
